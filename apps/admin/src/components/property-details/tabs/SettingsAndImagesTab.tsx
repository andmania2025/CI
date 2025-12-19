"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody } from "@/components/ui/table";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PropertyImageSlider } from "../PropertyImageSlider";
import type { PropertyDetailTabsProps, PropertyImage } from "../types";
import { DateInputRow, SelectInputRow } from "./PropertyDetailRows";

export const SettingsAndImagesTab = ({ property, isEditMode = false }: PropertyDetailTabsProps) => {
  const [publicationStartDate, setPublicationStartDate] = useState<Date | undefined>(
    property.publicationStartDate ? new Date(property.publicationStartDate) : new Date("2024-01-01")
  );
  const [publicationEndDate, setPublicationEndDate] = useState<Date | undefined>(
    property.publicationEndDate ? new Date(property.publicationEndDate) : undefined
  );
  const [publicScope, setPublicScope] = useState<string>(property.publicScope || "一般公開");
  const [priorityDisplay, setPriorityDisplay] = useState<string>(
    property.priorityDisplay || "なし"
  );
  const [category, setCategory] = useState<string>(property.category || "賃貸");
  const [contractValidityPeriod, setContractValidityPeriod] = useState<Date | undefined>(
    property.contractValidityPeriod ? new Date(property.contractValidityPeriod) : undefined
  );
  const [expandedImageId, setExpandedImageId] = useState<string | null>(null);
  const _isInitialized = useRef(false);

  // サンプル画像データ（実際の実装ではAPIから取得）
  const sampleImages: PropertyImage[] = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      imageType: "EXTERIOR",
      caption: "外観写真",
      order: 1,
      isMain: true,
      uploadedAt: "2024-01-15",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      imageType: "INTERIOR",
      caption: "リビングルーム",
      order: 2,
      isMain: false,
      uploadedAt: "2024-01-15",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop",
      imageType: "FLOOR_PLAN",
      caption: "間取り図",
      order: 3,
      isMain: false,
      uploadedAt: "2024-01-15",
    },
  ];

  // imagesをuseStateで初期化（useEffectを使わない）
  const [images, setImages] = useState<PropertyImage[]>(() => {
    return property.images && property.images.length > 0 ? property.images : sampleImages;
  });

  // ローカルストレージに編集データを保存（画像データは除外）
  useEffect(() => {
    if (isEditMode) {
      try {
        const imageMetadata = images.map((img) => ({
          id: img.id,
          url: img.url,
          isMain: img.isMain,
          order: img.order,
        }));

        const editData = {
          imageMetadata,
          publicationStartDate: publicationStartDate?.toISOString(),
          publicationEndDate: publicationEndDate?.toISOString(),
          contractValidityPeriod: contractValidityPeriod?.toISOString(),
          publicScope,
          priorityDisplay,
          category,
        };

        localStorage.setItem(`property_${property.id}_edit`, JSON.stringify(editData));
      } catch (error) {
        console.warn("Failed to save to localStorage:", error);
      }
    }
  }, [
    isEditMode,
    images,
    publicationStartDate,
    publicationEndDate,
    contractValidityPeriod,
    publicScope,
    priorityDisplay,
    category,
    property.id,
  ]);

  // キャンセル時にローカルストレージをクリアして、元の状態に戻す
  useEffect(() => {
    if (!isEditMode) {
      try {
        const savedEditData = localStorage.getItem(`property_${property.id}_edit`);
        if (savedEditData) {
          localStorage.removeItem(`property_${property.id}_edit`);
        }
      } catch (error) {
        console.warn("Failed to remove from localStorage:", error);
      }

      if (property.images) {
        setImages(property.images);
      }
      setPublicationStartDate(
        property.publicationStartDate
          ? new Date(property.publicationStartDate)
          : new Date("2024-01-01")
      );
      setPublicationEndDate(
        property.publicationEndDate ? new Date(property.publicationEndDate) : undefined
      );
      setContractValidityPeriod(
        property.contractValidityPeriod ? new Date(property.contractValidityPeriod) : undefined
      );
      setPublicScope(property.publicScope || "一般公開");
      setPriorityDisplay(property.priorityDisplay || "なし");
      setCategory(property.category || "賃貸");
    }
  }, [isEditMode, property]);

  const handleImageUpload = async (files: FileList) => {
    const fileArray = Array.from(files);
    const timestamp = Date.now();

    const imagePromises = fileArray.map((file, index) => {
      return new Promise<{ file: File; url: string; index: number }>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const url = e.target?.result as string;
          resolve({ file, url, index });
        };

        reader.onerror = () => {
          reject(new Error(`Failed to read file: ${file.name}`));
        };

        reader.readAsDataURL(file);
      });
    });

    try {
      const results = await Promise.all(imagePromises);

      setImages((prev) => {
        const newImages = results.map(({ file, url, index }) => {
          const newImage: PropertyImage = {
            id: `uploaded-${timestamp}-${index}`,
            url: url,
            imageType: "EXTERIOR",
            caption: file.name,
            order: prev.length + index,
            isMain: prev.length === 0 && index === 0,
            uploadedAt: new Date().toISOString(),
          };
          return newImage;
        });
        return [...prev, ...newImages];
      });

      const fileInput = document.getElementById("image-upload") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("画像アップロードエラー:", error);
    }
  };

  const handleImageDelete = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handleSetMainImage = (imageId: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isMain: img.id === imageId,
      }))
    );
  };

  const handleImageExpand = (imageId: string) => {
    setExpandedImageId(imageId);
  };

  const handleCloseExpanded = () => {
    setExpandedImageId(null);
  };

  const handleImageTitleChange = (imageId: string, newTitle: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === imageId ? { ...img, title: newTitle } : img))
    );
  };

  const handlePreviousImage = () => {
    const currentIndex = images.findIndex((img) => img.id === expandedImageId);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setExpandedImageId(images[prevIndex]?.id || null);
  };

  const handleNextImage = () => {
    const currentIndex = images.findIndex((img) => img.id === expandedImageId);
    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setExpandedImageId(images[nextIndex]?.id || null);
  };

  const expandedImage = images.find((img) => img.id === expandedImageId);

  return (
    <div className="h-full">
      <div className="grid grid-cols-3 gap-6 h-full">
        {/* 左カラム: 統合された画像管理 */}
        <div className="col-span-2 min-h-0 h-full">
          <PropertyImageSlider
            images={images}
            isEditMode={isEditMode}
            onImageUpload={handleImageUpload}
            onImageDelete={handleImageDelete}
            onSetMainImage={handleSetMainImage}
            onImageExpand={handleImageExpand}
            onImageTitleChange={handleImageTitleChange}
          />
        </div>

        {/* 右カラム: 統合された設定と担当者情報 */}
        <div className="flex flex-col h-full overflow-hidden">
          {/* 統合された設定カード */}
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="shrink-0">
              <CardTitle className="text-lg">掲載設定</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden px-6 py-0">
              <Table className="w-full table-fixed">
                <TableBody>
                  {/* 掲載カテゴリー */}
                  <SelectInputRow
                    label="掲載カテゴリー"
                    isEditMode={isEditMode}
                    defaultValue={category}
                    value={category}
                    onValueChange={setCategory}
                    options={[
                      { value: "賃貸", label: "賃貸" },
                      { value: "売買", label: "売買" },
                      { value: "新築分譲", label: "新築分譲" },
                    ]}
                  />

                  {/* 公開/非公開設定 */}
                  <SelectInputRow
                    label="公開設定"
                    isEditMode={isEditMode}
                    defaultValue={publicScope}
                    value={publicScope}
                    onValueChange={setPublicScope}
                    options={[
                      { value: "一般公開", label: "一般公開" },
                      { value: "限定公開", label: "限定公開" },
                      { value: "非公開", label: "非公開" },
                    ]}
                  />

                  {/* 優先表示 */}
                  <SelectInputRow
                    label="優先表示"
                    isEditMode={isEditMode}
                    defaultValue={priorityDisplay}
                    value={priorityDisplay}
                    onValueChange={setPriorityDisplay}
                    options={[
                      { value: "なし", label: "なし" },
                      { value: "通常", label: "通常" },
                      { value: "強調", label: "強調" },
                      { value: "最優先", label: "最優先" },
                    ]}
                  />

                  {/* 掲載開始日 */}
                  <DateInputRow
                    label="掲載開始日"
                    isEditMode={isEditMode}
                    value={publicationStartDate}
                    onChange={setPublicationStartDate}
                    placeholder="掲載開始日を選択"
                  />

                  {/* 掲載終了日 */}
                  <DateInputRow
                    label="掲載終了日"
                    isEditMode={isEditMode}
                    value={publicationEndDate}
                    onChange={setPublicationEndDate}
                    placeholder="掲載終了日を選択"
                  />

                  {/* 取引条件有効期限 */}
                  <DateInputRow
                    label="取引条件有効期限"
                    isEditMode={isEditMode}
                    value={contractValidityPeriod}
                    onChange={setContractValidityPeriod}
                    placeholder="取引条件有効期限を選択"
                  />
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 画像拡大表示モーダル */}
      <Dialog open={!!expandedImageId} onOpenChange={handleCloseExpanded}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="flex items-center justify-between">
              <span>{expandedImage?.alt || "物件画像"}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseExpanded}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          {expandedImage && (
            <div className="relative p-4">
              {/* 画像表示エリア */}
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={expandedImage.url}
                  alt={expandedImage.alt}
                  className="w-full h-full object-contain"
                />

                {/* ナビゲーションボタン */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handlePreviousImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>

              {/* 画像情報 */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {expandedImage.imageType === "EXTERIOR"
                      ? "外観"
                      : expandedImage.imageType === "INTERIOR"
                        ? "室内"
                        : expandedImage.imageType === "FLOOR_PLAN"
                          ? "間取り図"
                          : "その他"}
                  </Badge>
                  {expandedImage.isMain && <Badge variant="default">メイン画像</Badge>}
                </div>
                <div className="text-sm text-gray-500">
                  {images.findIndex((img) => img.id === expandedImageId) + 1} / {images.length}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
