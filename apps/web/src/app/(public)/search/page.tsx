import { PageLoadingSkeleton } from "@/components/common/PageLoadingSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPageClient } from "./search-client";

// 物件種別のマッピング
const getPropertyTypeLabel = (propertyType: string | null): string | null => {
  if (!propertyType) return null;

  const propertyTypeMap: Record<string, string> = {
    // 売買物件
    mansion: "マンション",
    house: "一戸建て",
    land: "土地",
    commercial: "店舗・事務所・倉庫・工場",
    building: "一棟ビル・一棟マンション",
    apartment: "アパート",
    other: "その他（宿泊施設等）",
    // 賃貸物件
    rental_apartment: "アパート・マンション",
    rental_house: "一戸建て",
    rental_commercial: "店舗・事務所・倉庫・工場",
    rental_other: "その他(貸土地、駐車場等)",
  };

  return propertyTypeMap[propertyType] || null;
};

interface SearchPageProps {
  searchParams: Promise<{
    type?: string;
    propertyType?: string;
  }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const searchType = params.type === "rental" ? "rental" : "sale";
  const propertyType = params.propertyType || null;
  const propertyTypeLabel = getPropertyTypeLabel(propertyType);

  const baseTitle = searchType === "rental" ? "賃貸物件検索" : "売買物件検索";
  const title = propertyTypeLabel ? `${propertyTypeLabel} ${baseTitle}` : baseTitle;

  const baseDescription =
    searchType === "rental"
      ? "賃貸物件の条件を指定して検索できます"
      : "売買物件の条件を指定して検索できます";
  const description = propertyTypeLabel
    ? `${propertyTypeLabel}の${baseDescription}`
    : baseDescription;

  return {
    title,
    description,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const searchType = params.type === "rental" ? "rental" : "sale";
  const propertyType = params.propertyType || null;
  const propertyTypeLabel = getPropertyTypeLabel(propertyType);

  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<PageLoadingSkeleton variant="search" />}>
        <SearchPageClient
          searchType={searchType}
          propertyType={propertyType}
          propertyTypeLabel={propertyTypeLabel}
        />
      </Suspense>
    </div>
  );
}
