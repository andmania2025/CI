"use client";

import { AgentInquiryManagement } from "@/components/admin/inquiry-management/agent-inquiry/AgentInquiryManagement";
import { BulkAssessmentManagement } from "@/components/admin/inquiry-management/bulk-assessment/BulkAssessmentManagement";
import { PropertyInquiryManagement } from "@/components/admin/inquiry-management/property-inquiry/PropertyInquiryManagement";
import { SiteInquiryManagement } from "@/components/admin/inquiry-management/site-inquiry/SiteInquiryManagement";
import { Tabs } from "@/components/ui/vercel-tabs";
import { useState } from "react";

const tabs = [
  { id: "property", label: "物件問い合わせ" },
  { id: "site", label: "サイト問い合わせ" },
  { id: "business", label: "業者問い合わせ" },
  { id: "bulk", label: "一括査定" },
];

export default function InquiryManagementPage() {
  const [activeTab, setActiveTab] = useState("property");

  const renderTabContent = () => {
    switch (activeTab) {
      case "property":
        return <PropertyInquiryManagement />;
      case "site":
        return <SiteInquiryManagement />;
      case "business":
        return <AgentInquiryManagement />;
      case "bulk":
        return <BulkAssessmentManagement />;
      default:
        return <PropertyInquiryManagement />;
    }
  };

  return (
    <div className="flex flex-1 flex-col min-h-0 h-full">
      {/* 固定ヘッダー */}
      <div className="sticky top-0 z-10 bg-background pb-4 pt-6 px-6 flex-shrink-0">
        <div className="flex items-baseline justify-between space-y-2 mb-4">
          <h2 className="text-3xl font-bold tracking-tight leading-none">問い合わせ管理</h2>
        </div>

        <div className="w-full">
          <div className="mb-6">
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={(tabId) => setActiveTab(tabId)} />
          </div>
        </div>
      </div>

      {/* コンテンツエリア */}
      <div className="flex-1 min-h-0 p-6">
        <div className="space-y-4">{renderTabContent()}</div>
      </div>
    </div>
  );
}
