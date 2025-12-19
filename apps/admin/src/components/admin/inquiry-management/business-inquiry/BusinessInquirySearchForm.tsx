"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Download, Filter, Search, X } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface DetailSearchData {
  companyName: string;
  inquiryType: string;
  status: string;
  dateFrom: string;
  dateTo: string;
}

interface BusinessInquirySearchFormProps {
  formData: {
    search: string;
    dateFrom: string;
    dateTo: string;
    status: string;
  };
  isDetailSearchOpen: boolean;
  onInputChange: (field: string, value: string) => void;
  onDetailSearchOpenChange: (open: boolean) => void;
  onDetailSearch: (searchData: DetailSearchData) => void;
  onReset: () => void;
}

export const BusinessInquirySearchForm: React.FC<BusinessInquirySearchFormProps> = ({
  formData,
  isDetailSearchOpen,
  onInputChange,
  onDetailSearchOpenChange,
  onDetailSearch,
  onReset,
}) => {
  const [detailSearchData, setDetailSearchData] = useState({
    companyName: "",
    inquiryType: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });

  const handleDetailSearch = () => {
    onDetailSearch(detailSearchData);
    onDetailSearchOpenChange(false);
  };

  const handleResetDetail = () => {
    setDetailSearchData({
      companyName: "",
      inquiryType: "",
      status: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">業者問い合わせ</h3>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            CSV ダウンロード
          </Button>
          <Button
            variant="outline"
            onClick={() => onDetailSearchOpenChange(true)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            検索
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="会社名、担当者名、メールアドレスで検索..."
              value={formData.search}
              onChange={(e) => onInputChange("search", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button onClick={onReset} variant="outline">
          リセット
        </Button>
      </div>

      {/* 検索モーダル */}
      <Dialog open={isDetailSearchOpen} onOpenChange={onDetailSearchOpenChange}>
        <DialogContent className="w-[95vw] max-w-[1000px] max-h-[80vh] rounded-3xl shadow-2xl border-neutral-200 bg-white p-0 flex flex-col">
          <DialogHeader className="p-6 pb-4 shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center shrink-0">
                <Filter className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-lg font-semibold mb-2 text-neutral-900">
                  検索
                </DialogTitle>
                <DialogDescription className="text-neutral-600 text-sm leading-relaxed">
                  条件を指定して問い合わせを検索できます。
                </DialogDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDetailSearchOpenChange(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X className="h-4 w-4 mr-1" />
                閉じる
              </Button>
            </div>
          </DialogHeader>

          <div className="flex-1 px-6 pb-6 overflow-y-auto">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200">
                  <label
                    htmlFor="companyName"
                    className="text-lg font-semibold text-neutral-900 mb-4 block"
                  >
                    会社名
                  </label>
                  <Input
                    id="companyName"
                    placeholder="会社名を入力"
                    value={detailSearchData.companyName}
                    onChange={(e) =>
                      setDetailSearchData((prev) => ({
                        ...prev,
                        companyName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200">
                  <label
                    htmlFor="inquiryType"
                    className="text-lg font-semibold text-neutral-900 mb-4 block"
                  >
                    問い合わせ種別
                  </label>
                  <Input
                    id="inquiryType"
                    placeholder="問い合わせ種別を入力"
                    value={detailSearchData.inquiryType}
                    onChange={(e) =>
                      setDetailSearchData((prev) => ({
                        ...prev,
                        inquiryType: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200">
                <label
                  htmlFor="status"
                  className="text-lg font-semibold text-neutral-900 mb-4 block"
                >
                  ステータス
                </label>
                <select
                  id="status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={detailSearchData.status}
                  onChange={(e) =>
                    setDetailSearchData((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                >
                  <option value="">すべて</option>
                  <option value="未対応">未対応</option>
                  <option value="対応中">対応中</option>
                  <option value="完了">完了</option>
                </select>
              </div>

              <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">期間指定</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="dateFrom"
                      className="text-sm font-medium text-neutral-700 mb-2 block"
                    >
                      開始日
                    </label>
                    <Input
                      id="dateFrom"
                      type="date"
                      value={detailSearchData.dateFrom}
                      onChange={(e) =>
                        setDetailSearchData((prev) => ({
                          ...prev,
                          dateFrom: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="dateTo"
                      className="text-sm font-medium text-neutral-700 mb-2 block"
                    >
                      終了日
                    </label>
                    <Input
                      id="dateTo"
                      type="date"
                      value={detailSearchData.dateTo}
                      onChange={(e) =>
                        setDetailSearchData((prev) => ({
                          ...prev,
                          dateTo: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 pt-4 border-t border-neutral-200 flex justify-end gap-3">
            <Button variant="outline" onClick={handleResetDetail}>
              リセット
            </Button>
            <Button onClick={handleDetailSearch}>検索実行</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
