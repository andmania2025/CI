import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import { FavoritesClient } from "./favorites-client";

export const metadata: Metadata = {
  title: "お気に入り - 保存した物件一覧",
  description:
    "ウチカツで保存したお気に入り物件の一覧。気になる物件をまとめて比較・検討できます。売買・賃貸・投資物件など、あなたの関心に合わせて物件を管理しましょう。",
  keywords: [
    "お気に入り",
    "保存物件",
    "物件比較",
    "物件管理",
    "売買物件",
    "賃貸物件",
    "投資物件",
    "不動産",
    "ウチカツ",
    "UCIKATU",
  ],
  openGraph: {
    title: "お気に入り - 保存した物件一覧 | ウチカツ",
    description:
      "ウチカツで保存したお気に入り物件の一覧。気になる物件をまとめて比較・検討できます。",
    url: "/favorites",
    type: "website",
  },
  alternates: {
    canonical: "/favorites",
  },
  robots: {
    index: false, // お気に入りページは個人的なページなので検索エンジンにインデックスされない方が良い
    follow: true,
  },
};

export default function FavoritesPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<LoadingSkeleton variant="property-results" />}>
        <FavoritesClient />
      </Suspense>
    </div>
  );
}
