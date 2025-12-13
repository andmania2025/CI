import { PageLoadingSkeleton } from "@/components/common/PageLoadingSkeleton";
import { mockCompanyDetail } from "@/data/mockCompanyDetail";
import type { Metadata } from "next";
import { Suspense } from "react";
import { CompanyDetailClient } from "./company-detail-client";

interface CompanyDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: CompanyDetailPageProps): Promise<Metadata> {
  await params; // paramsを解決（将来的にIDを使用する場合に備えて）
  const company = mockCompanyDetail; // 実際の実装では、IDに基づいて会社データを取得

  return {
    title: `${company.name} | ウチカツ(UCIKATU)`,
    description: company.message || `${company.name}の詳細情報ページです。`,
  };
}

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<PageLoadingSkeleton variant="default" showHeader={false} />}>
        <CompanyDetailClient companyId={id} />
      </Suspense>
    </div>
  );
}
