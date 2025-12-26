"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type CityOption, PREFECTURE_MAP } from "@/lib/constants/prefectureMap";
import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";

interface AppraisalSearchFormProps {
  onSearch?: (searchData: AppraisalSearchFormData) => void;
  searchType?: "sale" | "rental";
  initialPropertyType?: string | null;
}

export interface AppraisalSearchFormData {
  prefecture: string;
  city: string;
  propertyCategory: string;
  propertyFeatures: string[];
  appraisalMethod: string;
  agentName: string;
}

export function AppraisalSearchForm({
  onSearch,
  searchType = "sale",
  initialPropertyType,
}: AppraisalSearchFormProps) {
  const [formData, setFormData] = useState<AppraisalSearchFormData>({
    prefecture: "",
    city: "",
    propertyCategory: "",
    propertyFeatures: [],
    appraisalMethod: "",
    agentName: "",
  });

  const [cityOptions, setCityOptions] = useState<CityOption[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  // 物件種別に応じて初期値を設定
  useEffect(() => {
    if (initialPropertyType) {
      // 物件種別に応じて不動産種別を設定
      let propertyCategory = "";

      switch (initialPropertyType) {
        case "land":
          propertyCategory = "land";
          break;
        case "mansion":
        case "house":
        case "apartment":
        case "building":
        case "commercial":
        case "other":
          propertyCategory = "mansion"; // マンションをデフォルトに
          break;
        // 賃貸物件の場合
        case "rental_apartment":
        case "rental_house":
        case "rental_commercial":
        case "rental_other":
          propertyCategory = "apartment"; // 賃貸はアパートをデフォルトに
          break;
        default:
          propertyCategory = "";
      }

      setFormData((prev) => ({
        ...prev,
        propertyCategory,
      }));
    }
  }, [initialPropertyType]);

  // 都道府県から市区町村を取得する関数
  const fetchCitiesFromPrefecture = async (prefectureKey: string) => {
    const prefectureName = PREFECTURE_MAP[prefectureKey];
    if (!prefectureName) return;

    setIsLoadingCities(true);
    try {
      const response = await fetch(
        `/api/cities?prefecture=${encodeURIComponent(prefectureName)}`,
      );
      const result = await response.json();

      if (result.success && result.data) {
        setCityOptions(result.data);
      } else {
        console.error("市区町村取得エラー:", result.error);
        setCityOptions([]);
      }
    } catch (error) {
      console.error("市区町村取得エラー:", error);
      setCityOptions([]);
    } finally {
      setIsLoadingCities(false);
    }
  };

  const handleInputChange = (
    field: keyof AppraisalSearchFormData,
    value: string | string[],
  ) => {
    // 都道府県が変更された場合
    if (field === "prefecture") {
      const prefectureValue = typeof value === "string" ? value : "";
      setFormData((prev) => ({
        ...prev,
        prefecture: prefectureValue,
        city: "", // 市区町村をリセット
      }));
      setCityOptions([]);
      if (prefectureValue) {
        fetchCitiesFromPrefecture(prefectureValue);
      }
      return;
    }

    // propertyFeatures (配列) の場合
    if (field === "propertyFeatures") {
      setFormData((prev) => ({
        ...prev,
        propertyFeatures: Array.isArray(value) ? value : [value],
      }));
      return;
    }

    // その他のフィールド (文字列)
    if (typeof value === "string") {
      setFormData(
        (prev) =>
          ({
            ...prev,
            [field]: value,
          }) as AppraisalSearchFormData,
      );
    }
  };

  const handleSearch = () => {
    onSearch?.(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="space-y-6">
        {/* 3列レイアウト */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 1列目: 都道府県・市区町村 */}
          <div className="flex-1">
            <Label className="mb-2 block">都道府県・市区町村</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <div className="relative">
                  <Select
                    value={formData.prefecture}
                    onValueChange={(value) =>
                      handleInputChange("prefecture", value)
                    }
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="都道府県を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(PREFECTURE_MAP).map(([key, name]) => (
                        <SelectItem key={key} value={key}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="relative">
                <div className="relative">
                  <Select
                    value={formData.city}
                    onValueChange={(value) => handleInputChange("city", value)}
                  >
                    <SelectTrigger
                      className="w-full bg-white disabled:bg-gray-100"
                      disabled={!formData.prefecture || isLoadingCities}
                    >
                      <SelectValue
                        placeholder={
                          isLoadingCities
                            ? "市区町村を取得中..."
                            : !formData.prefecture
                              ? "都道府県を先に選択"
                              : "市区町村を選択"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {cityOptions.map((option, index) => (
                        <SelectItem
                          key={`${index}-${option.city}`}
                          value={option.city}
                        >
                          {option.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* 2列目: 不動産種別 */}
          <div className="flex-1">
            <Label className="mb-2 block">不動産種別</Label>
            <div className="relative">
              <div className="relative">
                <Select
                  value={formData.propertyCategory}
                  onValueChange={(value) =>
                    handleInputChange("propertyCategory", value)
                  }
                >
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ikkodate">一戸建て</SelectItem>
                    <SelectItem value="mansion">マンション</SelectItem>
                    <SelectItem value="land">土地</SelectItem>
                    <SelectItem value="apartment">アパート</SelectItem>
                    <SelectItem value="commercial">
                      店舗・事務所・倉庫・工場
                    </SelectItem>
                    <SelectItem value="accommodation">宿泊施設</SelectItem>
                    <SelectItem value="leased_land">底地・借地</SelectItem>
                    <SelectItem value="parking">駐車場</SelectItem>
                    <SelectItem value="entire_building">一棟ビル</SelectItem>
                    <SelectItem value="entire_mansion">
                      一棟マンション
                    </SelectItem>
                    <SelectItem value="other">その他</SelectItem>
                    <SelectItem value="none">該当なし</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* 3列目: 物件特徴 */}
          <div className="flex-1">
            <Label className="mb-2 block">物件特徴</Label>
            <div className="relative">
              <div className="relative">
                <Select
                  value={formData.propertyFeatures[0] || ""}
                  onValueChange={(value) =>
                    handleInputChange("propertyFeatures", [value])
                  }
                >
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">一般物件</SelectItem>
                    <SelectItem value="leased_land">底地・借地</SelectItem>
                    <SelectItem value="urban_control">
                      市街地調整区域・農地
                    </SelectItem>
                    <SelectItem value="sloping_land">傾斜地・擁壁</SelectItem>
                    <SelectItem value="row_house">連棟式建物</SelectItem>
                    <SelectItem value="disclosure">告知事項</SelectItem>
                    <SelectItem value="forest">山林</SelectItem>
                    <SelectItem value="private_road">私道</SelectItem>
                    <SelectItem value="no_rebuild">再建築不可</SelectItem>
                    <SelectItem value="co_ownership">共有持分</SelectItem>
                    <SelectItem value="auction">競売・任意売却</SelectItem>
                    <SelectItem value="other">その他</SelectItem>
                    <SelectItem value="none">該当なし</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* 2行目: 希望査定方法、不動産業者名 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 希望査定方法 */}
          <div className="flex-1">
            <Label className="mb-2 block">希望査定方法</Label>
            <div className="relative">
              <div className="relative">
                <Select
                  value={formData.appraisalMethod}
                  onValueChange={(value) =>
                    handleInputChange("appraisalMethod", value)
                  }
                >
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="selling_price">
                      売出し価格査定
                    </SelectItem>
                    <SelectItem value="purchase_price">
                      買取り価格査定
                    </SelectItem>
                    <SelectItem value="contract_price">成約価格査定</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* 不動産業者名 */}
          <div className="flex-1">
            <Label className="mb-2 block">不動産業者名</Label>
            <Input
              type="text"
              placeholder="業者名を入力"
              value={formData.agentName}
              onChange={(e) => handleInputChange("agentName", e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* 検索ボタン */}
        <div className="flex justify-center">
          <Button
            onClick={handleSearch}
            className="bg-[#093893] hover:bg-[#072a6f] text-white px-8 py-3 rounded-md flex items-center gap-2 text-lg"
          >
            <IoSearch className="w-5 h-5" />
            査定検索
          </Button>
        </div>
      </div>
    </div>
  );
}
