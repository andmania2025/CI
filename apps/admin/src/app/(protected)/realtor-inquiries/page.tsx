"use client";

import { BusinessInquiryManagement } from "@/components/admin/inquiry-management/business-inquiry/BusinessInquiryManagement";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-2 pb-2 py-2">
      <BusinessInquiryManagement />
    </div>
  );
}
