"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormError } from "@/components/ui/form-error";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type React from "react";
import { useFormContext } from "react-hook-form";

export const DescriptionTab: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 grid-rows-3 gap-4 h-full">
            {/* 環境・周辺施設 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2 block">環境・周辺施設</Label>
              <Textarea
                placeholder="周辺環境、ショッピング施設、小中学校など"
                className="min-h-[80px]"
                {...register("environment")}
              />
            </div>

            {/* 諸費用等 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2 block">諸費用等</Label>
              <Textarea
                placeholder="初期費用、住宅ローン、月々のお支払い、資格確認等"
                className="min-h-[80px]"
                {...register("expenses")}
              />
            </div>

            {/* 駐車場・駐輪場等 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2 block">駐車場・駐輪場等</Label>
              <Textarea
                placeholder="車庫、地下車庫、カースペース、台数分など"
                className="min-h-[80px]"
                {...register("parkingInfo")}
              />
            </div>

            {/* その他費用等 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2 block">その他費用等</Label>
              <Textarea
                placeholder="別所経費、水道、ガス、温泉使用料、道路使用料等"
                className="min-h-[80px]"
                {...register("otherExpenses")}
              />
            </div>

            {/* 法令上制限 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2 block">法令上制限</Label>
              <Textarea
                placeholder="都市計画法、農地法、文化財保護法など"
                className="min-h-[80px]"
                {...register("legalRestrictions")}
              />
            </div>

            {/* その他建築事項等 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2 block">その他建築事項等</Label>
              <Textarea
                placeholder="建物、専有使用権、駐車場、駐輪場、バイク置場等の詳細"
                className="min-h-[80px]"
                {...register("otherConstructionInfo")}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
