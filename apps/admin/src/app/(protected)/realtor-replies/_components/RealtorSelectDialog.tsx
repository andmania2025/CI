"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import type React from "react";
import { useEffect, useState } from "react";

interface Realtor {
  id: string;
  companyName: string;
  contactPerson: string;
}

interface RealtorSelectDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRealtorId?: string;
  onSelect: (realtorId: string) => void;
}

// サンプルデータ（実際の実装ではAPIから取得）
const sampleRealtors: Realtor[] = [
  { id: "1", companyName: "株式会社ワード・スポット", contactPerson: "三田 浩太朗" },
  { id: "2", companyName: "シュガー株式会社", contactPerson: "高谷 千賀子" },
  { id: "3", companyName: "株式会社イチカワプランニング", contactPerson: "市川 敦久" },
  { id: "4", companyName: "株式会社ベルファーストコーポレーション", contactPerson: "鈴木一" },
  { id: "5", companyName: "桃崎製作所", contactPerson: "堤 勇太" },
  { id: "6", companyName: "三河建設株式会社", contactPerson: "鈴木雄司" },
  { id: "7", companyName: "合同会社負動産の窓口", contactPerson: "松岡 実可子" },
  { id: "8", companyName: "株式会社浜石工務店", contactPerson: "高野 昭秀" },
  { id: "9", companyName: "株式会社アール・エステート", contactPerson: "田中 太郎" },
  { id: "10", companyName: "有限会社山田不動産", contactPerson: "山田 花子" },
  { id: "11", companyName: "株式会社中村ハウジング", contactPerson: "中村 次郎" },
  { id: "12", companyName: "佐藤不動産株式会社", contactPerson: "佐藤 美咲" },
  { id: "13", companyName: "株式会社東京プロパティ", contactPerson: "伊藤 健一" },
  { id: "14", companyName: "有限会社横浜不動産", contactPerson: "加藤 由美" },
  { id: "15", companyName: "株式会社大阪エステート", contactPerson: "木村 大輔" },
];

export const RealtorSelectDialog: React.FC<RealtorSelectDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedRealtorId,
  onSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [filteredRealtors, setFilteredRealtors] = useState<Realtor[]>(sampleRealtors);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRealtors(sampleRealtors);
    } else {
      const filtered = sampleRealtors.filter(
        (realtor) =>
          realtor.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          realtor.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRealtors(filtered);
    }
    setCurrentPage(1);
  }, [searchQuery]);

  const totalItems = filteredRealtors.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentRealtors = filteredRealtors.slice(startIndex, endIndex);

  const handleSearch = () => {
    // 検索処理はuseEffectで自動的に行われる
    console.log("検索実行:", searchQuery);
  };

  const handleRealtorSelect = (realtorId: string) => {
    onSelect(realtorId);
    onOpenChange(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="flex-shrink-0 px-6 pt-6 pb-4 text-left">
          <DialogTitle className="text-lg font-semibold">不動産業者様一覧</DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden px-6">
          {/* 検索セクション */}
          <div className="flex-shrink-0 mb-4">
            <div className="flex items-center gap-2 py-2">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="不動産業者様を選択して下さい"
                className="flex-1 py-2.5 focus-visible:ring-offset-0"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <Button
                onClick={handleSearch}
                className="bg-black hover:bg-gray-800 text-white flex-shrink-0"
              >
                検索
              </Button>
            </div>
          </div>

          {/* 不動産業者リストヘッダー */}
          <div className="flex-shrink-0 flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600 ml-2">
              {totalItems}件中 {startIndex + 1}-{endIndex}件表示
            </span>
            {totalPages > 1 && (
              <Pagination className="m-0 w-auto !justify-start">
                <PaginationContent className="flex items-center gap-2 m-0">
                  {/* 前へボタン */}
                  <PaginationItem>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1 || totalPages <= 1}
                      className="h-8 w-16"
                    >
                      前へ
                    </Button>
                  </PaginationItem>

                  {/* ページ番号 */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page);
                          }}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  </div>

                  {/* 次へボタン */}
                  <PaginationItem>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages || totalPages <= 1}
                      className="h-8 w-16"
                    >
                      次へ
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>

          {/* 不動産業者リスト */}
          <div className="flex-1 overflow-y-auto min-h-0 pb-6">
            <div className="space-y-1">
              {currentRealtors.map((realtor) => (
                <div
                  key={realtor.id}
                  onClick={() => handleRealtorSelect(realtor.id)}
                  className={`
                    p-3 rounded-md cursor-pointer transition-colors
                    ${
                      selectedRealtorId === realtor.id
                        ? "bg-blue-50 border border-blue-200"
                        : "hover:bg-gray-50 border border-transparent"
                    }
                  `}
                >
                  <div className="font-medium">{realtor.companyName}</div>
                  <div className="text-sm text-gray-600">{realtor.contactPerson}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
