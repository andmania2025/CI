"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import type { PropertyDetailTabsProps } from "../types";
import { CheckboxGroupRow, TextAreaRow } from "./PropertyDetailRows";

export const FeaturesTab = ({ property, isEditMode = false }: PropertyDetailTabsProps) => {
  return (
    <div className="h-full">
      <Card className="h-full flex flex-col gap-0">
        <CardHeader className="shrink-0 pb-2">
          <CardTitle className="text-lg">設備・特徴</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 min-h-0 px-6 py-0">
          <div className="h-full overflow-auto">
            <Table>
              <TableBody>
                {/* キッチン */}
                <CheckboxGroupRow
                  label="キッチン"
                  isEditMode={isEditMode}
                  items={[
                    {
                      id: "ihStove",
                      label: "IHコンロ",
                      checked: property.kitchen?.ihStove ?? false,
                    },
                    {
                      id: "gasStove",
                      label: "ガスコンロ",
                      checked: property.kitchen?.gasStove ?? false,
                    },
                    {
                      id: "systemKitchen",
                      label: "システムキッチン",
                      checked: property.kitchen?.systemKitchen ?? true,
                    },
                  ]}
                />

                {/* バス・トイレ */}
                <CheckboxGroupRow
                  label="バス・トイレ"
                  isEditMode={isEditMode}
                  items={[
                    {
                      id: "separateBathToilet",
                      label: "バストイレ別",
                      checked: property.bathroom?.separateBathToilet ?? true,
                    },
                    {
                      id: "reheating",
                      label: "追い焚き",
                      checked: property.bathroom?.reheating ?? false,
                    },
                    {
                      id: "bathDryer",
                      label: "浴室乾燥機",
                      checked: property.bathroom?.bathDryer ?? false,
                    },
                  ]}
                />

                {/* 空調 */}
                <CheckboxGroupRow
                  label="空調"
                  isEditMode={isEditMode}
                  items={[
                    {
                      id: "airConditioner",
                      label: "エアコン",
                      checked: property.cooling?.airConditioner ?? true,
                    },
                    {
                      id: "floorHeating",
                      label: "床暖房",
                      checked: property.cooling?.floorHeating ?? false,
                    },
                  ]}
                />

                {/* セキュリティ */}
                <CheckboxGroupRow
                  label="セキュリティ"
                  isEditMode={isEditMode}
                  items={[
                    {
                      id: "autoLock",
                      label: "オートロック",
                      checked: property.security?.autoLock ?? true,
                    },
                    {
                      id: "securityCamera",
                      label: "防犯カメラ",
                      checked: property.security?.securityCamera ?? false,
                    },
                    {
                      id: "tvIntercom",
                      label: "TVモニター付インターホン",
                      checked: property.security?.tvIntercom ?? false,
                    },
                  ]}
                />

                {/* 収納 */}
                <CheckboxGroupRow
                  label="収納"
                  isEditMode={isEditMode}
                  items={[
                    {
                      id: "walkInCloset",
                      label: "ウォークインクローゼット",
                      checked: property.storage?.walkInCloset ?? false,
                    },
                    {
                      id: "shoebox",
                      label: "シューズボックス",
                      checked: property.storage?.shoebox ?? true,
                    },
                  ]}
                />

                {/* その他設備 */}
                <CheckboxGroupRow
                  label="その他設備"
                  isEditMode={isEditMode}
                  items={[
                    {
                      id: "elevator",
                      label: "エレベーター",
                      checked: property.otherEquipment?.elevator ?? false,
                    },
                    {
                      id: "deliveryBox",
                      label: "宅配ボックス",
                      checked: property.otherEquipment?.deliveryBox ?? true,
                    },
                    {
                      id: "parking",
                      label: "駐車場",
                      checked: property.otherEquipment?.parking ?? true,
                    },
                    {
                      id: "bicycleParking",
                      label: "駐輪場",
                      checked: property.otherEquipment?.bicycleParking ?? false,
                    },
                  ]}
                />

                {/* インターネット環境 */}
                <TextAreaRow
                  label="インターネット環境"
                  isEditMode={isEditMode}
                  defaultValue={property.internet || "光回線対応"}
                  value={property.internet || "光回線対応"}
                  rows={2}
                />

                {/* 特徴 */}
                <CheckboxGroupRow
                  label="特徴"
                  isEditMode={isEditMode}
                  items={[
                    {
                      id: "cornerRoom",
                      label: "角部屋",
                      checked: property.characteristics?.includes("角部屋") ?? false,
                    },
                    {
                      id: "southFacing",
                      label: "南向き",
                      checked: property.characteristics?.includes("南向き") ?? false,
                    },
                    {
                      id: "renovated",
                      label: "リノベーション済み",
                      checked: property.characteristics?.includes("リノベーション済み") ?? false,
                    },
                    {
                      id: "designers",
                      label: "デザイナーズ",
                      checked: property.characteristics?.includes("デザイナーズ") ?? false,
                    },
                  ]}
                />

                {/* 備考 */}
                <TextAreaRow
                  label="備考"
                  isEditMode={isEditMode}
                  defaultValue={property.remarks || "ペット可（要相談）、楽器演奏可"}
                  value={property.remarks || "ペット可（要相談）、楽器演奏可"}
                  rows={3}
                />

                {/* 物件説明 */}
                <TextAreaRow
                  label="物件説明"
                  isEditMode={isEditMode}
                  defaultValue={
                    property.description ||
                    "恵比寿駅から徒歩5分の好立地にある築5年の鉄骨造アパートです。2LDKの間取りで、システムキッチンやユニットバス完備。オートロック付きでセキュリティも安心です。"
                  }
                  value={property.description || ""}
                  placeholder="物件の詳細な説明を入力してください（立地、設備、特徴など）"
                  rows={5}
                />
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
