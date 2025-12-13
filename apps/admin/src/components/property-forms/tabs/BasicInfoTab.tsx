"use client";

import { Card, CardContent } from "@/components/ui/card";
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
import type React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface BasicInfoTabProps {
  showContactPerson?: boolean;
}

export const BasicInfoTab: React.FC<BasicInfoTabProps> = ({ showContactPerson = false }) => {
  const { register, control } = useFormContext();

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-4 gap-4">
            {/* 物件名 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2 block">
                物件名 <span className="text-red-500">*</span>
              </Label>
              <Input placeholder="物件名を入力" {...register("propertyName")} />
              <FormError name="propertyName" />
            </div>

            {/* 担当者名 (Realtorのみ) */}
            {showContactPerson && (
              <div className="space-y-1">
                <Label className="text-sm font-medium mb-2 block">担当者名</Label>
                <Input placeholder="担当者名を入力" {...register("contactPerson")} />
                <FormError name="contactPerson" />
              </div>
            )}

            {/* 売賃・賃貸の選択 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2 block">
                売賃・賃貸の選択 <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="saleOrRent"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">売主</SelectItem>
                      <SelectItem value="rent">賃貸</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FormError name="saleOrRent" />
            </div>

            {/* 取引態様 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2 block">
                取引態様<span className="text-red-500">*</span>
              </Label>
              <Controller
                name="transactionType"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">売主</SelectItem>
                      <SelectItem value="agent">代理</SelectItem>
                      <SelectItem value="broker">仲介</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FormError name="transactionType" />
            </div>

            {/* 物件種別 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2 block">
                物件種別<span className="text-red-500">*</span>
              </Label>
              <Controller
                name="propertyType"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mansion">マンション</SelectItem>
                      <SelectItem value="house">一戸建て</SelectItem>
                      <SelectItem value="land">土地</SelectItem>
                      <SelectItem value="building">ビル・事務所</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FormError name="propertyType" />
            </div>

            {/* 新築・中古・土地の選択 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2 block">
                新築・中古・土地の選択<span className="text-red-500">*</span>
              </Label>
              <Controller
                name="propertyCondition"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">新築</SelectItem>
                      <SelectItem value="used">中古</SelectItem>
                      <SelectItem value="land">土地</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FormError name="propertyCondition" />
            </div>

            {/* 都道府県 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2 block">
                都道府県<span className="text-red-500">*</span>
              </Label>
              <Controller
                name="prefecture"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tokyo">東京都</SelectItem>
                      <SelectItem value="osaka">大阪府</SelectItem>
                      <SelectItem value="kyoto">京都府</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FormError name="prefecture" />
            </div>

            {/* 市区町村 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2 block">
                市区町村<span className="text-red-500">*</span>
              </Label>
              <Input placeholder="市区町村" {...register("city")} />
              <FormError name="city" />
            </div>

            {/* 町名番地 */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2 block">
                町名番地<span className="text-red-500">*</span>
              </Label>
              <Input placeholder="町名番地" {...register("address")} />
              <FormError name="address" />
            </div>

            {/* 交通機関（その他） */}
            <div className="space-y-1">
              <Label className="text-sm font-medium mb-2 block">交通機関（その他）</Label>
              <Input placeholder="その他の交通機関を入力" {...register("otherTransportation")} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
