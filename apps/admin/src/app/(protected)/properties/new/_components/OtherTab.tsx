"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormError } from "@/components/ui/form-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type React from "react";
import { useFormContext } from "react-hook-form";

export const OtherTab: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto space-y-4 p-6">
          {/* 売主の名称または商号 */}
          <div className="space-y-1">
            <Label className="text-sm font-medium mb-2 block">
              売主の名称または商号 <span className="text-red-500">*</span>
            </Label>
            <Input placeholder="売主の名称または商号を入力" {...register("sellerName")} />
            <FormError name="sellerName" />
          </div>

          {/* 不動産業者様 */}
          <div className="space-y-1">
            <Label className="text-sm font-medium mb-2 block">
              不動産業者様 <span className="text-red-500">*</span>
            </Label>
            <Input placeholder="不動産業者様を入力" {...register("realEstateAgent")} />
            <FormError name="realEstateAgent" />
          </div>

          {/* 備考 */}
          <div className="space-y-1">
            <Label className="text-sm font-medium mb-2 block">備考</Label>
            <Textarea placeholder="備考を入力" className="min-h-[80px]" {...register("remarks")} />
          </div>

          {/* 管理者用メモ */}
          <div className="space-y-1">
            <Label className="text-sm font-medium mb-2 block">管理者用メモ</Label>
            <Textarea
              placeholder="管理者用メモを入力"
              className="min-h-[80px]"
              {...register("adminMemo")}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
