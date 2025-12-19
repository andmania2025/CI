"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { searchDataService } from "@/services/searchDataService";
import type { SearchOption } from "@/types/search";
import { useEffect, useState } from "react";
import type { PropertyDetailTabsProps } from "../types";
import { DateInputRow, NumberInputRow, SelectInputRow, TextInputRow } from "./PropertyDetailRows";

export const BasicInfoTab = ({ property, isEditMode = false }: PropertyDetailTabsProps) => {
  const [updateDate, setUpdateDate] = useState<Date | undefined>(
    property.updateDate ? new Date(property.updateDate) : undefined
  );
  const [nextUpdateDate, setNextUpdateDate] = useState<Date | undefined>(
    property.nextUpdateDate ? new Date(property.nextUpdateDate) : undefined
  );

  // 都道府県と市区町村のstate
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("tokyo");
  const [selectedCity, setSelectedCity] = useState<string>("shibuya");
  const [cities, setCities] = useState<SearchOption[]>([]);

  // 都道府県が変更されたときに市区町村を更新
  useEffect(() => {
    const loadCities = async () => {
      try {
        const citiesData = await searchDataService.getCities(selectedPrefecture);
        setCities(citiesData);
        // 市区町村が変更された場合は最初の市区町村を選択
        if (citiesData.length > 0) {
          setSelectedCity(citiesData[0].value);
        }
      } catch (error) {
        console.error("市区町村の読み込みに失敗しました:", error);
      }
    };

    if (selectedPrefecture) {
      loadCities();
    }
  }, [selectedPrefecture]);

  // 初期データ読み込み
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const citiesData = await searchDataService.getCities(selectedPrefecture);
        setCities(citiesData);
      } catch (error) {
        console.error("初期データの読み込みに失敗しました:", error);
      }
    };

    loadInitialData();
  }, [selectedPrefecture]);

  return (
    <div className="h-full">
      <Card className="h-full flex flex-col gap-0">
        <CardHeader className="shrink-0 pb-2">
          <CardTitle className="text-lg">基本情報</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 min-h-0 px-6 py-0">
          <div className="h-full overflow-auto">
            <Table>
              <TableBody>
                <TextInputRow
                  label="物件名"
                  isEditMode={isEditMode}
                  defaultValue={property.title}
                  value={property.title}
                />

                <DateInputRow
                  label="更新日"
                  isEditMode={isEditMode}
                  value={updateDate}
                  onChange={setUpdateDate}
                  placeholder="更新日を選択"
                />

                <DateInputRow
                  label="次回更新予定日"
                  isEditMode={isEditMode}
                  value={nextUpdateDate}
                  onChange={setNextUpdateDate}
                  placeholder="次回更新予定日を選択"
                />

                <SelectInputRow
                  label="掲載状況"
                  isEditMode={isEditMode}
                  defaultValue={property.publicationStatus}
                  value={property.publicationStatus}
                  options={[
                    { value: "公開", label: "公開" },
                    { value: "非公開", label: "非公開" },
                  ]}
                  renderView={(val) => (
                    <Badge
                      variant={(val === "公開" ? "success" : "neutral") as "success" | "neutral"}
                    >
                      {val}
                    </Badge>
                  )}
                />

                <NumberInputRow
                  label="問い合わせ数"
                  isEditMode={isEditMode}
                  defaultValue={property.inquiryCount}
                  value={property.inquiryCount}
                  unit="回"
                  renderView={(val) => (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                      {val}回
                    </Badge>
                  )}
                />

                <TextInputRow
                  label="不動産業者名"
                  isEditMode={isEditMode}
                  defaultValue="サンプル不動産株式会社"
                  value="サンプル不動産株式会社"
                />

                <SelectInputRow
                  label="都道府県"
                  isEditMode={isEditMode}
                  defaultValue={selectedPrefecture}
                  value={isEditMode ? selectedPrefecture : "東京都"}
                  onValueChange={setSelectedPrefecture}
                  options={[
                    { value: "tokyo", label: "東京都" },
                    { value: "kanagawa", label: "神奈川県" },
                    { value: "saitama", label: "埼玉県" },
                    { value: "chiba", label: "千葉県" },
                  ]}
                />

                <SelectInputRow
                  label="市区町村"
                  isEditMode={isEditMode}
                  defaultValue={selectedCity}
                  value={isEditMode ? selectedCity : "渋谷区"}
                  onValueChange={setSelectedCity}
                  options={cities}
                />

                <TextInputRow
                  label="町名・番地"
                  isEditMode={isEditMode}
                  defaultValue="恵比寿1-2-3"
                  value="恵比寿1-2-3"
                />

                <TextInputRow
                  label="最寄り駅"
                  isEditMode={isEditMode}
                  defaultValue="恵比寿駅 徒歩5分"
                  value="恵比寿駅 徒歩5分"
                />

                <TextInputRow
                  label="担当者名"
                  isEditMode={isEditMode}
                  defaultValue="田中太郎"
                  value="田中太郎"
                />

                <TextInputRow
                  label="電話番号"
                  isEditMode={isEditMode}
                  defaultValue="03-1234-5678"
                  value="03-1234-5678"
                />

                <TextInputRow
                  label="メールアドレス"
                  isEditMode={isEditMode}
                  defaultValue="tanaka@example.com"
                  value="tanaka@example.com"
                  placeholder="メールアドレスを入力"
                />

                <TextInputRow
                  label="売主の名称または商号"
                  isEditMode={isEditMode}
                  defaultValue="サンプル不動産株式会社"
                  value="サンプル不動産株式会社"
                />
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
