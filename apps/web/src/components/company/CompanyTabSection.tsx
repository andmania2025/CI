import { Button } from "@/components/ui/button";
import type { CompanyDetail } from "@/data/mockCompanyDetail";
import { cn } from "@/lib/utils";
import type React from "react";

interface CompanyTabSectionProps {
  company: CompanyDetail;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const CompanyTabSection: React.FC<CompanyTabSectionProps> = ({
  company,
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: "詳細情報", label: "詳細情報" },
    { id: "会社メッセージ", label: "会社メッセージ" },
    { id: "会社の特徴", label: "会社の特徴" },
    { id: "得意エリア", label: "得意エリア" },
    { id: "備考", label: "備考" },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-8">
      {/* タブナビゲーション */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-8 pt-6">
          {tabs.map((tab) => (
            <Button
              variant="ghost"
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "py-2 px-1 border-b-2 font-medium text-sm transition-colors rounded-none hover:bg-transparent h-auto",
                activeTab === tab.id
                  ? "border-[#093893] text-[#093893] hover:text-[#093893]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-[#093893]"
              )}
            >
              {tab.label}
            </Button>
          ))}
        </nav>
      </div>

      {/* タブコンテンツ */}
      <div className="p-8">
        {/* 詳細情報タブ */}
        {activeTab === "詳細情報" && (
          <div>
            <div className="inline-block">
              <h2 className="text-2xl font-bold mb-2">詳細情報</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
              <div className="space-y-4">
                <div className="flex">
                  <span className="w-24 text-gray-600 font-medium">営業時間</span>
                  <span className="text-gray-900">{company.businessHours}</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-600 font-medium">定休日</span>
                  <span className="text-gray-900">{company.holidays}</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-600 font-medium">電話番号</span>
                  <span className="text-gray-900">{company.phone}</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-600 font-medium">FAX番号</span>
                  <span className="text-gray-900">{company.fax}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex">
                  <span className="w-24 text-gray-600 font-medium">免許番号</span>
                  <span className="text-gray-900">{company.licenseNumber}</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-600 font-medium">所属協会</span>
                  <span className="text-gray-900">{company.association}</span>
                </div>
                <div className="flex">
                  <span className="w-24 text-gray-600 font-medium">URL</span>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {company.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 会社メッセージタブ */}
        {activeTab === "会社メッセージ" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">会社メッセージ</h2>

            <p className="text-gray-700 leading-relaxed">{company.message}</p>
          </div>
        )}

        {/* 会社の特徴タブ */}
        {activeTab === "会社の特徴" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">会社の特徴</h2>

            <div className="space-y-6">
              {company.features.map((feature) => (
                <div key={feature.title} className="flex">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-700 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 得意エリアタブ */}
        {activeTab === "得意エリア" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">得意エリア</h2>

            <p className="text-gray-700 leading-relaxed">{company.serviceAreas}</p>
          </div>
        )}

        {/* 備考タブ */}
        {activeTab === "備考" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">備考</h2>

            <p className="text-gray-700 leading-relaxed">{/* 備考内容は後で追加 */}</p>
          </div>
        )}
      </div>
    </div>
  );
};
