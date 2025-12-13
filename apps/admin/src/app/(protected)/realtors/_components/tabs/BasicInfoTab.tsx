import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useState } from "react";
import type { RealtorDetailTabsProps } from "../types";

// 基本情報タブ
export const BasicInfoTab: React.FC<RealtorDetailTabsProps> = ({ realtor, isEditMode = false }) => {
  const [formData, setFormData] = useState({
    companyName: realtor.title || "",
    branchName: "渋谷支店",
    storeName: "本店",
    representativeName: realtor.representativeName || "",
    contactPerson: realtor.contactPerson || "",
    postalCode: "150-0013",
    address: "東京都渋谷区恵比寿1-2-3 恵比寿ビル5F",
    phone: "03-1234-5678",
    mobile: "090-1234-5678",
    fax: "03-1234-5679",
    email: "info@sample-realtor.com",
    website: "https://www.sample-realtor.com",
    businessHours: "平日 9:00-18:00",
    holidays: "土日祝日",
    accessInfo: "JR山手線 恵比寿駅 徒歩5分\n東京メトロ日比谷線 恵比寿駅 徒歩3分",
    memberNumber: "M-12345",
    transactionStartDate: "2024-01-01",
    transactionPeriod: "12ヶ月",
    businessCategory: "不動産売買・賃貸",
    realEstateTypes: "住宅、土地、マンション",
    propertyIndicator: "駅近物件中心",
    preferredEntrustmentMethod: "専任媒介",
    salesPrice: "3,000万円～5,000万円",
    fairTradeMember: "はい",
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
                    会社名
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        value={formData.companyName}
                        onChange={(e) => updateField("companyName", e.target.value)}
                        className="w-full"
                      />
                    ) : (
                      formData.companyName
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle sticky left-0 bg-background pl-0">
                    支店名
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        value={formData.branchName}
                        onChange={(e) => updateField("branchName", e.target.value)}
                        className="w-full"
                      />
                    ) : (
                      formData.branchName
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    店舗名
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        value={formData.storeName}
                        onChange={(e) => updateField("storeName", e.target.value)}
                        className="w-full"
                      />
                    ) : (
                      formData.storeName
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    代表者名
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        value={formData.representativeName}
                        onChange={(e) => updateField("representativeName", e.target.value)}
                        className="w-full"
                      />
                    ) : (
                      formData.representativeName || "-"
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    担当者名
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        value={formData.contactPerson}
                        onChange={(e) => updateField("contactPerson", e.target.value)}
                        className="w-full"
                      />
                    ) : (
                      formData.contactPerson || "-"
                    )}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    郵便番号
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        value={formData.postalCode}
                        onChange={(e) => updateField("postalCode", e.target.value)}
                        className="w-full"
                        placeholder="150-0013"
                      />
                    ) : (
                      formData.postalCode
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    会社住所
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        value={formData.address}
                        onChange={(e) => updateField("address", e.target.value)}
                        className="w-full"
                        placeholder="東京都渋谷区恵比寿1-2-3 恵比寿ビル5F"
                      />
                    ) : (
                      formData.address
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    電話番号
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className="w-full"
                        placeholder="03-1234-5678"
                      />
                    ) : (
                      formData.phone
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    携帯電話
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => updateField("mobile", e.target.value)}
                        className="w-full"
                        placeholder="090-1234-5678"
                      />
                    ) : (
                      formData.mobile
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    FAX番号
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        type="tel"
                        value={formData.fax}
                        onChange={(e) => updateField("fax", e.target.value)}
                        className="w-full"
                        placeholder="03-1234-5679"
                      />
                    ) : (
                      formData.fax
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    メールアドレス
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className="w-full"
                      />
                    ) : (
                      formData.email
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    ウェブサイト
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        type="url"
                        value={formData.website}
                        onChange={(e) => updateField("website", e.target.value)}
                        className="w-full"
                        placeholder="https://www.sample-realtor.com"
                      />
                    ) : (
                      formData.website
                    )}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    営業時間
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        value={formData.businessHours}
                        onChange={(e) => updateField("businessHours", e.target.value)}
                        className="w-full"
                        placeholder="平日 9:00-18:00"
                      />
                    ) : (
                      formData.businessHours
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    休業日
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        value={formData.holidays}
                        onChange={(e) => updateField("holidays", e.target.value)}
                        className="w-full"
                        placeholder="土日祝日"
                      />
                    ) : (
                      formData.holidays
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    交通アクセス
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <textarea
                        value={formData.accessInfo}
                        onChange={(e) => updateField("accessInfo", e.target.value)}
                        className="w-full min-h-[80px] px-3 py-2 text-sm border border-input bg-background rounded-md"
                        placeholder="JR山手線 恵比寿駅 徒歩5分&#10;東京メトロ日比谷線 恵比寿駅 徒歩3分"
                      />
                    ) : (
                      <div className="space-y-1">
                        {formData.accessInfo.split("\n").map((line, index) => (
                          <div key={index} className="text-sm">
                            {line}
                          </div>
                        ))}
                      </div>
                    )}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    会員番号
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        value={formData.memberNumber}
                        onChange={(e) => updateField("memberNumber", e.target.value)}
                        className="w-full"
                        placeholder="M-12345"
                      />
                    ) : (
                      formData.memberNumber
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    取引開始年月
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        type="date"
                        value={formData.transactionStartDate}
                        onChange={(e) => updateField("transactionStartDate", e.target.value)}
                        className="w-full"
                      />
                    ) : (
                      formData.transactionStartDate
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    取引期間
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        value={formData.transactionPeriod}
                        onChange={(e) => updateField("transactionPeriod", e.target.value)}
                        className="w-full"
                        placeholder="12ヶ月"
                      />
                    ) : (
                      formData.transactionPeriod
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    業種カテゴリ(全般)
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        value={formData.businessCategory}
                        onChange={(e) => updateField("businessCategory", e.target.value)}
                        className="w-full"
                        placeholder="不動産売買・賃貸"
                      />
                    ) : (
                      formData.businessCategory
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    不動産種別
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        value={formData.realEstateTypes}
                        onChange={(e) => updateField("realEstateTypes", e.target.value)}
                        className="w-full"
                        placeholder="住宅、土地、マンション"
                      />
                    ) : (
                      formData.realEstateTypes
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    物件指標
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        value={formData.propertyIndicator}
                        onChange={(e) => updateField("propertyIndicator", e.target.value)}
                        className="w-full"
                        placeholder="駅近物件中心"
                      />
                    ) : (
                      formData.propertyIndicator
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    希望受託方法
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        value={formData.preferredEntrustmentMethod}
                        onChange={(e) => updateField("preferredEntrustmentMethod", e.target.value)}
                        className="w-full"
                        placeholder="専任媒介"
                      />
                    ) : (
                      formData.preferredEntrustmentMethod
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    売買価格
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Input
                        value={formData.salesPrice}
                        onChange={(e) => updateField("salesPrice", e.target.value)}
                        className="w-full"
                        placeholder="3,000万円～5,000万円"
                      />
                    ) : (
                      formData.salesPrice
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    公正取引協議会加盟事業者
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    {isEditMode ? (
                      <Select
                        value={formData.fairTradeMember}
                        onValueChange={(value) => updateField("fairTradeMember", value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="はい">はい</SelectItem>
                          <SelectItem value="いいえ">いいえ</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      formData.fairTradeMember
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
