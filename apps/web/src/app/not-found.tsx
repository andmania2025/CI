import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const breadcrumbItems = [
    { label: "ウチカツ", href: "/", icon: <Home className="w-4 h-4" /> },
    { label: "ページが見つかりません" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* パンくずリスト - 左上配置 */}
      <div className="pt-16 pb-0 pl-18">
        <Breadcrumb items={breadcrumbItems} className="mb-0" />
      </div>

      <main className="pt-4 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12">
            <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">ページが見つかりません</h2>
            <p className="text-gray-600 mb-8">
              お探しのページは存在しないか、移動または削除された可能性があります。
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-[#093893] text-white rounded-lg hover:bg-[#093893]/90 transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              ホームに戻る
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
