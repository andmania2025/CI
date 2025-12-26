import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { cache } from "react";
import { HeaderActions } from "./HeaderActions";
import { MainNavigation } from "./MainNavigation";

const CachedHeader = cache(() => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="px-4">
        {/* 上段: ロゴ・文言と右側リンク */}
        <div className="flex items-center h-18">
          {/* 左側: ロゴと文言 */}
          <Link href="/" className="flex items-center space-x-3 shrink-0">
            <Image
              src="/top/logo/blue-logo.png"
              alt="ウチカツ"
              width={120}
              height={60}
              className="h-10 w-auto object-contain"
              priority
            />
            <span className="text-sm font-black text-gray-700 whitespace-nowrap">
              ウチカツ(UCIKATU) | 不動産の専門家が創った&ldquo;不動産SNS&rdquo;
            </span>
          </Link>

          {/* 中央のスペーサー */}
          <div className="flex-1" />

          {/* 右側: ハートアイコンとログインボタン */}
          <HeaderActions />
        </div>

        {/* 区切り線 */}
        <Separator className="bg-gray-200" />

        {/* 下段: メインナビゲーション */}
        <div className="flex justify-center py-2">
          <MainNavigation className="h-10" />
        </div>
      </div>
    </header>
  );
});

export const Header = CachedHeader;
