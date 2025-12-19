---
description: 共有パッケージ（packages/）の開発ルールと抽出指針
globs:
  - "packages/**/*"
alwaysApply: false
---

# 共有パッケージルール

## 概要

`packages/` ディレクトリは、Web アプリケーションと Admin アプリケーション間で共有されるコード（UIコンポーネント、ユーティリティ関数、型定義など）を格納します。

## パッケージ構造

```
packages/
├── ui/                        # 共有UIコンポーネント
│   ├── src/
│   │   ├── components/        # 再利用可能なUIコンポーネント
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   └── index.ts       # バレルエクスポート
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── utils/                     # 共有ユーティリティ関数
│   ├── src/
│   │   ├── format/            # フォーマット関数
│   │   ├── validation/        # バリデーションヘルパー
│   │   ├── date/              # 日付ユーティリティ
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── types/                     # 共有型定義
│   ├── src/
│   │   ├── api.types.ts
│   │   ├── database.types.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
└── config/                    # 共有設定
    ├── eslint/
    ├── typescript/
    └── tailwind/
```

## 共有パッケージ抽出の基準

### 抽出すべきコード

以下の条件を**すべて**満たすコードは共有パッケージに抽出を検討してください：

1. **両アプリで使用**: Web と Admin の両方で使用されている、または使用される予定
2. **安定したAPI**: インターフェースが安定しており、頻繁な変更が予想されない
3. **独立性**: 特定のアプリのビジネスロジックに依存しない
4. **テスト可能**: 単独でテスト可能

### 抽出すべきでないコード

- アプリ固有のビジネスロジック
- 実験的または頻繁に変更されるコンポーネント
- 単一のアプリでのみ使用されるコード
- アプリ固有のスタイリングに強く依存するコンポーネント

## 共有コンポーネントの設計原則

### 1. Props設計

```typescript
// ✅ 良い例: 柔軟で拡張可能なProps
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// ❌ 悪い例: アプリ固有のProps
interface ButtonProps {
  onAddToCart?: () => void;  // アプリ固有のロジック
  adminOnly?: boolean;        // アプリ固有のフラグ
}
```

### 2. スタイリング

- Tailwind CSS のユーティリティクラスを使用
- `cva` (class-variance-authority) でバリアント管理
- テーマトークン（CSS変数）を使用してカスタマイズ可能に

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
```

### 3. エクスポート

```typescript
// packages/ui/src/index.ts
// 名前付きエクスポートのみ使用
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';

export { Input } from './components/Input';
export type { InputProps } from './components/Input';
```

## アプリからの使用方法

```typescript
// apps/web/src/components/SomeComponent.tsx
import { Button, Input } from '@repo/ui';
import { formatDate, validateEmail } from '@repo/utils';
import type { User } from '@repo/types';
```

## パッケージ作成手順

### 1. 新しいパッケージの作成

```bash
# パッケージディレクトリの作成
mkdir -p packages/ui/src

# package.json の作成
cat > packages/ui/package.json << 'PACKAGE'
{
  "name": "@repo/ui",
  "version": "0.0.1",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
PACKAGE
```

### 2. アプリへの依存関係追加

```bash
# Web アプリに追加
pnpm --filter web add @repo/ui

# Admin アプリに追加
pnpm --filter admin add @repo/ui
```

## 命名規則

| 項目 | 規則 | 例 |
|------|------|-----|
| パッケージ名 | `@repo/<package-name>` | `@repo/ui`, `@repo/utils` |
| コンポーネント | `PascalCase` | `Button.tsx`, `DataTable.tsx` |
| ユーティリティ | `camelCase` | `formatDate.ts`, `validateEmail.ts` |
| 型ファイル | `<name>.types.ts` | `api.types.ts`, `user.types.ts` |

## テスト要件

- すべての共有コンポーネントにはユニットテストが必須
- 共有ユーティリティ関数にはユニットテストが必須  
- テストカバレッジ目標: 80%以上

```typescript
// packages/ui/src/components/Button/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 変更管理

共有パッケージを変更する際は、以下を確認すること：

1. **影響範囲の確認**: 両アプリへの影響を確認
2. **後方互換性**: 既存のAPIを破壊しないように注意
3. **両アプリでのテスト**: 変更後、両方のアプリでテストを実行
4. **ドキュメント更新**: Props や使用方法の変更があれば更新
