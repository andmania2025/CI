import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | ウチカツ",
    default: "物件検索 | ウチカツ",
  },
  description:
    "ウチカツで不動産物件を検索。マンション、アパート、戸建てなど豊富な物件情報から理想の住まいを見つけよう。一括査定や専門家への相談も可能です。",
  keywords: [
    "物件検索",
    "不動産",
    "マンション",
    "アパート",
    "戸建て",
    "売買",
    "賃貸",
    "査定",
    "相談",
    "ウチカツ",
  ],
  openGraph: {
    title: "物件検索 | ウチカツ",
    description: "ウチカツで不動産物件を検索。豊富な物件情報から理想の住まいを見つけよう。",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface PropertyLayoutProps {
  children: ReactNode;
}

export default function PropertyLayout({ children }: PropertyLayoutProps) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
