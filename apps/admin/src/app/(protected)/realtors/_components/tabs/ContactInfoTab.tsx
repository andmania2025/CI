import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import type React from "react";
import { useState } from "react";
import type { RealtorDetailTabsProps } from "../types";

// 連絡先情報タブ
export const ContactInfoTab: React.FC<RealtorDetailTabsProps> = ({
  realtor,
  isEditMode = false,
}) => {
  const [formData, setFormData] = useState({
    representativeName: realtor.representativeName || "",
    contactPerson: realtor.contactPerson || "",
    phone: "03-1234-5678",
    mobile: "090-1234-5678",
    fax: "03-1234-5679",
    email: "info@sample-realtor.com",
    address: "東京都渋谷区恵比寿1-2-3 恵比寿ビル5F",
    postalCode: "150-0013",
    website: "https://www.sample-realtor.com",
    businessHours: "平日 9:00-18:00",
    holidays: "土日祝日",
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-full">
      <Card className="h-full flex flex-col gap-0">
        <CardHeader className="flex-shrink-0 pb-2">
          <CardTitle className="text-lg">連絡先情報</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 min-h-0 px-6 py-0">
          <div className="h-full overflow-auto">
            <Table>
              <TableBody>
                <TableRow>
                  <TableHead className="w-1/3 align-middle sticky left-0 bg-background pl-0">
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
                        placeholder="info@sample-realtor.com"
                      />
                    ) : (
                      formData.email
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
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
