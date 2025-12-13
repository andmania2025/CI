"use client";

import { PropertyImageSlider } from "@/components/property-details/PropertyImageSlider";
import type { PropertyImage } from "@/components/property-details/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormError } from "@/components/ui/form-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const MediaTab: React.FC = () => {
  const { register: _register, control, setValue } = useFormContext();
  const [images, setImages] = useState<PropertyImage[]>([]);
  const [expandedImageId, setExpandedImageId] = useState<string | null>(null);

  // 画像アップロードハンドラー
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
        const updatedImages = [...prev, ...newImages];
        // フォームの値も更新
        setValue("images", updatedImages, { shouldDirty: true });
        return updatedImages;
      });

      const fileInput = document.getElementById("image-upload") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("画像アップロードエラー:", error);
    }
  };

  // 画像削除ハンドラー
  const handleImageDelete = (imageId: string) => {
    setImages((prev) => {
      const updatedImages = prev.filter((img) => img.id !== imageId);
      // フォームの値も更新
      setValue("images", updatedImages, { shouldDirty: true });
      return updatedImages;
    });
  };

  // メイン画像設定ハンドラー
  const handleSetMainImage = (imageId: string) => {
    setImages((prev) => {
      const updatedImages = prev.map((img) => ({
        ...img,
        isMain: img.id === imageId,
      }));
      // フォームの値も更新
      setValue("images", updatedImages, { shouldDirty: true });
      return updatedImages;
    });
  };

  // 画像拡大ハンドラー
  const handleImageExpand = (imageId: string) => {
    setExpandedImageId(imageId);
  };

  const handleCloseExpanded = () => {
    setExpandedImageId(null);
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

  // 画像タイトル変更ハンドラー
  const handleImageTitleChange = (imageId: string, newTitle: string) => {
    setImages((prev) => {
      const updatedImages = prev.map((img) =>
        img.id === imageId ? { ...img, title: newTitle } : img
      );
      // フォームの値も更新
      setValue("images", updatedImages, { shouldDirty: true });
      return updatedImages;
    });
  };

  const expandedImage = images.find((img) => img.id === expandedImageId);

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-4 h-full">
            {/* 左カラム: 画像アップロード */}
            <div className="space-y-1">
              <PropertyImageSlider
                images={images}
                isEditMode={true}
                onImageUpload={handleImageUpload}
                onImageDelete={handleImageDelete}
                onSetMainImage={handleSetMainImage}
                onImageExpand={handleImageExpand}
                onImageTitleChange={handleImageTitleChange}
              />
            </div>

            {/* 右カラム: 設定項目 */}
            <div className="space-y-3">
              {/* 物件カテゴリ・問い合わせ回数 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-sm font-medium mb-2">物件カテゴリ</Label>
                  <Controller
                    name="propertyCategory"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mansion">マンション</SelectItem>
                          <SelectItem value="house">一戸建て</SelectItem>
                          <SelectItem value="land">土地</SelectItem>
                          <SelectItem value="building">ビル・事務所</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium mb-2">問い合わせ回数</Label>
                  <Input value="0" disabled className="bg-gray-50" />
                </div>
              </div>

              {/* 注目設定・公開範囲 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-sm font-medium mb-2">注目設定</Label>
                  <Controller
                    name="featured"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="featured">注目物件</SelectItem>
                          <SelectItem value="normal">通常物件</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-sm font-medium mb-2">公開範囲</Label>
                  <Controller
                    name="publicScope"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">一般公開</SelectItem>
                          <SelectItem value="members">会員限定</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {/* 公開設定・掲載媒体選択 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-sm font-medium mb-2">
                    公開設定 <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="publicationStatus"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="published">公開</SelectItem>
                          <SelectItem value="unpublished">非公開</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FormError name="publicationStatus" />
                </div>

                <div className="space-y-1">
                  <Label className="text-sm font-medium mb-2">掲載媒体選択</Label>
                  <Controller
                    name="publicationMedium"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="掲載媒体を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">Webサイト</SelectItem>
                          <SelectItem value="portal">ポータルサイト</SelectItem>
                          <SelectItem value="sns">SNS</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {/* 次回更新予定日・取引条件有効期限 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-sm font-medium mb-2">
                    次回更新予定日<span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="nextUpdateDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="日付を選択"
                      />
                    )}
                  />
                  <FormError name="nextUpdateDate" />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium mb-2">取引条件有効期限</Label>
                  <Controller
                    name="validUntilDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="日付を選択"
                      />
                    )}
                  />
                </div>
              </div>

              {/* 注目期間 */}
              <div className="space-y-1">
                <Label className="text-sm font-medium mb-2">注目期間</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Controller
                    name="featurePeriodStart"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="開始日"
                      />
                    )}
                  />
                  <Controller
                    name="featurePeriodEnd"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="終了日"
                      />
                    )}
                  />
                </div>
              </div>

              {/* 公開範囲予約・公開予約日 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-sm font-medium mb-2">公開範囲予約</Label>
                  <Controller
                    name="publicScopeReservation"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">予約なし</SelectItem>
                          <SelectItem value="scheduled">スケジュール予約</SelectItem>
                          <SelectItem value="restricted">限定公開予約</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-sm font-medium mb-2">公開予約日</Label>
                  <Controller
                    name="reservedReleaseDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="日付を選択"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
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
