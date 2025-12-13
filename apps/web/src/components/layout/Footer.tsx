"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// 定数の定義
const COMPANY_INFO = {
  name: "ウチカツ(UCIKATU)",
  description: "不動産の専門家が創った不動産SNS。不動産業者と利用者を繋ぐコミュニティサイト。",
  provider: "横浜のドリームプランニングが提供",
  copyright: "© All Rights Reserved, ウチカツ.",
} as const;

const PROPERTY_SALE_LINKS = [
  { href: "/mansion-search", label: "マンション" },
  { href: "#", label: "一戸建て" },
  { href: "#", label: "土地" },
  { href: "#", label: "店舗・事務所・倉庫・工場" },
  { href: "#", label: "一棟ビル・マンション" },
  { href: "#", label: "アパート" },
  { href: "#", label: "その他（宿泊施設等）" },
] as const;

const PROPERTY_RENTAL_LINKS = [
  { href: "/apartment-rental-search", label: "アパート・マンション" },
  { href: "#", label: "一戸建て" },
  { href: "#", label: "店舗・事務所・倉庫・工場" },
  { href: "#", label: "その他（貸土地、駐車場等）" },
] as const;

const REAL_ESTATE_INFO_LINKS = [
  { href: "/real-estate-consultation", label: "不動産の質問・相談" },
  { href: "#", label: "不動産の査定" },
  { href: "#", label: "不動産業者検索" },
  { href: "#", label: "不動産業者登録" },
] as const;

const OTHER_LINKS = [
  { href: "#", label: "運営会社" },
  { href: "#", label: "ご利用方法" },
  { href: "#", label: "ウチカツとは" },
  { href: "#", label: "ウチカツタイムズ" },
  { href: "#", label: "ウチカツガイド" },
  { href: "#", label: "ウルホーム" },
  { href: "/terms", label: "利用規約" },
  { href: "#", label: "プライバシーポリシー" },
  { href: "/contact", label: "お問い合わせ" },
] as const;

// 型定義
interface LinkItem {
  href: string;
  label: string;
}

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}

interface FooterLinkListProps {
  links: readonly LinkItem[];
}

// コンポーネントの分離
const FooterSection: React.FC<FooterSectionProps> = ({ title, children }) => (
  <div className="text-left">
    <h4 className="text-md font-semibold mb-4 text-[#A9A9A9]">{title}</h4>
    {children}
  </div>
);

const FooterLinkList: React.FC<FooterLinkListProps> = ({ links }) => (
  <ul className="space-y-2 text-sm text-left">
    {links.map((link, index) => (
      <li key={`${link.label}-${index}`}>
        <Link
          href={link.href}
          className="text-white hover:opacity-50 transition-opacity duration-200"
        >
          {link.label}
        </Link>
      </li>
    ))}
  </ul>
);

const CopyrightSection: React.FC = () => (
  <div className="text-center">
    <div className="flex justify-center items-center mb-4">
      <Image
        src="/top/logo/white-logo.svg"
        alt="ウチカツロゴ"
        width={48}
        height={48}
        className="h-10 w-auto object-contain"
      />
    </div>
    <p className="text-sm text-white">{COMPANY_INFO.copyright}</p>
  </div>
);

export function Footer() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // コンポーネントマウント後に表示
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // スケルトン表示中は非表示にする
  React.useEffect(() => {
    const handleSkeletonVisibility = () => {
      // スケルトン要素が存在するかチェック
      const skeletonElements = document.querySelectorAll('[class*="animate-pulse"]');
      const hasSkeleton = skeletonElements.length > 0;

      if (hasSkeleton) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    // 初期チェック
    handleSkeletonVisibility();

    // MutationObserverでDOMの変更を監視
    const observer = new MutationObserver(handleSkeletonVisibility);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <footer className="bg-[#4d4d4d] border-t border-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 justify-items-center">
          <FooterSection title="売買物件検索">
            <FooterLinkList links={PROPERTY_SALE_LINKS} />
          </FooterSection>
          <FooterSection title="賃貸物件検索">
            <FooterLinkList links={PROPERTY_RENTAL_LINKS} />
          </FooterSection>
          <FooterSection title="不動産について">
            <FooterLinkList links={REAL_ESTATE_INFO_LINKS} />
          </FooterSection>
          <FooterSection title="その他">
            <FooterLinkList links={OTHER_LINKS} />
          </FooterSection>
        </div>
      </div>
      {/* 区切り線を画面いっぱいに広げる */}
      <div className="mt-8 pt-8">
        <Separator className="bg-[#636363] mb-8" />
        <div className="max-w-7xl mx-auto px-4">
          <CopyrightSection />
        </div>
      </div>
    </footer>
  );
}
