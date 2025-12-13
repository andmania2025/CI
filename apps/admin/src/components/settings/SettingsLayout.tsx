"use client";
import { usePageTitle } from "@/contexts/PageTitleContext";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect } from "react";

interface SettingsTab {
  id: string;
  label: string;
  href: string;
}

const settingsTabs: SettingsTab[] = [
  { id: "site", label: "サイト設定", href: "/settings/site" },
  { id: "property", label: "物件設定", href: "/settings/property" },
  { id: "property-inquiry", label: "物件問い合わせ設定", href: "/settings/property-inquiry" },
  { id: "member", label: "会員設定", href: "/settings/member" },
  { id: "inquiry", label: "問い合わせ設定", href: "/settings/inquiry" },
  { id: "mail", label: "メール設定", href: "/settings/mail" },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle("システム設定");
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5" />
        <h2 className="text-xl font-semibold">システム設定</h2>
      </div>

      {/* タブナビゲーション */}
      <div className="mb-6">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {settingsTabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                "px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
                pathname === tab.href
                  ? "text-blue-600 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600 border-transparent hover:border-blue-300 hover:bg-blue-50"
              )}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      {/* コンテンツエリア */}
      <div className="bg-white rounded-lg shadow-sm">{children}</div>
    </div>
  );
};
