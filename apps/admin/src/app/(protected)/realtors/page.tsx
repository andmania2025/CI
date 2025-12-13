"use client";

import React, { useEffect, useState } from "react";
import { RealtorActions } from "./_components/RealtorActions";
import { RealtorTable } from "./_components/RealtorTable";
import type { Realtor } from "./_components/types";
import { downloadSelectedRealtorsCSV } from "./_lib/csvUtils";
import { getRealtors } from "./_lib/queries";

// 列定義の型
interface ColumnDef {
  key: string;
  label: string;
  visible: boolean;
  align: "left" | "center";
}

const initialColumns: ColumnDef[] = [
  { key: "title", label: "会社名", visible: true, align: "left" },
  { key: "representativeName", label: "代表者名", visible: true, align: "center" },
  { key: "contactPerson", label: "担当者名", visible: true, align: "center" },
  { key: "accountType", label: "アカウント種別", visible: true, align: "center" },
  { key: "publicationStatus", label: "状態", visible: true, align: "center" },
  { key: "updateDate", label: "登録日", visible: true, align: "center" },
  { key: "nextUpdateDate", label: "最終ログイン", visible: true, align: "center" },
  { key: "inquiryCount", label: "物件数", visible: true, align: "center" },
];

export default function Page() {
  const [realtors, setRealtors] = useState<Realtor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRealtors, setSelectedRealtors] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [columns, setColumns] = useState<ColumnDef[]>(initialColumns);

  useEffect(() => {
    // クライアント側でのみ実行されることを保証
    if (typeof window !== "undefined") {
      document.title = "不動産業者様管理 - ウチカツ管理システム";
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getRealtors();
        // accountTypeを正しい型に変換
        const typedData = data.map((realtor) => ({
          ...realtor,
          accountType:
            realtor.accountType === "paid" || realtor.accountType === "free"
              ? (realtor.accountType as "paid" | "free")
              : undefined,
        }));
        setRealtors(typedData);
      } catch (error) {
        console.error("データの読み込みに失敗:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // ハンドラー関数
  const handleSearch = () => {
    console.log("検索実行");
    // TODO: 検索ダイアログを実装
  };

  const handleSelectRealtor = (id: string) => {
    setSelectedRealtors((prev: string[]) =>
      prev.includes(id) ? prev.filter((realtorId: string) => realtorId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (selected: boolean) => {
    setSelectAll(selected);
    setSelectedRealtors(selected ? realtors.map((r: Realtor) => r.id) : []);
  };

  const handleDownload = () => {
    downloadSelectedRealtorsCSV(realtors, selectedRealtors);
  };

  const handleUpload = () => {
    console.log("アップロード実行");
    // TODO: CSVインポート機能を実装
  };

  const handleBulkDelete = () => {
    console.log("一括削除実行:", selectedRealtors);
    // TODO: 一括削除機能を実装
  };

  // 業者複製処理
  const handleDuplicateRealtor = (realtorId: string) => {
    const realtor = realtors.find((r: Realtor) => r.id === realtorId);
    if (realtor) {
      console.log("業者複製:", realtorId);
      // TODO: 複製機能を実装
    }
  };

  const handleToggleColumnVisibility = (columnKey: string) => {
    setColumns((prev: ColumnDef[]) =>
      prev.map((col: ColumnDef) =>
        col.key === columnKey ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleColumnsChange = (newColumns: ColumnDef[]) => {
    setColumns(newColumns);
  };

  // ローディング状態
  if (loading) {
    return (
      <div className="flex flex-1 flex-col gap-6 p-6 min-h-0 h-full">
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">データを読み込み中...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 min-h-0 h-full">
      <div className="flex items-baseline justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight leading-none">不動産業者様管理</h2>
      </div>

      {/* アクションボタン */}
      <RealtorActions
        selectedRealtors={selectedRealtors}
        onSearch={handleSearch}
        onDownload={handleDownload}
        onUpload={handleUpload}
        onBulkDelete={handleBulkDelete}
      />

      {/* 業者テーブル */}
      <RealtorTable
        realtors={realtors}
        selectedRealtors={selectedRealtors}
        selectAll={selectAll}
        onSelectRealtor={handleSelectRealtor}
        onSelectAll={handleSelectAll}
        onDuplicateRealtor={handleDuplicateRealtor}
        onColumnsChange={handleColumnsChange}
        onToggleColumnVisibility={handleToggleColumnVisibility}
        initialColumns={columns}
      />
    </div>
  );
}
