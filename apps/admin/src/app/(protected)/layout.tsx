import type { ReactNode } from "react";
import { ProtectedLayoutClient } from "./ProtectedLayoutClient";

// 動的レンダリングを強制（プリレンダリングを無効化）
// DB接続がない状況でもビルド可能にするため
export const dynamic = "force-dynamic";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <ProtectedLayoutClient>{children}</ProtectedLayoutClient>;
}
