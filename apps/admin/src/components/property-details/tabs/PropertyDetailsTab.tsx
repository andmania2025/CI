"use client";

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
import type React from "react";
import { useEffect, useState } from "react";
import type { PropertyDetailTabsProps } from "../types";

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
        <CardHeader className="flex-shrink-0 pb-2">
          <CardTitle className="text-lg">物件詳細</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 min-h-0 px-6 py-0">
          <div className="h-full overflow-auto">
            <Table>
              <TableBody>
                {/* 物件種別 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle sticky left-0 bg-background pl-0">
                    物件種別
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select defaultValue={property.propertyType || "賃貸マンション"}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="賃貸マンション">賃貸マンション</SelectItem>
                          <SelectItem value="賃貸アパート">賃貸アパート</SelectItem>
                          <SelectItem value="賃貸戸建て">賃貸戸建て</SelectItem>
                          <SelectItem value="売買マンション">売買マンション</SelectItem>
                          <SelectItem value="売買戸建て">売買戸建て</SelectItem>
                          <SelectItem value="売買土地">売買土地</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      property.propertyType || "賃貸マンション"
                    )}
                  </TableCell>
                </TableRow>

                {/* 価格 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    {property.priceType === "sale" ? "売買価格" : "賃料"}
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          defaultValue={property.price || 120000}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">円</span>
                      </div>
                    ) : (
                      `${(property.price || 120000).toLocaleString()}円`
                    )}
                  </TableCell>
                </TableRow>

                {/* 管理費・共益費 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    管理費・共益費
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          defaultValue={property.managementFee || 8000}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">円</span>
                      </div>
                    ) : (
                      `${(property.managementFee || 8000).toLocaleString()}円`
                    )}
                  </TableCell>
                </TableRow>

                {/* 敷金 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    敷金
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          defaultValue={property.deposit || 120000}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">円</span>
                      </div>
                    ) : (
                      `${(property.deposit || 120000).toLocaleString()}円`
                    )}
                  </TableCell>
                </TableRow>

                {/* 礼金 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    礼金
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          defaultValue={property.keyMoney || 120000}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">円</span>
                      </div>
                    ) : (
                      `${(property.keyMoney || 120000).toLocaleString()}円`
                    )}
                  </TableCell>
                </TableRow>

                {/* 保証金 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    保証金
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          defaultValue={property.securityDeposit || 0}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">円</span>
                      </div>
                    ) : property.securityDeposit ? (
                      `${property.securityDeposit.toLocaleString()}円`
                    ) : (
                      "なし"
                    )}
                  </TableCell>
                </TableRow>

                {/* 間取り */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    間取り
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input defaultValue={property.floorPlan || "2LDK"} className="w-40" />
                    ) : (
                      property.floorPlan || "2LDK"
                    )}
                  </TableCell>
                </TableRow>

                {/* 専有面積 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    専有面積
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          step="0.01"
                          defaultValue={property.exclusiveArea || 80.0}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">㎡</span>
                      </div>
                    ) : (
                      `${(property.exclusiveArea || 80.0).toFixed(2)}㎡`
                    )}
                  </TableCell>
                </TableRow>

                {/* 土地面積 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    土地面積
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          defaultValue={property.landArea || 100.0}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">㎡</span>
                      </div>
                    ) : (
                      `${(property.landArea || 100.0).toFixed(2)}㎡`
                    )}
                  </TableCell>
                </TableRow>

                {/* 築年数 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    築年数
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          defaultValue={property.buildingAge || 5}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">年</span>
                      </div>
                    ) : (
                      `築${property.buildingAge || 5}年`
                    )}
                  </TableCell>
                </TableRow>

                {/* 建物構造 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    建物構造
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select defaultValue={property.buildingStructure || "鉄骨造"}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="木造">木造</SelectItem>
                          <SelectItem value="鉄骨造">鉄骨造</SelectItem>
                          <SelectItem value="RC造">RC造</SelectItem>
                          <SelectItem value="SRC造">SRC造</SelectItem>
                          <SelectItem value="その他">その他</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      property.buildingStructure || "鉄骨造"
                    )}
                  </TableCell>
                </TableRow>

                {/* 階数 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    階数
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          defaultValue={property.totalFloors || 3}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">階建て</span>
                      </div>
                    ) : (
                      `${property.totalFloors || 3}階建て`
                    )}
                  </TableCell>
                </TableRow>

                {/* 所在階 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    所在階
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          defaultValue={property.floor || 2}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">階</span>
                      </div>
                    ) : (
                      `${property.floor || 2}階`
                    )}
                  </TableCell>
                </TableRow>

                {/* 入居可能日 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    入居可能日
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <DatePicker
                        value={availableFrom}
                        onChange={setAvailableFrom}
                        placeholder="入居可能日を選択"
                        className="max-w-xs"
                      />
                    ) : (
                      availableFrom?.toISOString().split("T")[0] ||
                      property.availableFrom ||
                      "即入居可"
                    )}
                  </TableCell>
                </TableRow>

                {/* 契約期間 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    契約期間
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select defaultValue={property.contractPeriod || "2年"}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1年">1年</SelectItem>
                          <SelectItem value="2年">2年</SelectItem>
                          <SelectItem value="3年">3年</SelectItem>
                          <SelectItem value="期間定めなし">期間定めなし</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      property.contractPeriod || "2年"
                    )}
                  </TableCell>
                </TableRow>

                {/* ペット可否 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    ペット可否
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select defaultValue={property.petAllowed ? "可" : "不可"}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="可">可</SelectItem>
                          <SelectItem value="不可">不可</SelectItem>
                          <SelectItem value="相談">相談</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : property.petAllowed ? (
                      "可（要相談）"
                    ) : (
                      "不可"
                    )}
                  </TableCell>
                </TableRow>

                {/* 建築条件 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    建築条件
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        defaultValue={property.buildingConditions || "普通建築物"}
                        className="max-w-md"
                      />
                    ) : (
                      property.buildingConditions || "普通建築物"
                    )}
                  </TableCell>
                </TableRow>

                {/* 建物面積・専有面積 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    建物面積・専有面積
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          step="0.01"
                          defaultValue={property.buildingArea || 80.0}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">㎡</span>
                      </div>
                    ) : (
                      `${(property.buildingArea || 80.0).toFixed(2)}㎡`
                    )}
                  </TableCell>
                </TableRow>

                {/* 間取り詳細 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    間取り詳細
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        defaultValue={
                          property.floorPlanDetails || "リビング・ダイニング・キッチン、寝室×2"
                        }
                        className="max-w-md"
                      />
                    ) : (
                      property.floorPlanDetails || "リビング・ダイニング・キッチン、寝室×2"
                    )}
                  </TableCell>
                </TableRow>

                {/* 施工業者 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    施工業者
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        defaultValue={property.contractor || "サンプル建設株式会社"}
                        className="max-w-md"
                      />
                    ) : (
                      property.contractor || "サンプル建設株式会社"
                    )}
                  </TableCell>
                </TableRow>

                {/* 建築年月 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    建築年月
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        defaultValue={property.constructionDate || "2019年3月"}
                        className="max-w-md"
                      />
                    ) : (
                      property.constructionDate || "2019年3月"
                    )}
                  </TableCell>
                </TableRow>

                {/* 建築確認番号 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    建築確認番号
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        defaultValue={property.buildingConfirmationNumber || "12345678901"}
                        className="max-w-md"
                      />
                    ) : (
                      property.buildingConfirmationNumber || "12345678901"
                    )}
                  </TableCell>
                </TableRow>

                {/* バルコニー面積 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    バルコニー面積
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          step="0.01"
                          defaultValue={property.balconyArea || 6.0}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">㎡</span>
                      </div>
                    ) : (
                      `${(property.balconyArea || 6.0).toFixed(2)}㎡`
                    )}
                  </TableCell>
                </TableRow>

                {/* 修繕積立金 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    修繕積立金
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          defaultValue={property.repairReserve || 0}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">円</span>
                      </div>
                    ) : property.repairReserve ? (
                      `${property.repairReserve.toLocaleString()}円`
                    ) : (
                      "なし"
                    )}
                  </TableCell>
                </TableRow>

                {/* 管理形態 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    管理形態
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select defaultValue={property.managementType || "管理会社"}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="管理会社">管理会社</SelectItem>
                          <SelectItem value="自主管理">自主管理</SelectItem>
                          <SelectItem value="その他">その他</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      property.managementType || "管理会社"
                    )}
                  </TableCell>
                </TableRow>

                {/* リフォーム */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    リフォーム
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select defaultValue={property.renovation || "なし"}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="なし">なし</SelectItem>
                          <SelectItem value="あり">あり</SelectItem>
                          <SelectItem value="部分リフォーム">部分リフォーム</SelectItem>
                          <SelectItem value="全面リフォーム">全面リフォーム</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      property.renovation || "なし"
                    )}
                  </TableCell>
                </TableRow>

                {/* 主要採光面 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    主要採光面
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select defaultValue={property.mainLighting || "南"}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="南">南</SelectItem>
                          <SelectItem value="北">北</SelectItem>
                          <SelectItem value="東">東</SelectItem>
                          <SelectItem value="西">西</SelectItem>
                          <SelectItem value="南東">南東</SelectItem>
                          <SelectItem value="南西">南西</SelectItem>
                          <SelectItem value="北東">北東</SelectItem>
                          <SelectItem value="北西">北西</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      property.mainLighting || "南"
                    )}
                  </TableCell>
                </TableRow>

                {/* 想定年間収入 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    想定年間収入
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          defaultValue={property.estimatedAnnualIncome || 0}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">円</span>
                      </div>
                    ) : property.estimatedAnnualIncome ? (
                      `${property.estimatedAnnualIncome.toLocaleString()}円`
                    ) : (
                      "未設定"
                    )}
                  </TableCell>
                </TableRow>

                {/* 総戸数・総区画数 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    総戸数・総区画数
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          defaultValue={property.totalUnits || 20}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">戸</span>
                      </div>
                    ) : (
                      `${property.totalUnits || 20}戸`
                    )}
                  </TableCell>
                </TableRow>

                {/* 販売戸数・販売区画数 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    販売戸数・販売区画数
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          defaultValue={property.saleUnits || 15}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">戸</span>
                      </div>
                    ) : (
                      `${property.saleUnits || 15}戸`
                    )}
                  </TableCell>
                </TableRow>

                {/* 土地権利 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    土地権利
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select defaultValue={property.landRights || "所有権"}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="所有権">所有権</SelectItem>
                          <SelectItem value="借地権">借地権</SelectItem>
                          <SelectItem value="地上権">地上権</SelectItem>
                          <SelectItem value="その他">その他</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      property.landRights || "所有権"
                    )}
                  </TableCell>
                </TableRow>

                {/* セットバック */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    セットバック
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          step="0.01"
                          defaultValue={property.setback || 0}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">m</span>
                      </div>
                    ) : property.setback ? (
                      `${property.setback}m`
                    ) : (
                      "なし"
                    )}
                  </TableCell>
                </TableRow>

                {/* 私道負担面積 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    私道負担面積
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          step="0.01"
                          defaultValue={property.privateRoadBurden || 0}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">㎡</span>
                      </div>
                    ) : property.privateRoadBurden ? (
                      `${property.privateRoadBurden}㎡`
                    ) : (
                      "なし"
                    )}
                  </TableCell>
                </TableRow>

                {/* 引渡 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    引渡
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        defaultValue={property.delivery || "2024年6月予定"}
                        className="max-w-md"
                      />
                    ) : (
                      property.delivery || "2024年6月予定"
                    )}
                  </TableCell>
                </TableRow>

                {/* 現況 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    現況
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select defaultValue={property.currentStatus || "更地"}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="更地">更地</SelectItem>
                          <SelectItem value="建物あり">建物あり</SelectItem>
                          <SelectItem value="工事中">工事中</SelectItem>
                          <SelectItem value="完成済み">完成済み</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      property.currentStatus || "更地"
                    )}
                  </TableCell>
                </TableRow>

                {/* 都市計画 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    都市計画
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select defaultValue={property.cityPlanning || "市街化区域"}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="市街化区域">市街化区域</SelectItem>
                          <SelectItem value="市街化調整区域">市街化調整区域</SelectItem>
                          <SelectItem value="非線引都市計画区域">非線引都市計画区域</SelectItem>
                          <SelectItem value="準都市計画区域">準都市計画区域</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      property.cityPlanning || "市街化区域"
                    )}
                  </TableCell>
                </TableRow>

                {/* 接道状況 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    接道状況
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        defaultValue={property.roadSituation || "南側4m道路に接道"}
                        className="max-w-md"
                      />
                    ) : (
                      property.roadSituation || "南側4m道路に接道"
                    )}
                  </TableCell>
                </TableRow>

                {/* 地目 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    地目
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select defaultValue={property.landUse || "宅地"}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="宅地">宅地</SelectItem>
                          <SelectItem value="田">田</SelectItem>
                          <SelectItem value="畑">畑</SelectItem>
                          <SelectItem value="山林">山林</SelectItem>
                          <SelectItem value="原野">原野</SelectItem>
                          <SelectItem value="その他">その他</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      property.landUse || "宅地"
                    )}
                  </TableCell>
                </TableRow>

                {/* 用途地域 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    用途地域
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select defaultValue={property.zoning || "第一種住居地域"}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="第一種住居地域">第一種住居地域</SelectItem>
                          <SelectItem value="第二種住居地域">第二種住居地域</SelectItem>
                          <SelectItem value="第一種中高層住居専用地域">
                            第一種中高層住居専用地域
                          </SelectItem>
                          <SelectItem value="第二種中高層住居専用地域">
                            第二種中高層住居専用地域
                          </SelectItem>
                          <SelectItem value="第一種住居専用地域">第一種住居専用地域</SelectItem>
                          <SelectItem value="第二種住居専用地域">第二種住居専用地域</SelectItem>
                          <SelectItem value="準住居地域">準住居地域</SelectItem>
                          <SelectItem value="近隣商業地域">近隣商業地域</SelectItem>
                          <SelectItem value="商業地域">商業地域</SelectItem>
                          <SelectItem value="準工業地域">準工業地域</SelectItem>
                          <SelectItem value="工業地域">工業地域</SelectItem>
                          <SelectItem value="工業専用地域">工業専用地域</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      property.zoning || "第一種住居地域"
                    )}
                  </TableCell>
                </TableRow>

                {/* 建ぺい率 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    建ぺい率
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          defaultValue={property.buildingCoverageRatio || 60}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">%</span>
                      </div>
                    ) : (
                      `${property.buildingCoverageRatio || 60}%`
                    )}
                  </TableCell>
                </TableRow>

                {/* 容積率 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    容積率
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          defaultValue={property.floorAreaRatio || 200}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">%</span>
                      </div>
                    ) : (
                      `${property.floorAreaRatio || 200}%`
                    )}
                  </TableCell>
                </TableRow>

                {/* 開発許可番号 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    開発許可番号
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        defaultValue={property.developmentPermitNumber || "12345678901"}
                        className="max-w-md"
                      />
                    ) : (
                      property.developmentPermitNumber || "12345678901"
                    )}
                  </TableCell>
                </TableRow>

                {/* 開発面積 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    開発面積
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          step="0.01"
                          defaultValue={property.developmentArea || 1000.0}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">㎡</span>
                      </div>
                    ) : (
                      `${(property.developmentArea || 1000.0).toFixed(2)}㎡`
                    )}
                  </TableCell>
                </TableRow>

                {/* 宅地造成工事許可番号 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    宅地造成工事許可番号
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        defaultValue={property.landReadjustmentPermitNumber || "98765432109"}
                        className="max-w-md"
                      />
                    ) : (
                      property.landReadjustmentPermitNumber || "98765432109"
                    )}
                  </TableCell>
                </TableRow>

                {/* 地役権 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    地役権
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select defaultValue={property.easement || "なし"}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="なし">なし</SelectItem>
                          <SelectItem value="あり">あり</SelectItem>
                          <SelectItem value="通行地役権">通行地役権</SelectItem>
                          <SelectItem value="その他">その他</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      property.easement || "なし"
                    )}
                  </TableCell>
                </TableRow>

                {/* 国土法届出 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    国土法届出
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select defaultValue={property.landTransactionNotification || "不要"}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="不要">不要</SelectItem>
                          <SelectItem value="必要">必要</SelectItem>
                          <SelectItem value="届出済み">届出済み</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      property.landTransactionNotification || "不要"
                    )}
                  </TableCell>
                </TableRow>

                {/* 上水道 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    上水道
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select defaultValue={property.waterSupply || "あり"}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="あり">あり</SelectItem>
                          <SelectItem value="なし">なし</SelectItem>
                          <SelectItem value="計画中">計画中</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      property.waterSupply || "あり"
                    )}
                  </TableCell>
                </TableRow>

                {/* 下水道 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    下水道
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select defaultValue={property.sewerage || "あり"}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="あり">あり</SelectItem>
                          <SelectItem value="なし">なし</SelectItem>
                          <SelectItem value="計画中">計画中</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      property.sewerage || "あり"
                    )}
                  </TableCell>
                </TableRow>

                {/* ガス */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    ガス
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select defaultValue={property.gas || "都市ガス"}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="都市ガス">都市ガス</SelectItem>
                          <SelectItem value="プロパンガス">プロパンガス</SelectItem>
                          <SelectItem value="なし">なし</SelectItem>
                          <SelectItem value="計画中">計画中</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      property.gas || "都市ガス"
                    )}
                  </TableCell>
                </TableRow>

                {/* 表面利回り */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    表面利回り
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          step="0.01"
                          defaultValue={property.surfaceYield || 0}
                          className="w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span className="text-sm text-gray-500">%</span>
                      </div>
                    ) : property.surfaceYield ? (
                      `${property.surfaceYield}%`
                    ) : (
                      "未設定"
                    )}
                  </TableCell>
                </TableRow>

                {/* その他費用等 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    その他費用等
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        defaultValue={property.otherExpenses || ""}
                        placeholder="その他費用等を入力してください"
                        className="max-w-md"
                      />
                    ) : (
                      property.otherExpenses || "なし"
                    )}
                  </TableCell>
                </TableRow>

                {/* 法令上制限 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    法令上制限
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        defaultValue={property.legalRestrictions || ""}
                        placeholder="法令上制限を入力してください"
                        className="max-w-md"
                      />
                    ) : (
                      property.legalRestrictions || "なし"
                    )}
                  </TableCell>
                </TableRow>

                {/* その他重要事項等 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    その他重要事項等
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        defaultValue={property.otherImportantMatters || ""}
                        placeholder="その他重要事項等を入力してください"
                        className="max-w-md"
                      />
                    ) : (
                      property.otherImportantMatters || "なし"
                    )}
                  </TableCell>
                </TableRow>

                {/* 楽器可否 */}
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 pb-4 sticky left-0 bg-background pl-0">
                    楽器可否
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select defaultValue={property.instrumentAllowed ? "可" : "不可"}>
                        <SelectTrigger className="max-w-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="可">可</SelectItem>
                          <SelectItem value="不可">不可</SelectItem>
                          <SelectItem value="相談">相談</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : property.instrumentAllowed ? (
                      "可"
                    ) : (
                      "不可"
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
