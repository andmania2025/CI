import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import type React from "react";
import type { RealtorDetailTabsProps } from "../types";

// アカウント情報タブ
export const AccountInfoTab: React.FC<RealtorDetailTabsProps> = ({ realtor }) => {
  return (
    <div className="h-full">
      <Card className="h-full flex flex-col gap-0">
        <CardHeader className="flex-shrink-0 pb-2">
          <CardTitle className="text-lg">アカウント情報</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 min-h-0 px-6 py-0">
          <div className="h-full overflow-auto">
            <Table>
              <TableBody>
                <TableRow>
                  <TableHead className="w-1/3 align-middle sticky left-0 bg-background pl-0">
                    アカウント種別
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    <Badge variant="success">
                      {realtor.accountType === "free" ? "無料" : "有料"}
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    プラン
                  </TableHead>
                  <TableCell className="pl-6 py-4">スタンダードプラン</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    状態
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    <Badge
                      variant={
                        (realtor.publicationStatus === "有効"
                          ? "success"
                          : realtor.publicationStatus === "無効"
                            ? "error"
                            : "neutral") as "success" | "error" | "neutral"
                      }
                    >
                      {realtor.publicationStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    登録日
                  </TableHead>
                  <TableCell className="pl-6 py-4">{realtor.updateDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    最終ログイン
                  </TableHead>
                  <TableCell className="pl-6 py-4">{realtor.nextUpdateDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    ログイン回数
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                      156回
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    契約開始日
                  </TableHead>
                  <TableCell className="pl-6 py-4">2024-01-01</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    契約終了日
                  </TableHead>
                  <TableCell className="pl-6 py-4">2024-12-31</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    支払い方法
                  </TableHead>
                  <TableCell className="pl-6 py-4">クレジットカード</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    月額料金
                  </TableHead>
                  <TableCell className="pl-6 py-4">¥29,800/月</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    物件掲載上限
                  </TableHead>
                  <TableCell className="pl-6 py-4">100件</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0">
                    現在の掲載数
                  </TableHead>
                  <TableCell className="pl-6 py-4">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                      {realtor.inquiryCount}件
                    </Badge>
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
