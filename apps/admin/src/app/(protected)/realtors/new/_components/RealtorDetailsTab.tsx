"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
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

export const RealtorDetailsTab: React.FC = () => {
  const { register, control, watch } = useFormContext();

  const _layoutNumber = watch("layoutNumber");
  const _layoutType = watch("layoutType");

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-4 gap-4">
            {/* 間取り */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">
                間取り <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="数値"
                  type="number"
                  min="0"
                  className="w-24 min-w-[96px]"
                  {...register("layoutNumber")}
                />
                <Controller
                  name="layoutType"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="r">R</SelectItem>
                        <SelectItem value="k">K</SelectItem>
                        <SelectItem value="dk">DK</SelectItem>
                        <SelectItem value="ldk">LDK</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <FormError name="layoutNumber" />
              <FormError name="layoutType" />
            </div>

            {/* 建物面積（㎡） */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">
                建物面積（㎡）<span className="text-red-500">*</span>
              </Label>
              <Input placeholder="建物面積" type="number" {...register("buildingArea")} />
              <FormError name="buildingArea" />
            </div>

            {/* 土地面積（㎡） */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">土地面積（㎡）</Label>
              <Input placeholder="土地面積" type="number" {...register("landArea")} />
            </div>

            {/* 建築年月 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">
                建築年月<span className="text-red-500">*</span>
              </Label>
              <Controller
                name="constructionDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="日付を選択"
                  />
                )}
              />
              <FormError name="constructionDate" />
            </div>

            {/* 建築確認番号 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">建築確認番号</Label>
              <Input placeholder="確認番号" {...register("buildingConfirmationNumber")} />
            </div>

            {/* 建物構造 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">建物構造</Label>
              <Controller
                name="buildingStructure"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wood">木造</SelectItem>
                      <SelectItem value="rc">RC造</SelectItem>
                      <SelectItem value="src">SRC造</SelectItem>
                      <SelectItem value="steel">鉄骨造</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* 施工実者 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">施工実者</Label>
              <Input placeholder="施工実者" {...register("constructionCompany")} />
            </div>

            {/* 販売価格（万円） */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">
                販売価格（万円）<span className="text-red-500">*</span>
              </Label>
              <Input placeholder="販売価格" type="number" {...register("salePrice")} />
              <FormError name="salePrice" />
            </div>

            {/* 筆戸数・筆区画数 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">筆戸数・筆区画数</Label>
              <Input placeholder="筆戸数" type="number" {...register("totalUnits")} />
            </div>

            {/* 販売戸数・販売区画数 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">販売戸数・販売区画数</Label>
              <Input placeholder="販売戸数" type="number" {...register("salesUnits")} />
            </div>

            {/* 所在階・階数 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">所在階・階数</Label>
              <Input placeholder="例：5階/10階" {...register("floor")} />
            </div>

            {/* 上下水道・ガス */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">
                上下水道・ガス<span className="text-red-500">*</span>
              </Label>
              <Controller
                name="utilities"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="complete">完備</SelectItem>
                      <SelectItem value="partial">一部</SelectItem>
                      <SelectItem value="incomplete">未完備</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FormError name="utilities" />
            </div>

            {/* バルコニー面積（㎡） */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">バルコニー面積（㎡）</Label>
              <Input placeholder="バルコニー" type="number" {...register("balconyArea")} />
            </div>

            {/* 間取り詳細 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">間取り詳細</Label>
              <Input placeholder="例：1R×1間" {...register("layoutDetail")} />
            </div>

            {/* 開取り */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">
                開取り<span className="text-red-500">*</span>
              </Label>
              <Controller
                name="direction"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="east">東</SelectItem>
                      <SelectItem value="west">西</SelectItem>
                      <SelectItem value="south">南</SelectItem>
                      <SelectItem value="north">北</SelectItem>
                      <SelectItem value="southeast">南東</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FormError name="direction" />
            </div>

            {/* 開取り詳細 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">開取り詳細</Label>
              <Textarea
                placeholder="開取りの詳細を入力"
                className="min-h-[40px]"
                {...register("directionDetail")}
              />
            </div>

            {/* 主要採光面 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">主要採光面</Label>
              <Controller
                name="mainLighting"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="east">東</SelectItem>
                      <SelectItem value="west">西</SelectItem>
                      <SelectItem value="south">南</SelectItem>
                      <SelectItem value="north">北</SelectItem>
                      <SelectItem value="southeast">南東</SelectItem>
                      <SelectItem value="southwest">南西</SelectItem>
                      <SelectItem value="northeast">北東</SelectItem>
                      <SelectItem value="northwest">北西</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* 坪単価（万円/坪） */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">坪単価（万円/坪）</Label>
              <Input placeholder="坪単価" type="number" {...register("unitPrice")} />
            </div>

            {/* 印紙税（円） */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">印紙税（円）</Label>
              <Input placeholder="印紙税" type="number" {...register("stampTax")} />
            </div>

            {/* 想定賃料（万円） */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">想定賃料（万円）</Label>
              <Input placeholder="想定賃料" type="number" {...register("expectedRent")} />
            </div>

            {/* 利用金（円） */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">利用金（円）</Label>
              <Input placeholder="利用金" type="number" {...register("usageFee")} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
