import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CompanyDetail } from "@/data/mockCompanyDetail";
import { cn } from "@/lib/utils";
import { Phone, ThumbsUp } from "lucide-react";
import type React from "react";

interface CompanyBasicInfoSectionProps {
  company: CompanyDetail;
  isGoodClicked: boolean;
  onGoodClick: () => void;
}

export const CompanyBasicInfoSection: React.FC<CompanyBasicInfoSectionProps> = ({
  company,
  isGoodClicked,
  onGoodClick,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
      {/* 会社名とGood数 */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
        <Button
          onClick={onGoodClick}
          variant="outline"
          className={cn(
            "flex items-center space-x-2 px-4 py-2",
            isGoodClicked
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-gray-100 text-gray-700 border-gray-300"
          )}
        >
          <ThumbsUp className="w-5 h-5" />
          <span>Good数: {company.goodCount}</span>
        </Button>
      </div>

      {/* 電話番号 */}
      <div className="flex items-center text-lg text-gray-600 mb-6">
        <Phone className="w-5 h-5 mr-2" />
        {company.phone}
      </div>

      {/* 所在地 */}
      <div className="mb-6">
        <div className="flex items-start">
          <span className="text-sm font-semibold text-gray-700 w-24 shrink-0">所在地</span>
          <span className="text-sm text-gray-600">神奈川県大和市大和南2-2-6</span>
        </div>
      </div>

      {/* 交通アクセス */}
      <div className="mb-6">
        <div className="flex items-start">
          <span className="text-sm font-semibold text-gray-700 w-24 shrink-0">交通アクセス</span>
          <div className="text-sm text-gray-600">
            <p>小田急線・相鉄線「大和」駅から徒歩3分</p>
            <p className="mt-1">店舗前に駐車スペースを3台分ご用意しております。</p>
            <p className="mt-1">
              埋まっている場合は提携駐車場（セントラルパーク、ナビパーク大和等）をご利用ください。
            </p>
            <p className="mt-1">
              ※詳しくはお問い合わせください。ご不明な点等ございましたらお気軽にご連絡ください。
            </p>
          </div>
        </div>
      </div>

      {/* 取扱物件種別 */}
      <div className="mb-6">
        <div className="flex items-start">
          <span className="text-sm font-semibold text-gray-700 w-24 shrink-0">取扱物件種別</span>
          <div className="flex flex-wrap gap-2">
            {company.propertyTypes.sales.map((type) => (
              <Badge
                key={type}
                variant="outline"
                className="text-xs border-[#093893] text-[#093893]"
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* 不動産種別 */}
      <div className="mb-6">
        <div className="flex items-start">
          <span className="text-sm font-semibold text-gray-700 w-24 shrink-0">不動産種別</span>
          <div className="flex flex-wrap gap-2">
            {company.propertyTypes.realEstate.map((type) => (
              <Badge
                key={type}
                variant="outline"
                className="text-xs border-[#093893] text-[#093893]"
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* 物件特徴 */}
      <div className="mb-6">
        <div className="flex items-start">
          <span className="text-sm font-semibold text-gray-700 w-24 shrink-0">物件特徴</span>
          <div className="flex flex-wrap gap-2">
            {company.propertyTypes.features.map((feature) => (
              <Badge
                key={feature}
                variant="outline"
                className="text-xs border-[#093893] text-[#093893]"
              >
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
