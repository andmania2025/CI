"use client";

import { BasicInfoTab } from "@/components/property-details/tabs/BasicInfoTab";
import { FeaturesTab } from "@/components/property-details/tabs/FeaturesTab";
import { PropertyDetailsTab } from "@/components/property-details/tabs/PropertyDetailsTab";
import { SettingsAndImagesTab } from "@/components/property-details/tabs/SettingsAndImagesTab";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Edit3, Save, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { updateProperty } from "../_actions/updatePropertyAction";
import type { Property } from "../_components/types";
import { getProperties } from "../_lib/queries";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const propertyId = params.id as string;

  useEffect(() => {
    const loadProperty = async () => {
      try {
        setLoading(true);
        // サンプルデータから物件データを取得
        const properties = await getProperties();
        const foundProperty = properties.find((p: Property) => p.id === propertyId);

        if (foundProperty) {
          setProperty(foundProperty);
        } else {
          // 物件が見つからない場合のデフォルトデータ
          const defaultProperty: Property = {
            id: propertyId,
            title: "物件名",
            publicationStatus: "公開",
            updateDate: "2024-01-15",
            nextUpdateDate: "2024-02-15",
            inquiryCount: 0,
            actions: "",
          };
          setProperty(defaultProperty);
        }
      } catch (error) {
        console.error("物件データの読み込みに失敗:", error);
        toast.error("物件データの読み込みに失敗しました");
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      loadProperty();
    }
  }, [propertyId]);

  const handleBack = () => {
    router.back();
  };

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSave = async () => {
    if (!property) return;

    try {
      setIsSaving(true);

      // ローカルストレージから編集データを取得
      const editDataStr = localStorage.getItem(`property_${property.id}_edit`);
      const editData = editDataStr ? JSON.parse(editDataStr) : {};

      // 編集データとプロパティデータをマージ
      const updatedProperty = {
        ...property,
        images: editData.images || property.images,
        publicationStartDate: editData.publicationStartDate || property.publicationStartDate,
        publicationEndDate: editData.publicationEndDate || property.publicationEndDate,
        publicScope: editData.publicScope || property.publicScope,
        priorityDisplay: editData.priorityDisplay || property.priorityDisplay,
        category: editData.category || property.category,
        updateDate: new Date().toISOString().split("T")[0],
      };

      const result = await updateProperty({
        id: updatedProperty.id,
        title: updatedProperty.title,
        publicationStatus: updatedProperty.publicationStatus,
        updateDate: updatedProperty.updateDate,
        nextUpdateDate: updatedProperty.nextUpdateDate,
      });

      if (result.success) {
        // 保存成功後、プロパティ状態を更新
        setProperty(updatedProperty);

        // ローカルストレージをクリア
        localStorage.removeItem(`property_${property.id}_edit`);

        setIsEditMode(false);
        toast.success("物件情報を更新しました");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("保存に失敗:", error);
      toast.error("保存に失敗しました");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // ローカルストレージをクリア
    if (property) {
      localStorage.removeItem(`property_${property.id}_edit`);
    }
    // 編集モードを抜ける
    setIsEditMode(false);
  };

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

  if (!property) {
    return (
      <div className="flex flex-1 flex-col gap-6 p-6 min-h-0 h-full">
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <p className="text-gray-600">物件が見つかりませんでした。</p>
            <Button onClick={handleBack} className="mt-4">
              戻る
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 min-h-0 h-full">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
          </div>
        </div>

        {/* 編集ボタン */}
        <div className="flex items-center gap-2">
          {isEditMode ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                キャンセル
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isSaving ? "保存中..." : "保存"}
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={handleEditToggle}
              className="flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              編集
            </Button>
          )}
        </div>
      </div>

      {/* タブコンテンツ */}
      <div className="flex-1 min-h-0">
        <Tabs defaultValue="basic" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">基本情報</TabsTrigger>
            <TabsTrigger value="details">物件詳細</TabsTrigger>
            <TabsTrigger value="features">設備・特徴</TabsTrigger>
            <TabsTrigger value="settings">掲載設定・画像</TabsTrigger>
          </TabsList>

          <div className="flex-1 min-h-0 mt-6">
            <TabsContent value="basic" className="h-full">
              <BasicInfoTab property={property} isEditMode={isEditMode} />
            </TabsContent>
            <TabsContent value="details" className="h-full">
              <PropertyDetailsTab property={property} isEditMode={isEditMode} />
            </TabsContent>
            <TabsContent value="features" className="h-full">
              <FeaturesTab property={property} isEditMode={isEditMode} />
            </TabsContent>
            <TabsContent value="settings" className="h-full">
              <SettingsAndImagesTab property={property} isEditMode={isEditMode} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
