"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useMemo } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { IoSearch } from "react-icons/io5";

// 新しいスキーマを使用
import { type PropertySearchFormValues, propertySearchFormSchema } from "@/schemas/searchSchema";

// 物件種別の定数 - 売買物件と賃貸物件に分けて定義
const SALE_PROPERTIES = [
  { value: "mansion", label: "マンション" },
  { value: "house", label: "一戸建て" },
  { value: "land", label: "土地" },
  { value: "store_office_warehouse", label: "店舗・事務所・倉庫・工場" },
  { value: "building_mansion", label: "一棟ビル・一棟マンション" },
  { value: "apartment", label: "アパート" },
  { value: "other_accommodation", label: "その他（宿泊施設など）" },
] as const;

const RENTAL_PROPERTIES = [
  { value: "apartment_mansion", label: "マンション・アパート" },
  { value: "house_rental", label: "一戸建て" },
  { value: "store_office_rental", label: "店舗・事務所・倉庫・工場" },
  { value: "other_rental", label: "その他（貸土地、駐車場など）" },
] as const;

interface PropertySearchFormProps {
  onSearch?: (data: PropertySearchFormValues) => void;
  className?: string;
}

export const PropertySearchForm = ({ onSearch, className = "" }: PropertySearchFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<PropertySearchFormValues>({
    resolver: zodResolver(propertySearchFormSchema),
    defaultValues: {
      propertyType: "",
      keyword: "",
    },
  });

  // メモ化されたsubmitハンドラー
  const onSubmit: SubmitHandler<PropertySearchFormValues> = useCallback(
    (data) => {
      console.log("検索データ:", data);
      onSearch?.(data);
      // TODO: Zustand ストアを使用した検索処理を実装
    },
    [onSearch]
  );

  // 共通のinputスタイル
  const inputClassName = useMemo(
    () =>
      "w-full h-12 px-4 border border-gray-200 text-[#333] bg-white text-base placeholder-gray-500 focus:outline-none focus:border-[#093893]",
    []
  );

  return (
    <div className="w-full max-w-lg mx-auto mt-6">
      <div className="bg-white p-2">
        <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-3", className)}>
          <div className="relative">
            <Controller
              control={control}
              name="propertyType"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full h-12 bg-white border-gray-200 text-[#093893]">
                    <SelectValue placeholder="物件種別を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>売買物件</SelectLabel>
                      {SALE_PROPERTIES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>賃貸物件</SelectLabel>
                      {RENTAL_PROPERTIES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Input
              {...register("keyword")}
              type="text"
              placeholder="物件名など"
              className={inputClassName}
              aria-label="キーワード検索"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 px-6 font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed bg-[#093893] text-white hover:bg-[#093893]/80 transition-colors"
          >
            {isSubmitting ? (
              "検索中..."
            ) : (
              <div className="flex items-center justify-center">
                <div className="mr-4" style={{ fontSize: "24px" }}>
                  <IoSearch />
                </div>
                <span className="text-md">物件を検索する</span>
              </div>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
