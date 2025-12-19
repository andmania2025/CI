---
description: バックエンド開発ガイドライン（Prisma、Supabase、Server Actions）
globs:
alwaysApply: true
---

# バックエンド開発ガイドライン

## スキーマ管理

### 唯一の信頼できる情報源

- **スキーマファイル:** `prisma/schema.prisma`
- **設定ファイル:** `prisma.config.ts` (Prisma 7形式)

### スキーマ変更手順

```bash
# 1. prisma/schema.prisma を編集

# 2. マイグレーション作成（ルートで実行）
pnpm exec prisma migrate dev --name descriptive_name

# 3. 型を再生成（各アプリで必要に応じて）
pnpm --filter admin db:generate
pnpm --filter web db:generate

# 4. 型チェック
pnpm --filter admin type-check
pnpm --filter web type-check
```

### 禁止事項

- ❌ Supabase UIを通じてスキーマを直接変更しない
- ❌ 手動でSQLを実行してスキーマを変更しない
- ❌ `prisma db push` を本番環境で使用しない

## データベースアクセス

### Prisma Client

```typescript
// lib/prisma.ts - 中央のPrismaクライアント
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
```

### クエリパターン

```typescript
// ✅ 良い例: リレーションを含むクエリ
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    posts: {
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    },
  },
});

// ❌ 悪い例: N+1 問題
const users = await prisma.user.findMany();
for (const user of users) {
  const posts = await prisma.post.findMany({ where: { userId: user.id } });
  // ...
}
```

### 禁止事項

- ❌ テーブルへの直接アクセスに `supabase-js` を使用しない（認証以外）
- ❌ 複数のPrismaClientインスタンスを作成しない

## 認証と認可

### Supabase Auth

```typescript
// lib/supabase/server.ts - サーバーサイドクライアント
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createServerSupabaseClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );
};
```

### セッション検証

```typescript
// Server Action 内でのセッション検証
'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function protectedAction() {
  const supabase = await createServerSupabaseClient();
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    throw new Error('認証が必要です');
  }

  // セッションが有効な場合の処理
  const userId = session.user.id;
  // ...
}
```

### Row-Level Security (RLS)

```sql
-- ユーザー固有のデータに対するRLSポリシー例
CREATE POLICY "Users can view own data" ON public.user_data
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own data" ON public.user_data
  FOR UPDATE
  USING (auth.uid() = user_id);
```

## API と Server Actions

### Server Actions パターン

```typescript
// server/actions/users/createUser.ts
'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// 1. スキーマ定義
const createUserSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  name: z.string().min(1, '名前は必須です'),
  role: z.enum(['user', 'admin']).default('user'),
});

type CreateUserInput = z.infer<typeof createUserSchema>;

// 2. Server Action
export async function createUser(input: CreateUserInput) {
  try {
    // 3. バリデーション
    const validated = createUserSchema.parse(input);

    // 4. 認証チェック（必要に応じて）
    // const session = await getSession();
    // if (!session) throw new Error('Unauthorized');

    // 5. データベース操作
    const user = await prisma.user.create({
      data: validated,
    });

    // 6. キャッシュ再検証
    revalidatePath('/users');

    // 7. 結果を返す
    return { success: true, data: user };
  } catch (error) {
    // 8. エラーハンドリング
    if (error instanceof z.ZodError) {
      return { success: false, error: 'バリデーションエラー', details: error.errors };
    }
    console.error('Failed to create user:', error);
    return { success: false, error: 'ユーザーの作成に失敗しました' };
  }
}
```

### エラーハンドリング

```typescript
// 標準的なエラーレスポンス型
type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; details?: unknown };

// 使用例
export async function updateUser(
  id: string,
  input: UpdateUserInput
): Promise<ActionResult<User>> {
  try {
    // 処理
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: 'エラーメッセージ' };
  }
}
```

## データ同期

### ユーザープロファイル同期

```typescript
// Supabase Auth のユーザーとアプリケーションユーザーの同期
// これはDBトリガーまたはwebhook経由で行うことを推奨

// webhook/route.ts での処理例
export async function POST(request: Request) {
  const body = await request.json();

  if (body.type === 'INSERT' && body.table === 'auth.users') {
    const authUser = body.record;

    // パブリックユーザーテーブルにレコードを作成
    await prisma.user.create({
      data: {
        id: authUser.id,
        email: authUser.email,
        // ...
      },
    });
  }

  return new Response('OK');
}
```

## キャッシュ戦略

### React Cache

```typescript
import { cache } from 'react';

// リクエスト単位でのメモ化
export const getUser = cache(async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
});
```

### unstable_cache

```typescript
import { unstable_cache } from 'next/cache';

// 永続的なキャッシュ（時間経過で再検証）
export const getCachedProducts = unstable_cache(
  async () => {
    return await prisma.product.findMany();
  },
  ['products'],
  { revalidate: 3600 } // 1時間
);
```

## 環境変数

### 必須変数

```env
# データベース
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."  # 管理者用、注意して使用
```

## セキュリティチェックリスト

- [ ] すべてのServer Actionsで入力をZodでバリデーション
- [ ] 機密操作の前にセッションを検証
- [ ] RLSポリシーを適切に設定
- [ ] サービスロールキーは必要な場合のみ使用
- [ ] エラーメッセージに機密情報を含めない
- [ ] 監査ログを重要な操作に対して記録（Admin）
