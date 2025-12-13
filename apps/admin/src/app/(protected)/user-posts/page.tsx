"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { PropertyActions } from "./_components/PropertyActions";
import { PropertySearchDialog } from "./_components/PropertySearchDialog";
import { PropertyTable } from "./_components/PropertyTable";
import type { Member, PropertyFormData } from "./_components/types";
import { downloadSelectedMembersCSV } from "./_lib/csvUtils";
import { getProperties } from "./_lib/queries";

// 列定義の型（PropertyTableとPropertyActionsで共有）
// PropertyTableのColumnDef型に合わせる
interface ColumnDef {
  key: string;
  label: string;
  align: "left" | "center";
  visible: boolean;
  render: (member: Member) => React.ReactNode;
}

// PropertyTableのdefaultColumnsを使用するため、initialColumnsは不要

export default function Page() {
  const [properties, setProperties] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [columns, setColumns] = useState<ColumnDef[] | undefined>(undefined);

  const [formData, setFormData] = useState<PropertyFormData>({
    freeword: "",
    propertyType: "",
    propertyFeature: "",
    questionCategory: "",
    publicationStatus: {
      public: false,
      nonPublic: false,
    },
    registrationDateFrom: "",
    registrationDateTo: "",
    displayCount: "20",
  });

  useEffect(() => {
    // クライアント側でのみ実行されることを保証
    if (typeof window !== "undefined") {
      document.title = "ユーザー投稿一覧 - ウチカツ管理システム";
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getProperties();
        setProperties(data);
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
    console.log("検索実行:", formData);
    setIsSearchModalOpen(false);
  };

  const handleReset = () => {
    setFormData({
      freeword: "",
      propertyType: "",
      propertyFeature: "",
      questionCategory: "",
      publicationStatus: {
        public: false,
        nonPublic: false,
      },
      registrationDateFrom: "",
      registrationDateTo: "",
      displayCount: "20",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleCheckboxChange = (parentField: string, childField: string, checked: boolean) => {
    setFormData({
      ...formData,
      [parentField]: {
        ...(formData[parentField as keyof typeof formData] as Record<string, boolean>),
        [childField]: checked,
      },
    });
  };

  const handleSelectProperty = (id: string) => {
    setSelectedProperties((prev) =>
      prev.includes(id) ? prev.filter((propId) => propId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (selected: boolean) => {
    setSelectAll(selected);
    setSelectedProperties(selected ? properties.map((p) => p.id) : []);
  };

  const handleDownload = () => {
    downloadSelectedMembersCSV(properties, selectedProperties);
  };

  const handleUpload = () => {
    console.log("アップロード実行");
  };

  const handleBulkDelete = () => {
    console.log("一括削除実行:", selectedProperties);
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

  const handleToggleColumnVisibility = (columnKey: string) => {
    // PropertyTableで処理されるが、columnsを更新
    setColumns((prev) => {
      if (!prev) return undefined;
      return prev.map((col) => (col.key === columnKey ? { ...col, visible: !col.visible } : col));
    });
  };

  const handleColumnsChange = (newColumns: ColumnDef[]) => {
    setColumns(newColumns);
  };

  return (
    <div className="flex flex-1 flex-col min-h-0 h-full">
      {/* 固定ヘッダー */}
      <div className="sticky top-0 z-10 bg-background pb-4 pt-6 px-6 flex-shrink-0">
        <div className="flex items-baseline justify-between space-y-2 mb-4">
          <h2 className="text-3xl font-bold tracking-tight leading-none">ユーザー投稿一覧</h2>
        </div>

        {/* アクションボタン */}
        <PropertyActions
          selectedProperties={selectedProperties}
          onSearch={() => setIsSearchModalOpen(true)}
          onDownload={handleDownload}
          onUpload={handleUpload}
          onBulkDelete={handleBulkDelete}
        />
      </div>

      {/* コンテンツエリア */}
      <div className="flex-1 min-h-0 p-6">
        {/* 物件テーブル */}
        <PropertyTable
          properties={properties}
          selectedProperties={selectedProperties}
          selectAll={selectAll}
          onSelectProperty={handleSelectProperty}
          onSelectAll={handleSelectAll}
          onColumnsChange={handleColumnsChange}
          onToggleColumnVisibility={handleToggleColumnVisibility}
          initialColumns={columns}
        />
      </div>

      {/* 検索ダイアログ */}
      <PropertySearchDialog
        isOpen={isSearchModalOpen}
        onOpenChange={setIsSearchModalOpen}
        formData={formData}
        onFormDataChange={handleInputChange}
        onCheckboxChange={handleCheckboxChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />
    </div>
  );
}
