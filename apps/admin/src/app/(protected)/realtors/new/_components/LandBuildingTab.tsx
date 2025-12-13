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

export const LandBuildingTab: React.FC = () => {
  const { register, control } = useFormContext();

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-4 gap-4">
            {/* 土地種類 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">
                土地種類 <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="landType"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">宅地</SelectItem>
                      <SelectItem value="commercial">商業地</SelectItem>
                      <SelectItem value="industrial">工業地</SelectItem>
                      <SelectItem value="agricultural">農地</SelectItem>
                      <SelectItem value="forest">山林</SelectItem>
                      <SelectItem value="other">その他</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FormError name="landType" />
            </div>

            {/* 土地面積（㎡） */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">
                土地面積（㎡）<span className="text-red-500">*</span>
              </Label>
              <Input placeholder="土地面積" type="number" {...register("landAreaSqm")} />
              <FormError name="landAreaSqm" />
            </div>

            {/* セットバック */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">セットバック</Label>
              <Input placeholder="セットバック" {...register("setback")} />
            </div>

            {/* 私道負担面積（㎡） */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">私道負担面積（㎡）</Label>
              <Input placeholder="私道負担" type="number" {...register("privateRoadArea")} />
            </div>

            {/* 引渡（年月） */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">
                引渡（年月）<span className="text-red-500">*</span>
              </Label>
              <Controller
                name="deliveryDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="日付を選択"
                  />
                )}
              />
              <FormError name="deliveryDate" />
            </div>

            {/* 現況 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">現況</Label>
              <Textarea
                placeholder="現況を入力"
                className="min-h-[40px]"
                {...register("currentStatus")}
              />
            </div>

            {/* 都市計画 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">
                都市計画<span className="text-red-500">*</span>
              </Label>
              <Controller
                name="cityPlanning"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urbanization">市街化区域</SelectItem>
                      <SelectItem value="controlled">市街化調整区域</SelectItem>
                      <SelectItem value="non-urbanization">非線引都市計画区域</SelectItem>
                      <SelectItem value="outside">都市計画区域外</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FormError name="cityPlanning" />
            </div>

            {/* 接道状況 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">
                接道状況<span className="text-red-500">*</span>
              </Label>
              <Input placeholder="接道幅員(m)" type="number" {...register("roadContact")} />
              <FormError name="roadContact" />
            </div>

            {/* 地目 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">
                地目<span className="text-red-500">*</span>
              </Label>
              <Controller
                name="landCategory"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">宅地</SelectItem>
                      <SelectItem value="agricultural">田</SelectItem>
                      <SelectItem value="field">畑</SelectItem>
                      <SelectItem value="forest">山林</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FormError name="landCategory" />
            </div>

            {/* 用途地域 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">
                用途地域<span className="text-red-500">*</span>
              </Label>
              <Controller
                name="useDistrict"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first-residential">第一種住居地域</SelectItem>
                      <SelectItem value="second-residential">第二種住居地域</SelectItem>
                      <SelectItem value="first-commercial">第一種商業地域</SelectItem>
                      <SelectItem value="industrial">工業地域</SelectItem>
                      <SelectItem value="none">用途地域なし</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FormError name="useDistrict" />
            </div>

            {/* 建ぺい率（％） */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">建ぺい率（％）</Label>
              <Input placeholder="建ぺい率" type="number" {...register("buildingCoverageRatio")} />
            </div>

            {/* 容積率（％） */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">容積率（％）</Label>
              <Input placeholder="容積率" type="number" {...register("floorAreaRatio")} />
            </div>

            {/* 総戸数・総区画数 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">総戸数・総区画数</Label>
              <Input
                placeholder="総戸数・総区画数"
                type="number"
                {...register("totalProperties")}
              />
            </div>
          </div>

          {/* 5列レイアウト（下部5項目） */}
          <div className="grid grid-cols-5 gap-4 mt-2">
            {/* 開発許可番号 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">開発許可番号</Label>
              <Input placeholder="開発許可番号" {...register("developmentPermitNumber")} />
            </div>

            {/* 開発面積（㎡） */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">開発面積（㎡）</Label>
              <Input placeholder="開発面積" type="number" {...register("developmentArea")} />
            </div>

            {/* 宅地造成工事許可番号 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">宅地造成工事許可番号</Label>
              <Input placeholder="宅地造成工事許可番号" {...register("residentialPermitNumber")} />
            </div>

            {/* 地役権 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">地役権</Label>
              <Textarea placeholder="地役権" className="min-h-[40px]" {...register("easement")} />
            </div>

            {/* 国土法届出 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">国土法届出</Label>
              <Textarea
                placeholder="国土法"
                className="min-h-[40px]"
                {...register("nationalLandAct")}
              />
            </div>

            {/* 敷地権 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">敷地権</Label>
              <Textarea
                placeholder="敷地権の詳細"
                className="min-h-[40px]"
                {...register("siteRights")}
              />
            </div>

            {/* 状態・状況 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">状態・状況</Label>
              <Controller
                name="propertyStatus"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">新築</SelectItem>
                      <SelectItem value="good">良好</SelectItem>
                      <SelectItem value="normal">普通</SelectItem>
                      <SelectItem value="fair">要修繕</SelectItem>
                      <SelectItem value="poor">老朽</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* 地番 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2">地番</Label>
              <Input placeholder="地番を入力" {...register("lotNumber")} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
