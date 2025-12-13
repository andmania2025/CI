"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultipleSelect, type TTag } from "@/components/ui/multiple-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PROPERTY_CATEGORY_OPTIONS,
  PROPERTY_FEATURES_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "@/data/searchOptions";
import { PREFECTURE_MAP } from "@/lib/constants/prefectureMap";
import { useCitiesQuery } from "@/lib/tanstack-query/queries/cities";
import React, { useState, useCallback, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface DetailedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (searchData: DetailedSearchData) => void;
  searchType?: "sale" | "rental";
  initialData?: Partial<DetailedSearchData>;
}

export interface DetailedSearchData {
  prefecture: string;
  city: string;
  propertyType: string;
  transactionType: string;
  propertyCategory: string;
  propertyFeatures: string[];
  agentName: string;
}

export function DetailedSearchModal({
  isOpen,
  onClose,
  onSearch,
  initialData,
}: DetailedSearchModalProps) {
  const [formData, setFormData] = useState<DetailedSearchData>({
    prefecture: initialData?.prefecture || "",
    city: initialData?.city || "",
    propertyType: initialData?.propertyType || "",
    transactionType: initialData?.transactionType || "",
    propertyCategory: initialData?.propertyCategory || "",
    propertyFeatures: initialData?.propertyFeatures || [],
    agentName: initialData?.agentName || "",
  });

  const [selectedPropertyFeatures, setSelectedPropertyFeatures] = useState<TTag[]>([]);

  // 都道府県キーから都道府県名を取得
  const prefectureName = formData.prefecture ? PREFECTURE_MAP[formData.prefecture] : undefined;

  // TanStack Queryを使用して市区町村データを取得
  const {
    data: cityOptions = [],
    isLoading: isLoadingCities,
    error: citiesError,
  } = useCitiesQuery(prefectureName, !!formData.prefecture);

  // エラーが発生した場合はコンソールに出力（admin統合時に確認）
  if (citiesError) {
    console.error("市区町村取得エラー:", citiesError);
  }

  // 旧実装（admin統合時に確認のためコメントアウトで残す）
  // const [cityOptions, setCityOptions] = useState<CityOption[]>([]);
  // const [isLoadingCities, setIsLoadingCities] = useState(false);
  //
  // // 都道府県から市区町村を取得する関数
  // const fetchCitiesFromPrefecture = async (prefectureKey: string) => {
  //   const prefectureName = PREFECTURE_MAP[prefectureKey];
  //   if (!prefectureName) return;
  //
  //   setIsLoadingCities(true);
  //   try {
  //     const response = await fetch(`/api/cities?prefecture=${encodeURIComponent(prefectureName)}`);
  //     const result = await response.json();
  //
  //     if (result.success && result.data) {
  //       setCityOptions(result.data);
  //     } else {
  //       console.error("市区町村取得エラー:", result.error);
  //       setCityOptions([]);
  //     }
  //   } catch (error) {
  //     console.error("市区町村取得エラー:", error);
  //     setCityOptions([]);
  //   } finally {
  //     setIsLoadingCities(false);
  //   }
  // };

  // initialDataが変更された時にフォームデータを更新
  useEffect(() => {
    if (initialData) {
      setFormData({
        prefecture: initialData.prefecture || "",
        city: initialData.city || "",
        propertyType: initialData.propertyType || "",
        transactionType: initialData.transactionType || "",
        propertyCategory: initialData.propertyCategory || "",
        propertyFeatures: initialData.propertyFeatures || [],
        agentName: initialData.agentName || "",
      });

      // 物件特徴の選択状態も更新
      if (initialData.propertyFeatures && initialData.propertyFeatures.length > 0) {
        const selectedFeatures = PROPERTY_FEATURES_OPTIONS.filter((feature) =>
          initialData.propertyFeatures?.includes(feature.key)
        );
        setSelectedPropertyFeatures(selectedFeatures);
      } else {
        setSelectedPropertyFeatures([]);
      }
    }
  }, [initialData]);

  const handleInputChange = (field: keyof DetailedSearchData, value: string | string[]) => {
    // 都道府県が変更された場合、市区町村をリセットしてから都道府県を設定
    if (field === "prefecture") {
      const prefectureValue = typeof value === "string" ? value : "";
      setFormData((prev) => ({
        ...prev,
        [field]: prefectureValue,
        city: "", // 市区町村をリセット
      }));
      // 旧実装（admin統合時に確認のためコメントアウトで残す）
      // setCityOptions([]);
      // if (prefectureValue) {
      //   fetchCitiesFromPrefecture(prefectureValue);
      // }
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handlePropertyFeaturesChange = useCallback((selectedItems: TTag[]) => {
    setSelectedPropertyFeatures(selectedItems);
    const featureKeys = selectedItems.map((item) => item.key);
    setFormData((prev) => ({
      ...prev,
      propertyFeatures: featureKeys,
    }));
  }, []);

  const handleSearch = () => {
    onSearch(formData);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-700">詳細検索</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors h-auto w-auto p-1"
          >
            <IoClose className="w-6 h-6" />
          </Button>
        </div>

        {/* コンテンツ */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左カラム */}
            <div className="space-y-6">
              {/* 都道府県・市区町村 */}
              <div>
                <Label className="mb-2 block font-medium">都道府県・市区町村</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Select
                    value={formData.prefecture}
                    onValueChange={(value) => handleInputChange("prefecture", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="都道府県を選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(PREFECTURE_MAP).map(([key, name]) => (
                        <SelectItem key={key} value={key}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={formData.city}
                    onValueChange={(value) => handleInputChange("city", value)}
                  >
                    <SelectTrigger
                      className="w-full disabled:bg-gray-100"
                      disabled={!formData.prefecture || isLoadingCities}
                    >
                      <SelectValue
                        placeholder={
                          isLoadingCities
                            ? "市区町村を取得中..."
                            : !formData.prefecture
                              ? "都道府県を先に選択"
                              : "市区町村を選択してください"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {cityOptions.map((option) => (
                        <SelectItem key={`${option.city}-${option.suburb}`} value={option.city}>
                          {option.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 取扱物件種別 */}
              <div>
                <Label className="mb-2 block font-medium">取扱物件種別</Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => handleInputChange("propertyType", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="取扱物件種別を選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROPERTY_TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option.key} value={option.key}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 取引形態 */}
              <div>
                <Label className="mb-2 block font-medium">取引形態</Label>
                <Select
                  value={formData.transactionType}
                  onValueChange={(value) => handleInputChange("transactionType", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="取引形態を選択して下さい" />
                  </SelectTrigger>
                  <SelectContent>
                    {TRANSACTION_TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option.key} value={option.key}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 不動産種別 */}
              <div>
                <Label className="mb-2 block font-medium">不動産種別</Label>
                <Select
                  value={formData.propertyCategory}
                  onValueChange={(value) => handleInputChange("propertyCategory", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="不動産種別を選択して下さい" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROPERTY_CATEGORY_OPTIONS.map((option) => (
                      <SelectItem key={option.key} value={option.key}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 右カラム */}
            <div className="space-y-6">
              {/* 物件特徴 */}
              <div>
                <Label className="mb-2 block font-medium">物件特徴</Label>
                <MultipleSelect
                  tags={PROPERTY_FEATURES_OPTIONS}
                  onChange={handlePropertyFeaturesChange}
                  defaultValue={selectedPropertyFeatures}
                />
              </div>

              {/* 不動産業者名 */}
              <div>
                <Label className="mb-2 block font-medium">不動産業者名</Label>
                <Input
                  type="text"
                  placeholder="業者名を入力"
                  value={formData.agentName}
                  onChange={(e) => handleInputChange("agentName", e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <Button
            onClick={handleClose}
            variant="outline"
            className="px-6 py-2 text-gray-600 border-gray-300 hover:bg-gray-50"
          >
            閉じる
          </Button>
          <Button
            onClick={handleSearch}
            className="bg-[#093893] hover:bg-[#072a6f] text-white px-6 py-2"
          >
            検索
          </Button>
        </div>
      </div>
    </div>
  );
}
