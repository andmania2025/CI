"use client";

import RealEstateAgentRegistrationForm from "@/components/forms/RealEstateAgentRegistrationForm";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Home } from "lucide-react";
import React from "react";

export function RealEstateAgentRegistrationClient() {
  const breadcrumbItems = [
    { label: "ウチカツ", href: "/", icon: <Home className="w-4 h-4" /> },
    { label: "不動産業者登録" },
  ];

  return (
    <>
      {/* パンくずリスト - 左上配置 */}
      <div className="pt-16 pb-0 pl-18">
        <Breadcrumb items={breadcrumbItems} className="mb-0" />
      </div>

      <main className="pt-4 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">不動産業者登録</h1>
            <p className="text-gray-600">
              不動産業者として登録を行い、物件掲載や査定サービスをご利用いただけます。
            </p>
          </div>

          <RealEstateAgentRegistrationForm />
        </div>
      </main>
    </>
  );
}
