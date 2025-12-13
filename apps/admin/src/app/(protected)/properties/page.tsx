"use client";

import React, { useEffect, useState } from "react";
import { PropertyActions } from "./_components/PropertyActions";
import { PropertyDuplicateToast } from "./_components/PropertyDuplicateToast";
import { PropertySearchDialog } from "./_components/PropertySearchDialog";
import { PropertyTable } from "./_components/PropertyTable";
import type { Property, PropertyFormData } from "./_components/types";
import { downloadSelectedPropertiesCSV } from "./_lib/csvUtils";
import { getProperties } from "./_lib/queries";

// 列定義の型
// PropertyTableのColumnDef型に合わせる
interface ColumnDef {
  key: string;
  label: string;
  align: "left" | "center";
  visible: boolean;
}

// PropertyTableのdefaultColumnsを使用するため、initialColumnsは不要

export default function Page() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [columns, setColumns] = useState<ColumnDef[] | undefined>(undefined);
  const [duplicatePropertyId, setDuplicatePropertyId] = useState<string | null>(null);
  const [duplicatePropertyTitle, setDuplicatePropertyTitle] = useState<string>("");

  const [formData, setFormData] = useState<PropertyFormData>({
    freeword: "",
    realEstateCompany: "",
    area: "",
    prefecture: "",
    city: "",
    ward: "",
    route: "",
    station: "",
    floorPlan: "",
    propertyType: "",
    completionSale: {
      completion: false,
      sale: false,
    },
    registrationStatus: {
      registered: false,
      underReview: false,
    },
    publicationStatus: {
      public: false,
      private: false,
    },
    buildingStatus: {
      existing: false,
      underConstruction: false,
    },
    publicationSettings: {
      notPublished: false,
      public: false,
      private: false,
    },
    nextUpdateDate: false,
    displayCount: "20",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getProperties();
        setProperties(data);
        setSelectedProperties([]);
        setSelectAll(false);
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
      realEstateCompany: "",
      area: "",
      prefecture: "",
      city: "",
      ward: "",
      route: "",
      station: "",
      floorPlan: "",
      propertyType: "",
      completionSale: {
        completion: false,
        sale: false,
      },
      registrationStatus: {
        registered: false,
        underReview: false,
      },
      publicationStatus: {
        public: false,
        private: false,
      },
      buildingStatus: {
        existing: false,
        underConstruction: false,
      },
      publicationSettings: {
        notPublished: false,
        public: false,
        private: false,
      },
      nextUpdateDate: false,
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
    if (selected) {
      setSelectedProperties(properties.map((p) => p.id));
    } else {
      setSelectedProperties([]);
    }
  };

  // 選択状態の同期
  useEffect(() => {
    const allSelected = properties.length > 0 && selectedProperties.length === properties.length;
    if (allSelected !== selectAll) {
      setSelectAll(allSelected);
    }
  }, [selectedProperties, properties, selectAll]);

  const handleDownload = () => {
    downloadSelectedPropertiesCSV(properties, selectedProperties);
  };

  const handleUpload = () => {
    console.log("アップロード実行");
  };

  const handleBulkDelete = () => {
    console.log("一括削除実行:", selectedProperties);
  };

  // 物件複製処理
  const handleDuplicateProperty = (propertyId: string) => {
    console.log("🔵 複製ボタンクリック:", propertyId);
    const property = properties.find((p) => p.id === propertyId);
    if (property) {
      console.log("✅ 物件を発見:", property.title);
      setDuplicatePropertyTitle(property.title);
      setDuplicatePropertyId(propertyId);
    } else {
      console.log("❌ 物件が見つかりません:", propertyId);
    }
  };

  // 複製完了後の処理
  const handleDuplicateSuccess = () => {
    console.log("🎉 複製成功コールバック実行");
    // データを再読み込み
    const loadData = async () => {
      try {
        console.log("🔄 データ再読み込み開始");
        const data = await getProperties();
        console.log("✅ データ再読み込み完了。物件数:", data.length);
        setProperties(data);
      } catch (error) {
        console.error("❌ データの読み込みに失敗:", error);
      }
    };
    loadData();
  };

  // 複製トーストを閉じる
  const handleCloseDuplicateToast = () => {
    setDuplicatePropertyId(null);
    setDuplicatePropertyTitle("");
  };

  const handleToggleColumnVisibility = (columnKey: string) => {
    setColumns((prev) => {
      if (!prev) return undefined;
      return prev.map((col) => (col.key === columnKey ? { ...col, visible: !col.visible } : col));
    });
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
        <h2 className="text-3xl font-bold tracking-tight leading-none">物件管理</h2>
      </div>

      {/* アクションボタン */}
      <PropertyActions
        selectedProperties={selectedProperties}
        onSearch={() => setIsSearchModalOpen(true)}
        onDownload={handleDownload}
        onUpload={handleUpload}
        onBulkDelete={handleBulkDelete}
      />

      {/* 物件テーブル */}
      <PropertyTable
        properties={properties}
        selectedProperties={selectedProperties}
        selectAll={selectAll}
        onSelectProperty={handleSelectProperty}
        onSelectAll={handleSelectAll}
        onDuplicateProperty={handleDuplicateProperty}
        onColumnsChange={handleColumnsChange}
        onToggleColumnVisibility={handleToggleColumnVisibility}
        initialColumns={columns}
      />

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

      {/* 複製トースト通知 */}
      <PropertyDuplicateToast
        propertyId={duplicatePropertyId}
        propertyTitle={duplicatePropertyTitle}
        onClose={handleCloseDuplicateToast}
        onSuccess={handleDuplicateSuccess}
      />
    </div>
  );
}
