"use client";

import { TableSection } from "@/components/common/TableSection";
import { type InquiryData, inquiryColumns } from "@/components/table-columns/inquiryColumns";
import { type PropertyData, propertyColumns } from "@/components/table-columns/propertyColumns";
import React, { useEffect, useState } from "react";
import { DashboardCards } from "./_components/DashboardCards";
import { getDashboardInquiries, getDashboardProperties } from "./_lib/queries";

export default function Page() {
  const [inquiryData, setInquiryData] = useState<InquiryData[]>([]);
  const [propertyData, setPropertyData] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        console.log("データ読み込み開始...");
        const [inquiries, properties] = await Promise.all([
          getDashboardInquiries(),
          getDashboardProperties(),
        ]);
        console.log("問い合わせデータ:", inquiries);
        console.log("物件データ:", properties);
        setInquiryData(inquiries);
        setPropertyData(properties);
      } catch (error) {
        console.error("データの読み込みに失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-1 flex-col gap-4 sm:gap-6 lg:gap-8 p-2 sm:p-3 pt-2 pb-2 min-h-0 h-full">
        <div className="mt-2">
          <DashboardCards />
        </div>
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">データを読み込み中...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 sm:gap-6 lg:gap-8 p-2 sm:p-3 pt-2 pb-0 min-h-0 h-full">
      <div className="mt-2">
        <DashboardCards />
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-1 flex-1 min-h-0 h-full">
        <TableSection<InquiryData>
          title="最近の物件問い合わせ"
          description=""
          data={inquiryData}
          columns={inquiryColumns}
          maxHeight="100%"
          detailLink="/inquiry-management/property-inquiry"
        />
        <TableSection<PropertyData>
          title="最近の更新した物件"
          description=""
          data={propertyData}
          columns={propertyColumns}
          maxHeight="100%"
          detailLink="/property-management"
        />
      </div>
    </div>
  );
}
