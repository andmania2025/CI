"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { searchDataService } from "@/services/searchDataService";
import type { SearchOption } from "@/types/search";
import type React from "react";
import { useEffect, useState } from "react";
import type { PropertyDetailTabsProps } from "../types";

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
  }, []);

  return (
    <div className="h-full">
      <Card className="h-full flex flex-col gap-0">
        <CardHeader className="flex-shrink-0 pb-2">
          <CardTitle className="text-lg">基本情報</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 min-h-0 px-6 py-0">
          <div className="h-full overflow-auto">
            <Table>
              <TableBody>
                <TableRow>
                  <TableHead className="w-1/3 align-middle sticky left-0 bg-background pl-0">
                    物件名
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input defaultValue={property.title} className="max-w-md" />
                    ) : (
                      property.title
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    更新日
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <DatePicker
                        value={updateDate}
                        onChange={setUpdateDate}
                        placeholder="更新日を選択"
                        className="max-w-xs"
                      />
                    ) : (
                      updateDate?.toISOString().split("T")[0] || property.updateDate
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    次回更新予定日
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <DatePicker
                        value={nextUpdateDate}
                        onChange={setNextUpdateDate}
                        placeholder="次回更新予定日を選択"
                        className="max-w-xs"
                      />
                    ) : (
                      nextUpdateDate?.toISOString().split("T")[0] || property.nextUpdateDate
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    掲載状況
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select defaultValue={property.publicationStatus}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="公開">公開</SelectItem>
                          <SelectItem value="非公開">非公開</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge
                        variant={
                          (property.publicationStatus === "公開" ? "success" : "neutral") as
                            | "success"
                            | "neutral"
                        }
                      >
                        {property.publicationStatus}
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    問い合わせ数
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        type="number"
                        defaultValue={property.inquiryCount.toString()}
                        className="max-w-xs"
                      />
                    ) : (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                        {property.inquiryCount}回
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    不動産業者名
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input defaultValue="サンプル不動産株式会社" className="max-w-md" />
                    ) : (
                      "サンプル不動産株式会社"
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    都道府県
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select value={selectedPrefecture} onValueChange={setSelectedPrefecture}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tokyo">東京都</SelectItem>
                          <SelectItem value="kanagawa">神奈川県</SelectItem>
                          <SelectItem value="saitama">埼玉県</SelectItem>
                          <SelectItem value="chiba">千葉県</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      "東京都"
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    市区町村
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select value={selectedCity} onValueChange={setSelectedCity}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city.value} value={city.value}>
                              {city.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      "渋谷区"
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    町名・番地
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input defaultValue="恵比寿1-2-3" className="max-w-md" />
                    ) : (
                      "恵比寿1-2-3"
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    最寄り駅
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input defaultValue="恵比寿駅 徒歩5分" className="max-w-md" />
                    ) : (
                      "恵比寿駅 徒歩5分"
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    担当者名
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input defaultValue="田中太郎" className="max-w-md" />
                    ) : (
                      "田中太郎"
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    電話番号
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input defaultValue="03-1234-5678" className="max-w-xs" />
                    ) : (
                      "03-1234-5678"
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    メールアドレス
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input defaultValue="tanaka@example.com" type="email" className="max-w-md" />
                    ) : (
                      "tanaka@example.com"
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-top pt-4 pb-4 sticky left-0 bg-background pl-0">
                    売主の名称または商号
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input defaultValue="サンプル不動産株式会社" className="max-w-md" />
                    ) : (
                      "サンプル不動産株式会社"
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
