"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PREFECTURE_MAP } from "@/lib/constants/prefectureMap";
import { cn } from "@/lib/utils";
import type React from "react";

interface CityOption {
  city: string;
}

interface AddressSectionProps {
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  onPostalCodeChange: (value: string) => void;
  onPrefectureChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  cityOptions: CityOption[];
  isLoadingAddress?: boolean;
  isLoadingCities?: boolean;
  errors?: {
    postalCode?: string;
    prefecture?: string;
    city?: string;
    address?: string;
  };
}

/**
 * 住所入力セクションコンポーネント
 * 郵便番号、都道府県、市区町村、住所の入力を管理
 */
export const AddressSection: React.FC<AddressSectionProps> = ({
  postalCode,
  prefecture,
  city,
  address,
  onPostalCodeChange,
  onPrefectureChange,
  onCityChange,
  onAddressChange,
  cityOptions,
  isLoadingAddress = false,
  isLoadingCities = false,
  errors = {},
}) => {
  // 郵便番号の入力処理（ハイフンを除去）
  const handlePostalCodeInput = (value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, "");
    onPostalCodeChange(cleanValue);
  };

  return (
    <>
      {/* 郵便番号フィールド */}
      <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-4">
        <Label
          htmlFor="postalCode"
          className="text-foreground text-base font-medium shrink-0 flex items-center justify-between pr-2"
        >
          郵便番号
          <Badge variant="destructive" className="ml-2">
            必須
          </Badge>
        </Label>
        <div className="w-full max-w-[200px]">
          <Input
            id="postalCode"
            type="text"
            placeholder="ハイフンなしで入力"
            value={postalCode}
            onChange={(e) => handlePostalCodeInput(e.target.value)}
            className={cn("w-full h-10", errors.postalCode && "border-red-500")}
            aria-invalid={!!errors.postalCode}
            required
            maxLength={7}
          />
          {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
          {isLoadingAddress && <p className="text-blue-500 text-sm mt-1">住所を取得中...</p>}
        </div>
      </div>

      {/* 住所関連フィールド - 1行にまとめる */}
      <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-4">
        <Label
          htmlFor="address"
          className="text-foreground text-base font-medium shrink-0 flex items-center justify-between pr-2"
        >
          住所
          <Badge variant="destructive" className="ml-2">
            必須
          </Badge>
        </Label>
        <div className="grid grid-cols-[2fr_2fr_4fr] gap-2">
          <Select
            value={prefecture ? PREFECTURE_MAP[prefecture] || prefecture : ""}
            onValueChange={(value) => {
              // 日本語名から英語キーに変換
              const englishKey =
                Object.entries(PREFECTURE_MAP).find(([_key, name]) => name === value)?.[0] || value;
              onPrefectureChange(englishKey);
            }}
          >
            <SelectTrigger
              disabled={isLoadingAddress}
              className={cn(
                "h-10 disabled:bg-gray-100 disabled:cursor-not-allowed",
                errors.prefecture && "border-red-500"
              )}
            >
              <SelectValue placeholder={isLoadingAddress ? "住所を取得中..." : "都道府県"} />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(PREFECTURE_MAP).map(([key, name]) => (
                <SelectItem key={key} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={city} onValueChange={onCityChange}>
            <SelectTrigger
              disabled={!prefecture || isLoadingCities || isLoadingAddress}
              className={cn(
                "h-10 disabled:bg-gray-100 disabled:cursor-not-allowed",
                errors.city && "border-red-500"
              )}
            >
              <SelectValue
                placeholder={
                  isLoadingCities
                    ? "市区町村を取得中..."
                    : isLoadingAddress
                      ? "住所を取得中..."
                      : !prefecture
                        ? "都道府県を先に選択"
                        : "市区町村"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {cityOptions.map((option) => (
                <SelectItem key={option.city} value={option.city}>
                  {option.city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            id="address"
            type="text"
            placeholder="住所を入力してください"
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            className={cn("w-full h-10", errors.address && "border-red-500")}
            aria-invalid={!!errors.address}
            required
          />
        </div>
        {(errors.prefecture || errors.city || errors.address) && (
          <div className="col-start-2">
            {errors.prefecture && <p className="text-red-500 text-sm mt-1">{errors.prefecture}</p>}
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
        )}
      </div>
    </>
  );
};
