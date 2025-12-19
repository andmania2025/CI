"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { useEffect, useState } from "react";
import type { PropertyDetailTabsProps } from "../types";
import {
  AreaInputRow,
  BUILDING_STRUCTURE_OPTIONS,
  BooleanSelectRow,
  CITY_PLANNING_OPTIONS,
  CONTRACT_PERIOD_OPTIONS,
  CURRENT_STATUS_OPTIONS,
  DIRECTION_OPTIONS,
  DateInputRow,
  EASEMENT_OPTIONS,
  GAS_OPTIONS,
  LAND_NOTIFICATION_OPTIONS,
  LAND_RIGHTS_OPTIONS,
  LAND_USE_OPTIONS,
  MANAGEMENT_TYPE_OPTIONS,
  NumberInputRow,
  PET_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PercentInputRow,
  PriceInputRow,
  RENOVATION_OPTIONS,
  SelectInputRow,
  TextInputRow,
  UTILITY_OPTIONS,
  ZONING_OPTIONS,
} from "./PropertyDetailRows";

export const PropertyDetailsTab = ({ property, isEditMode = false }: PropertyDetailTabsProps) => {
  const [availableFrom, setAvailableFrom] = useState<Date | undefined>(
    property.availableFrom ? new Date(property.availableFrom) : undefined
  );

  useEffect(() => {
    if (property.availableFrom) {
      setAvailableFrom(new Date(property.availableFrom));
    }
  }, [property.availableFrom]);

  return (
    <div className="h-full">
      <Card className="h-full flex flex-col gap-0">
        <CardHeader className="shrink-0 pb-2">
          <CardTitle className="text-lg">物件詳細</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 min-h-0 px-6 py-0">
          <div className="h-full overflow-auto">
            <Table>
              <TableBody>
                {/* 物件種別 */}
                <SelectInputRow
                  label="物件種別"
                  isEditMode={isEditMode}
                  defaultValue={property.propertyType || "賃貸マンション"}
                  options={PROPERTY_TYPE_OPTIONS}
                  value={property.propertyType || "賃貸マンション"}
                />

                {/* 価格 */}
                <PriceInputRow
                  label={property.priceType === "sale" ? "売買価格" : "賃料"}
                  isEditMode={isEditMode}
                  defaultValue={property.price || 120000}
                  value={property.price}
                />

                {/* 管理費・共益費 */}
                <PriceInputRow
                  label="管理費・共益費"
                  isEditMode={isEditMode}
                  defaultValue={property.managementFee || 8000}
                  value={property.managementFee}
                />

                {/* 敷金 */}
                <PriceInputRow
                  label="敷金"
                  isEditMode={isEditMode}
                  defaultValue={property.deposit || 120000}
                  value={property.deposit}
                />

                {/* 礼金 */}
                <PriceInputRow
                  label="礼金"
                  isEditMode={isEditMode}
                  defaultValue={property.keyMoney || 120000}
                  value={property.keyMoney}
                />

                {/* 保証金 */}
                <PriceInputRow
                  label="保証金"
                  isEditMode={isEditMode}
                  defaultValue={property.securityDeposit || 0}
                  value={property.securityDeposit}
                  noValueText="なし"
                />

                {/* 間取り */}
                <TextInputRow
                  label="間取り"
                  isEditMode={isEditMode}
                  defaultValue={property.floorPlan || "2LDK"}
                  value={property.floorPlan}
                />

                {/* 専有面積 */}
                <AreaInputRow
                  label="専有面積"
                  isEditMode={isEditMode}
                  defaultValue={property.exclusiveArea || 80.0}
                  value={property.exclusiveArea}
                />

                {/* 土地面積 */}
                <AreaInputRow
                  label="土地面積"
                  isEditMode={isEditMode}
                  defaultValue={property.landArea || 100.0}
                  value={property.landArea}
                />

                {/* 築年数 */}
                <NumberInputRow
                  label="築年数"
                  isEditMode={isEditMode}
                  defaultValue={property.buildingAge || 5}
                  value={property.buildingAge}
                  unit="年"
                  formatValue={(val) => `築${val}年`}
                />

                {/* 建物構造 */}
                <SelectInputRow
                  label="建物構造"
                  isEditMode={isEditMode}
                  defaultValue={property.buildingStructure || "鉄骨造"}
                  value={property.buildingStructure || "鉄骨造"}
                  options={BUILDING_STRUCTURE_OPTIONS}
                />

                {/* 階数 */}
                <NumberInputRow
                  label="階数"
                  isEditMode={isEditMode}
                  defaultValue={property.totalFloors || 3}
                  value={property.totalFloors}
                  unit="階建て"
                  formatValue={(val) => `${val}階建て`}
                />

                {/* 所在階 */}
                <NumberInputRow
                  label="所在階"
                  isEditMode={isEditMode}
                  defaultValue={property.floor || 2}
                  value={property.floor}
                  unit="階"
                  formatValue={(val) => `${val}階`}
                />

                {/* 入居可能日 */}
                <DateInputRow
                  label="入居可能日"
                  isEditMode={isEditMode}
                  value={availableFrom}
                  onChange={setAvailableFrom}
                  placeholder="即入居可"
                />

                {/* 契約期間 */}
                <SelectInputRow
                  label="契約期間"
                  isEditMode={isEditMode}
                  defaultValue={property.contractPeriod || "2年"}
                  value={property.contractPeriod || "2年"}
                  options={CONTRACT_PERIOD_OPTIONS}
                />

                {/* ペット可否 */}
                <BooleanSelectRow
                  label="ペット可否"
                  isEditMode={isEditMode}
                  value={property.petAllowed}
                  trueLabel="可"
                  falseLabel="不可"
                  options={PET_OPTIONS}
                />

                {/* 建築条件 */}
                <TextInputRow
                  label="建築条件"
                  isEditMode={isEditMode}
                  defaultValue={property.buildingConditions || "普通建築物"}
                  value={property.buildingConditions}
                />

                {/* 建物面積・専有面積 */}
                <AreaInputRow
                  label="建物面積・専有面積"
                  isEditMode={isEditMode}
                  defaultValue={property.buildingArea || 80.0}
                  value={property.buildingArea}
                />

                {/* 間取り詳細 */}
                <TextInputRow
                  label="間取り詳細"
                  isEditMode={isEditMode}
                  defaultValue={
                    property.floorPlanDetails || "リビング・ダイニング・キッチン、寝室×2"
                  }
                  value={property.floorPlanDetails}
                />

                {/* 施工業者 */}
                <TextInputRow
                  label="施工業者"
                  isEditMode={isEditMode}
                  defaultValue={property.contractor || "サンプル建設株式会社"}
                  value={property.contractor}
                />

                {/* 建築年月 */}
                <TextInputRow
                  label="建築年月"
                  isEditMode={isEditMode}
                  defaultValue={property.constructionDate || "2019年3月"}
                  value={property.constructionDate}
                />

                {/* 建築確認番号 */}
                <TextInputRow
                  label="建築確認番号"
                  isEditMode={isEditMode}
                  defaultValue={property.buildingConfirmationNumber || "12345678901"}
                  value={property.buildingConfirmationNumber}
                />

                {/* バルコニー面積 */}
                <AreaInputRow
                  label="バルコニー面積"
                  isEditMode={isEditMode}
                  defaultValue={property.balconyArea || 6.0}
                  value={property.balconyArea}
                />

                {/* 修繕積立金 */}
                <PriceInputRow
                  label="修繕積立金"
                  isEditMode={isEditMode}
                  defaultValue={property.repairReserve || 0}
                  value={property.repairReserve}
                  noValueText="なし"
                />

                {/* 管理形態 */}
                <SelectInputRow
                  label="管理形態"
                  isEditMode={isEditMode}
                  defaultValue={property.managementType || "管理会社"}
                  value={property.managementType || "管理会社"}
                  options={MANAGEMENT_TYPE_OPTIONS}
                />

                {/* リフォーム */}
                <SelectInputRow
                  label="リフォーム"
                  isEditMode={isEditMode}
                  defaultValue={property.renovation || "なし"}
                  value={property.renovation || "なし"}
                  options={RENOVATION_OPTIONS}
                />

                {/* 主要採光面 */}
                <SelectInputRow
                  label="主要採光面"
                  isEditMode={isEditMode}
                  defaultValue={property.mainLighting || "南"}
                  value={property.mainLighting || "南"}
                  options={DIRECTION_OPTIONS}
                />

                {/* 想定年間収入 */}
                <PriceInputRow
                  label="想定年間収入"
                  isEditMode={isEditMode}
                  defaultValue={property.estimatedAnnualIncome || 0}
                  value={property.estimatedAnnualIncome}
                  noValueText="未設定"
                />

                {/* 総戸数・総区画数 */}
                <NumberInputRow
                  label="総戸数・総区画数"
                  isEditMode={isEditMode}
                  defaultValue={property.totalUnits || 20}
                  value={property.totalUnits}
                  unit="戸"
                  formatValue={(val) => `${val}戸`}
                />

                {/* 販売戸数・販売区画数 */}
                <NumberInputRow
                  label="販売戸数・販売区画数"
                  isEditMode={isEditMode}
                  defaultValue={property.saleUnits || 15}
                  value={property.saleUnits}
                  unit="戸"
                  formatValue={(val) => `${val}戸`}
                />

                {/* 土地権利 */}
                <SelectInputRow
                  label="土地権利"
                  isEditMode={isEditMode}
                  defaultValue={property.landRights || "所有権"}
                  value={property.landRights || "所有権"}
                  options={LAND_RIGHTS_OPTIONS}
                />

                {/* セットバック */}
                <NumberInputRow
                  label="セットバック"
                  isEditMode={isEditMode}
                  defaultValue={property.setback || 0}
                  value={property.setback}
                  unit="m"
                  step="0.01"
                  formatValue={(val) => (val ? `${val}m` : "なし")}
                />

                {/* 私道負担面積 */}
                <AreaInputRow
                  label="私道負担面積"
                  isEditMode={isEditMode}
                  defaultValue={property.privateRoadBurden || 0}
                  value={property.privateRoadBurden}
                />

                {/* 引渡 */}
                <TextInputRow
                  label="引渡"
                  isEditMode={isEditMode}
                  defaultValue={property.delivery || "2024年6月予定"}
                  value={property.delivery}
                />

                {/* 現況 */}
                <SelectInputRow
                  label="現況"
                  isEditMode={isEditMode}
                  defaultValue={property.currentStatus || "更地"}
                  value={property.currentStatus || "更地"}
                  options={CURRENT_STATUS_OPTIONS}
                />

                {/* 都市計画 */}
                <SelectInputRow
                  label="都市計画"
                  isEditMode={isEditMode}
                  defaultValue={property.cityPlanning || "市街化区域"}
                  value={property.cityPlanning || "市街化区域"}
                  options={CITY_PLANNING_OPTIONS}
                />

                {/* 接道状況 */}
                <TextInputRow
                  label="接道状況"
                  isEditMode={isEditMode}
                  defaultValue={property.roadSituation || "南側4m道路に接道"}
                  value={property.roadSituation}
                />

                {/* 地目 */}
                <SelectInputRow
                  label="地目"
                  isEditMode={isEditMode}
                  defaultValue={property.landUse || "宅地"}
                  value={property.landUse || "宅地"}
                  options={LAND_USE_OPTIONS}
                />

                {/* 用途地域 */}
                <SelectInputRow
                  label="用途地域"
                  isEditMode={isEditMode}
                  defaultValue={property.zoning || "第一種住居地域"}
                  value={property.zoning || "第一種住居地域"}
                  options={ZONING_OPTIONS}
                />

                {/* 建ぺい率 */}
                <PercentInputRow
                  label="建ぺい率"
                  isEditMode={isEditMode}
                  defaultValue={property.buildingCoverageRatio || 60}
                  value={property.buildingCoverageRatio}
                />

                {/* 容積率 */}
                <PercentInputRow
                  label="容積率"
                  isEditMode={isEditMode}
                  defaultValue={property.floorAreaRatio || 200}
                  value={property.floorAreaRatio}
                />

                {/* 開発許可番号 */}
                <TextInputRow
                  label="開発許可番号"
                  isEditMode={isEditMode}
                  defaultValue={property.developmentPermitNumber || "12345678901"}
                  value={property.developmentPermitNumber}
                />

                {/* 開発面積 */}
                <AreaInputRow
                  label="開発面積"
                  isEditMode={isEditMode}
                  defaultValue={property.developmentArea || 1000.0}
                  value={property.developmentArea}
                />

                {/* 宅地造成工事許可番号 */}
                <TextInputRow
                  label="宅地造成工事許可番号"
                  isEditMode={isEditMode}
                  defaultValue={property.landReadjustmentPermitNumber || "98765432109"}
                  value={property.landReadjustmentPermitNumber}
                />

                {/* 地役権 */}
                <SelectInputRow
                  label="地役権"
                  isEditMode={isEditMode}
                  defaultValue={property.easement || "なし"}
                  value={property.easement || "なし"}
                  options={EASEMENT_OPTIONS}
                />

                {/* 国土法届出 */}
                <SelectInputRow
                  label="国土法届出"
                  isEditMode={isEditMode}
                  defaultValue={property.landTransactionNotification || "不要"}
                  value={property.landTransactionNotification || "不要"}
                  options={LAND_NOTIFICATION_OPTIONS}
                />

                {/* 上水道 */}
                <SelectInputRow
                  label="上水道"
                  isEditMode={isEditMode}
                  defaultValue={property.waterSupply || "あり"}
                  value={property.waterSupply || "あり"}
                  options={UTILITY_OPTIONS}
                />

                {/* 下水道 */}
                <SelectInputRow
                  label="下水道"
                  isEditMode={isEditMode}
                  defaultValue={property.sewerage || "あり"}
                  value={property.sewerage || "あり"}
                  options={UTILITY_OPTIONS}
                />

                {/* ガス */}
                <SelectInputRow
                  label="ガス"
                  isEditMode={isEditMode}
                  defaultValue={property.gas || "都市ガス"}
                  value={property.gas || "都市ガス"}
                  options={GAS_OPTIONS}
                />

                {/* 表面利回り */}
                <PercentInputRow
                  label="表面利回り"
                  isEditMode={isEditMode}
                  defaultValue={property.surfaceYield || 0}
                  value={property.surfaceYield}
                />

                {/* その他費用等 */}
                <TextInputRow
                  label="その他費用等"
                  isEditMode={isEditMode}
                  defaultValue={property.otherExpenses || ""}
                  value={property.otherExpenses || "なし"}
                  placeholder="その他費用等を入力してください"
                />

                {/* 法令上制限 */}
                <TextInputRow
                  label="法令上制限"
                  isEditMode={isEditMode}
                  defaultValue={property.legalRestrictions || ""}
                  value={property.legalRestrictions || "なし"}
                  placeholder="法令上制限を入力してください"
                />

                {/* その他重要事項等 */}
                <TextInputRow
                  label="その他重要事項等"
                  isEditMode={isEditMode}
                  defaultValue={property.otherImportantMatters || ""}
                  value={property.otherImportantMatters || "なし"}
                  placeholder="その他重要事項等を入力してください"
                />

                {/* 楽器可否 */}
                <BooleanSelectRow
                  label="楽器可否"
                  isEditMode={isEditMode}
                  value={property.instrumentAllowed}
                  trueLabel="可"
                  falseLabel="不可"
                  options={PET_OPTIONS}
                />
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
