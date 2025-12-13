"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormError } from "@/components/ui/form-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const FacilitiesTab: React.FC = () => {
  const { register, control } = useFormContext();

  const facilities = [
    "駅徒良好",
    "2階以上",
    "南向き",
    "昼上階(3階建以上)",
    "温水洗浄便座",
    "カウンターキッチン",
    "床下収納",
    "CS対応",
    "オール電化",
    "エアコン",
    "フローリング",
    "ベランダ",
    "分譲タイプ",
    "浴室換気乾燥機",
    "IHクッキングヒーター",
    "トランクルーム",
    "BSアンテナ",
    "都市ガス",
    "室内洗濯機置場",
    "駐車場付",
    "宅配ボックス",
    "外壁タイル貼り",
    "追炊き給湯",
    "ガスコンロ",
    "光ファイバー",
    "オートロック",
    "プロパンガス",
    "バス・トイレ別",
    "ペット可",
    "角部屋",
    "デザイナーズ",
    "システムキッチン",
    "ウォーキングクローゼット",
    "CATV",
    "TV付インターホン",
    "ピアノ・楽器可",
    "ルームシェア可",
    "間取り図・写真有り",
    "出窓",
    "駐輪場",
    "生活保護受給者対応可",
    "女性限定",
    "床暖房",
    "バリアフリー",
    "バイク置場",
    "障害者対応可",
    "事務所可(SOHO)",
    "ロフト",
    "専用庭",
    "リフォーム済み",
    "即入居可",
    "メゾネット",
    "エレベータ付",
    "高齢者入居可",
  ];

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto space-y-2 p-6">
          {/* 設備チェックボックス群 */}
          <div className="space-y-1">
            <Label className="text-sm font-medium mb-2">設備</Label>
            <div className="grid grid-cols-5 gap-1 gap-y-4">
              {facilities.map((facility) => (
                <div key={facility} className="flex items-center space-x-1">
                  <Checkbox id={facility} />
                  <Label htmlFor={facility} className="text-xs">
                    {facility}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* 3列レイアウト（上部6項目） */}
          <div className="grid grid-cols-3 gap-4">
            {/* 駐車場有無 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">駐車場有無</Label>
              <Controller
                name="parkingAvailable"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">有</SelectItem>
                      <SelectItem value="no">無</SelectItem>
                      <SelectItem value="none">未選択</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* 駐車料金（円） */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">駐車料金（円）</Label>
              <Input placeholder="駐車料金を入力" type="number" {...register("parkingFee")} />
            </div>

            {/* 駐車場詳細記述 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">駐車場詳細記述</Label>
              <Textarea
                placeholder="駐車場の詳細を入力"
                className="min-h-[40px]"
                {...register("parkingDetail")}
              />
            </div>

            {/* 管理費・共益費（円） */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">
                管理費・共益費（円）
                <span className="text-red-500">*</span>
              </Label>
              <Input placeholder="管理費" type="number" {...register("managementFee")} />
              <FormError name="managementFee" />
            </div>

            {/* 修繕積立金（円） */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">修繕積立金（円）</Label>
              <Input placeholder="修繕積立金" type="number" {...register("repairReserve")} />
            </div>

            {/* 管理形態 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">管理形態</Label>
              <Input placeholder="管理形態を入力" {...register("managementType")} />
            </div>
          </div>

          {/* 4列レイアウト（下部4項目） */}
          <div className="grid grid-cols-4 gap-4">
            {/* リフォーム */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">リフォーム</Label>
              <Textarea
                placeholder="リフォームの詳細を入力"
                className="min-h-[40px]"
                {...register("reform")}
              />
            </div>

            {/* 主要採光面 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">主要採光面</Label>
              <Input placeholder="主要採光面を入力" {...register("mainLightingFacilities")} />
            </div>

            {/* 想定年間収入（万円） */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">想定年間収入（万円）</Label>
              <Input placeholder="年間収入" type="number" {...register("expectedAnnualIncome")} />
            </div>

            {/* 表面利回り（％） */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">表面利回り（％）</Label>
              <Input placeholder="利回り" type="number" {...register("surfaceYield")} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
