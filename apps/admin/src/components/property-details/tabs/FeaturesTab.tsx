"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import type React from "react";
import type { PropertyDetailTabsProps } from "../types";

export const FeaturesTab = ({ property, isEditMode = false }: PropertyDetailTabsProps) => {
  return (
    <div className="h-full">
      <Card className="h-full flex flex-col gap-0">
        <CardHeader className="flex-shrink-0 pb-2">
          <CardTitle className="text-lg">設備・特徴</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 min-h-0 px-6 py-0">
          <div className="h-full overflow-auto">
            <Table>
              <TableBody>
                {/* キッチン */}
                <TableRow>
                  <TableHead className="w-1/3 align-top pt-4 sticky left-0 bg-background pl-0">
                    キッチン
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="ihStove" defaultChecked={property.kitchen?.ihStove} />
                          <Label htmlFor="ihStove">IHコンロ</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="gasStove" defaultChecked={property.kitchen?.gasStove} />
                          <Label htmlFor="gasStove">ガスコンロ</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="systemKitchen"
                            defaultChecked={property.kitchen?.systemKitchen ?? true}
                          />
                          <Label htmlFor="systemKitchen">システムキッチン</Label>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {property.kitchen?.ihStove && <Badge variant="outline">IHコンロ</Badge>}
                        {property.kitchen?.gasStove && <Badge variant="outline">ガスコンロ</Badge>}
                        {(property.kitchen?.systemKitchen ?? true) && (
                          <Badge variant="outline">システムキッチン</Badge>
                        )}
                      </div>
                    )}
                  </TableCell>
                </TableRow>

                {/* バス・トイレ */}
                <TableRow>
                  <TableHead className="w-1/3 align-top pt-4 sticky left-0 bg-background pl-0">
                    バス・トイレ
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="separateBathToilet"
                            defaultChecked={property.bathroom?.separateBathToilet ?? true}
                          />
                          <Label htmlFor="separateBathToilet">バストイレ別</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="reheating" defaultChecked={property.bathroom?.reheating} />
                          <Label htmlFor="reheating">追い焚き</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="bathDryer" defaultChecked={property.bathroom?.bathDryer} />
                          <Label htmlFor="bathDryer">浴室乾燥機</Label>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {(property.bathroom?.separateBathToilet ?? true) && (
                          <Badge variant="outline">バストイレ別</Badge>
                        )}
                        {property.bathroom?.reheating && <Badge variant="outline">追い焚き</Badge>}
                        {property.bathroom?.bathDryer && (
                          <Badge variant="outline">浴室乾燥機</Badge>
                        )}
                      </div>
                    )}
                  </TableCell>
                </TableRow>

                {/* 空調 */}
                <TableRow>
                  <TableHead className="w-1/3 align-top pt-4 sticky left-0 bg-background pl-0">
                    空調
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="airConditioner"
                            defaultChecked={property.cooling?.airConditioner ?? true}
                          />
                          <Label htmlFor="airConditioner">エアコン</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="floorHeating"
                            defaultChecked={property.cooling?.floorHeating}
                          />
                          <Label htmlFor="floorHeating">床暖房</Label>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {(property.cooling?.airConditioner ?? true) && (
                          <Badge variant="outline">エアコン</Badge>
                        )}
                        {property.cooling?.floorHeating && <Badge variant="outline">床暖房</Badge>}
                      </div>
                    )}
                  </TableCell>
                </TableRow>

                {/* セキュリティ */}
                <TableRow>
                  <TableHead className="w-1/3 align-top pt-4 sticky left-0 bg-background pl-0">
                    セキュリティ
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="autoLock"
                            defaultChecked={property.security?.autoLock ?? true}
                          />
                          <Label htmlFor="autoLock">オートロック</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="securityCamera"
                            defaultChecked={property.security?.securityCamera}
                          />
                          <Label htmlFor="securityCamera">防犯カメラ</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="tvIntercom"
                            defaultChecked={property.security?.tvIntercom}
                          />
                          <Label htmlFor="tvIntercom">TVモニター付インターホン</Label>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {(property.security?.autoLock ?? true) && (
                          <Badge variant="outline">オートロック</Badge>
                        )}
                        {property.security?.securityCamera && (
                          <Badge variant="outline">防犯カメラ</Badge>
                        )}
                        {property.security?.tvIntercom && (
                          <Badge variant="outline">TVモニター付インターホン</Badge>
                        )}
                      </div>
                    )}
                  </TableCell>
                </TableRow>

                {/* 収納 */}
                <TableRow>
                  <TableHead className="w-1/3 align-top pt-4 sticky left-0 bg-background pl-0">
                    収納
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="walkInCloset"
                            defaultChecked={property.storage?.walkInCloset}
                          />
                          <Label htmlFor="walkInCloset">ウォークインクローゼット</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="shoebox"
                            defaultChecked={property.storage?.shoebox ?? true}
                          />
                          <Label htmlFor="shoebox">シューズボックス</Label>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {property.storage?.walkInCloset && (
                          <Badge variant="outline">ウォークインクローゼット</Badge>
                        )}
                        {(property.storage?.shoebox ?? true) && (
                          <Badge variant="outline">シューズボックス</Badge>
                        )}
                      </div>
                    )}
                  </TableCell>
                </TableRow>

                {/* その他設備 */}
                <TableRow>
                  <TableHead className="w-1/3 align-top pt-4 sticky left-0 bg-background pl-0">
                    その他設備
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="elevator"
                            defaultChecked={property.otherEquipment?.elevator}
                          />
                          <Label htmlFor="elevator">エレベーター</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="deliveryBox"
                            defaultChecked={property.otherEquipment?.deliveryBox ?? true}
                          />
                          <Label htmlFor="deliveryBox">宅配ボックス</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="parking"
                            defaultChecked={property.otherEquipment?.parking ?? true}
                          />
                          <Label htmlFor="parking">駐車場</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="bicycleParking"
                            defaultChecked={property.otherEquipment?.bicycleParking}
                          />
                          <Label htmlFor="bicycleParking">駐輪場</Label>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {property.otherEquipment?.elevator && (
                          <Badge variant="outline">エレベーター</Badge>
                        )}
                        {(property.otherEquipment?.deliveryBox ?? true) && (
                          <Badge variant="outline">宅配ボックス</Badge>
                        )}
                        {(property.otherEquipment?.parking ?? true) && (
                          <Badge variant="outline">駐車場</Badge>
                        )}
                        {property.otherEquipment?.bicycleParking && (
                          <Badge variant="outline">駐輪場</Badge>
                        )}
                      </div>
                    )}
                  </TableCell>
                </TableRow>

                {/* インターネット環境 */}
                <TableRow>
                  <TableHead className="w-1/3 align-top pt-4 sticky left-0 bg-background pl-0">
                    インターネット環境
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Textarea
                        defaultValue={property.internet || "光回線対応"}
                        className="max-w-md"
                        rows={2}
                      />
                    ) : (
                      property.internet || "光回線対応"
                    )}
                  </TableCell>
                </TableRow>

                {/* 特徴 */}
                <TableRow>
                  <TableHead className="w-1/3 align-top pt-4 sticky left-0 bg-background pl-0">
                    特徴
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="cornerRoom"
                            defaultChecked={property.characteristics?.includes("角部屋")}
                          />
                          <Label htmlFor="cornerRoom">角部屋</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="southFacing"
                            defaultChecked={property.characteristics?.includes("南向き")}
                          />
                          <Label htmlFor="southFacing">南向き</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="renovated"
                            defaultChecked={property.characteristics?.includes(
                              "リノベーション済み"
                            )}
                          />
                          <Label htmlFor="renovated">リノベーション済み</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="designers"
                            defaultChecked={property.characteristics?.includes("デザイナーズ")}
                          />
                          <Label htmlFor="designers">デザイナーズ</Label>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {(property.characteristics || ["南向き", "角部屋"]).map((char, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {char}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </TableCell>
                </TableRow>

                {/* 備考 */}
                <TableRow>
                  <TableHead className="w-1/3 align-top pt-4 sticky left-0 bg-background pl-0">
                    備考
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Textarea
                        defaultValue={property.remarks || "ペット可（要相談）、楽器演奏可"}
                        className="max-w-md"
                        rows={3}
                      />
                    ) : (
                      property.remarks || "ペット可（要相談）、楽器演奏可"
                    )}
                  </TableCell>
                </TableRow>

                {/* 物件説明 */}
                <TableRow>
                  <TableHead className="w-1/3 align-top pt-4 pb-4 sticky left-0 bg-background pl-0">
                    物件説明
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Textarea
                        defaultValue={
                          property.description ||
                          "恵比寿駅から徒歩5分の好立地にある築5年の鉄骨造アパートです。2LDKの間取りで、システムキッチンやユニットバス完備。オートロック付きでセキュリティも安心です。"
                        }
                        placeholder="物件の詳細な説明を入力してください（立地、設備、特徴など）"
                        className="max-w-md"
                        rows={5}
                      />
                    ) : (
                      property.description || ""
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
