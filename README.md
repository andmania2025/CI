# Ucikatu Monorepo

このプロジェクトは、Ucikatuサービスのモノレポです。ユーザー向けWebアプケーションと管理画面を含んでいます。

## プロジェクト構造

| `apps/web` | **Web Application** |
| `apps/admin` | **Admin Dashboard** |
| `packages/*` | **Shared Packages** |

## 技術スタック

- **Language**: TypeScript
- **Framework**: Next.js 16
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL), Prisma ORM
- **Package Manager**: Bun
- **Infrastructure**: Docker, Vercel

### 詳細スタック

#### Frontend
- **Core**: React 19, Next.js 16
- **State Management**: Zustand, TanStack Query (React Query)
- **Styling**: Tailwind CSS 4, Framer Motion, tailwind-merge, clsx
- **UI Components**: Radix UI (Primitives), Lucide React (Icons), Recharts, shadcn/ui
- **Forms**: React Hook Form, Zod

#### Backend (Admin)
- **API**: tRPC
- **Database Access**: Prisma Client

#### Testing
- **Unit/Integration**: Vitest, React Testing Library

#### Tools
- **Linter/Formatter**: Biome
- **Containerization**: Docker Compose