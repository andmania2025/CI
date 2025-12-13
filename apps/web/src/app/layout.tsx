import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { QueryProvider } from "@/lib/tanstack-query/provider";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: {
    default: "ウチカツ(UCIKATU)|不動産 SNS 不動産業者と利用者を繋ぐコミュニティサイト",
    template: "%s | ウチカツ(UCIKATU)",
  },
  description:
    "【ウチカツ(UCIKATU)】不動産の専門家が創った不動産SNS。不動産業者様は「無料」で物件掲載、一括査定、不動産相談が受けられる画期的なサービス。利用者様はどんな不動産でも検索、査定、相談可能です。横浜のドリームプランニングが提供",
  keywords: [
    "不動産",
    "住宅",
    "物件掲載",
    "一括査定",
    "不動産相談",
    "売買",
    "賃貸",
    "投資",
    "相続",
    "ウチカツ",
    "UCIKATU",
    "不動産SNS",
    "コミュニティサイト",
    "横浜",
    "ドリームプランニング",
  ],
  authors: [{ name: "ドリームプランニング" }],
  creator: "ドリームプランニング",
  publisher: "ドリームプランニング",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ucikatu.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ウチカツ(UCIKATU)|不動産 SNS 不動産業者と利用者を繋ぐコミュニティサイト",
    description:
      "【ウチカツ(UCIKATU)】不動産の専門家が創った不動産SNS。不動産業者様は「無料」で物件掲載、一括査定、不動産相談が受けられる画期的なサービス。利用者様はどんな不動産でも検索、査定、相談可能です。横浜のドリームプランニングが提供",
    url: "https://ucikatu.com",
    siteName: "ウチカツ(UCIKATU)",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "ウチカツ - 不動産SNS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ウチカツ(UCIKATU)|不動産 SNS 不動産業者と利用者を繋ぐコミュニティサイト",
    description:
      "【ウチカツ(UCIKATU)】不動産の専門家が創った不動産SNS。不動産業者様は「無料」で物件掲載、一括査定、不動産相談が受けられる画期的なサービス。",
    images: ["/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Console verification (実際のverification IDに置き換えてください)
    // google: "your-google-verification-id",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJP.variable}>
        <QueryProvider>
          <Header />
          <main className="pt-[90px]">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
