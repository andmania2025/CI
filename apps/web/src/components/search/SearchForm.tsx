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
import { PREFECTURE_MAP } from "@/lib/constants/prefectureMap";
import { useCitiesQuery } from "@/lib/tanstack-query/queries/cities";
import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { type DetailedSearchData, DetailedSearchModal } from "./DetailedSearchModal";

interface SearchFormProps {
  onSearch?: (searchData: SearchFormData) => void;
  onDetailedSearch?: (searchData: DetailedSearchData) => void;
  searchType?: "sale" | "rental";
  initialPropertyType?: string | null;
}

export interface SearchFormData {
  prefecture: string;
  city: string;
  propertyType: string;
  transactionType: string;
  agentName: string;
}

export function SearchForm({
  onSearch,
  onDetailedSearch,
  searchType = "sale",
  initialPropertyType,
}: SearchFormProps) {
  const [formData, setFormData] = useState<SearchFormData>({
    prefecture: "",
    city: "",
    propertyType: "",
    transactionType: "",
    agentName: "",
  });

  const [isDetailedSearchModalOpen, setIsDetailedSearchModalOpen] = useState(false);

  // 検索タイプと物件種別に応じて初期値を設定
  useEffect(() => {
    if (initialPropertyType) {
      // 物件種別に応じて取扱物件種別を設定
      let propertyType = "";

      switch (initialPropertyType) {
        case "land":
          propertyType = "land";
          break;
        case "mansion":
        case "house":
        case "apartment":
        case "building":
        case "commercial":
        case "other":
          propertyType = "mansion"; // マンションをデフォルトに
          break;
        // 賃貸物件の場合
        case "rental_apartment":
        case "rental_house":
        case "rental_commercial":
        case "rental_other":
          propertyType = "apartment"; // 賃貸はアパートをデフォルトに
          break;
        default:
          propertyType = "";
      }

      setFormData((prev) => ({
        ...prev,
        propertyType,
      }));
    }
  }, [initialPropertyType]);

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

  const handleInputChange = (field: keyof SearchFormData, value: string) => {
    // 都道府県が変更された場合、市区町村をリセットしてから都道府県を設定
    if (field === "prefecture") {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
        city: "", // 市区町村をリセット
      }));
      // 旧実装（admin統合時に確認のためコメントアウトで残す）
      // setCityOptions([]);
      // if (value) {
      //   fetchCitiesFromPrefecture(value);
      // }
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSearch = () => {
    onSearch?.(formData);
  };

  const handleDetailedSearch = () => {
    // 詳細検索モーダルを開く（initialDataプロパティでデータが渡される）
    setIsDetailedSearchModalOpen(true);
  };

  const handleDetailedSearchSubmit = (detailedSearchData: DetailedSearchData) => {
    onDetailedSearch?.(detailedSearchData);
  };

  const handleCloseDetailedSearchModal = () => {
    setIsDetailedSearchModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="space-y-6">
          {/* 1行目: 都道府県・市区町村、取扱物件種別 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 都道府県・市区町村 */}
            <div className="flex-1">
              <Label htmlFor="prefecture-select" className="mb-2 block">
                都道府県・市区町村
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <Select
                    value={formData.prefecture}
                    onValueChange={(value) => handleInputChange("prefecture", value)}
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="都道府県を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hokkaido">北海道</SelectItem>
                      <SelectItem value="aomori">青森県</SelectItem>
                      <SelectItem value="iwate">岩手県</SelectItem>
                      <SelectItem value="miyagi">宮城県</SelectItem>
                      <SelectItem value="akita">秋田県</SelectItem>
                      <SelectItem value="yamagata">山形県</SelectItem>
                      <SelectItem value="fukushima">福島県</SelectItem>
                      <SelectItem value="ibaraki">茨城県</SelectItem>
                      <SelectItem value="tochigi">栃木県</SelectItem>
                      <SelectItem value="gunma">群馬県</SelectItem>
                      <SelectItem value="saitama">埼玉県</SelectItem>
                      <SelectItem value="chiba">千葉県</SelectItem>
                      <SelectItem value="tokyo">東京都</SelectItem>
                      <SelectItem value="kanagawa">神奈川県</SelectItem>
                      <SelectItem value="niigata">新潟県</SelectItem>
                      <SelectItem value="toyama">富山県</SelectItem>
                      <SelectItem value="ishikawa">石川県</SelectItem>
                      <SelectItem value="fukui">福井県</SelectItem>
                      <SelectItem value="yamanashi">山梨県</SelectItem>
                      <SelectItem value="nagano">長野県</SelectItem>
                      <SelectItem value="gifu">岐阜県</SelectItem>
                      <SelectItem value="shizuoka">静岡県</SelectItem>
                      <SelectItem value="aichi">愛知県</SelectItem>
                      <SelectItem value="mie">三重県</SelectItem>
                      <SelectItem value="shiga">滋賀県</SelectItem>
                      <SelectItem value="kyoto">京都府</SelectItem>
                      <SelectItem value="osaka">大阪府</SelectItem>
                      <SelectItem value="hyogo">兵庫県</SelectItem>
                      <SelectItem value="nara">奈良県</SelectItem>
                      <SelectItem value="wakayama">和歌山県</SelectItem>
                      <SelectItem value="tottori">鳥取県</SelectItem>
                      <SelectItem value="shimane">島根県</SelectItem>
                      <SelectItem value="okayama">岡山県</SelectItem>
                      <SelectItem value="hiroshima">広島県</SelectItem>
                      <SelectItem value="yamaguchi">山口県</SelectItem>
                      <SelectItem value="tokushima">徳島県</SelectItem>
                      <SelectItem value="kagawa">香川県</SelectItem>
                      <SelectItem value="ehime">愛媛県</SelectItem>
                      <SelectItem value="kochi">高知県</SelectItem>
                      <SelectItem value="fukuoka">福岡県</SelectItem>
                      <SelectItem value="saga">佐賀県</SelectItem>
                      <SelectItem value="nagasaki">長崎県</SelectItem>
                      <SelectItem value="kumamoto">熊本県</SelectItem>
                      <SelectItem value="oita">大分県</SelectItem>
                      <SelectItem value="miyazaki">宮崎県</SelectItem>
                      <SelectItem value="kagoshima">鹿児島県</SelectItem>
                      <SelectItem value="okinawa">沖縄県</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                      {cityOptions.map((option) => (
                        <SelectItem key={`${option.city}-${option.suburb}`} value={option.city}>
                          {option.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* 取扱物件種別 */}
            <div className="flex-1">
              <Label htmlFor="property-type-select" className="mb-2 block">
                取扱物件種別
              </Label>
              <div className="relative">
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => handleInputChange("propertyType", value)}
                >
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">売買不動産</SelectItem>
                    <SelectItem value="other">その他</SelectItem>
                    <SelectItem value="rental">賃貸不動産</SelectItem>
                    <SelectItem value="investment">投資用・事業用不動産</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* 2行目: 取引形態、不動産業者名 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 取引形態 */}
            <div className="flex-1">
              <Label htmlFor="transaction-type-select" className="mb-2 block">
                取引形態
              </Label>
              <div className="relative">
                <Select
                  value={formData.transactionType}
                  onValueChange={(value) => handleInputChange("transactionType", value)}
                >
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seller">売主 (不動産買取)</SelectItem>
                    <SelectItem value="lender">貸主</SelectItem>
                    <SelectItem value="broker">仲介 (不動産媒介)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 不動産業者名 */}
            <div className="flex-1">
              <Label htmlFor="agent-name-input" className="mb-2 block">
                不動産業者名
              </Label>
              <Input
                id="agent-name-input"
                type="text"
                placeholder="業者名を入力"
                value={formData.agentName}
                onChange={(e) => handleInputChange("agentName", e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* 検索ボタン */}
          <div className="flex justify-end gap-2">
            <Button
              onClick={handleSearch}
              className="bg-[#093893] hover:bg-[#072a6f] text-white px-6 py-2 rounded-md flex items-center gap-2"
            >
              <IoSearch className="w-4 h-4" />
              検索
            </Button>

            {/* 詳細検索ボタン */}
            <Button
              onClick={handleDetailedSearch}
              variant="outline"
              className="border-[#093893] text-[#093893] hover:bg-[#093893] hover:text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <IoSearchOutline className="w-4 h-4" />
              詳細検索
            </Button>
          </div>
        </div>
      </div>

      {/* 詳細検索モーダル */}
      <DetailedSearchModal
        isOpen={isDetailedSearchModalOpen}
        onClose={handleCloseDetailedSearchModal}
        onSearch={handleDetailedSearchSubmit}
        searchType={searchType}
        initialData={{
          prefecture: formData.prefecture,
          city: formData.city,
          propertyType: formData.propertyType,
          transactionType: formData.transactionType,
          propertyCategory: "",
          propertyFeatures: [],
          agentName: formData.agentName,
        }}
      />
    </>
  );
}
