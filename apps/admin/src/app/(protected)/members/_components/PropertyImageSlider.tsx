import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Image as ImageIcon, Upload, X } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { PropertyImage } from "./types";

interface PropertyImageSliderProps {
  images: PropertyImage[];
  isEditMode?: boolean;
  onImageUpload?: (files: FileList) => void;
  onImageDelete?: (imageId: string) => void;
  onImageReorder?: (images: PropertyImage[]) => void;
  onSetMainImage?: (imageId: string) => void;
  onImageExpand?: (imageId: string) => void;
  onImageTitleChange?: (imageId: string, title: string) => void;
}

export const PropertyImageSlider: React.FC<PropertyImageSliderProps> = ({
  images = [],
  isEditMode = false,
  onImageUpload,
  onImageDelete,
  onImageReorder: _onImageReorder,
  onSetMainImage: _onSetMainImage,
  onImageExpand: _onImageExpand,
  onImageTitleChange: _onImageTitleChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [_isDragging, _setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const dragCounterRef = useRef(0);

  // imagesプロップを直接使用
  const displayImages = images;

  // 画像が変更されたときにインデックスをリセット
  useEffect(() => {
    if (currentIndex >= displayImages.length) {
      setCurrentIndex(Math.max(0, displayImages.length - 1));
    }
  }, [displayImages.length, currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : displayImages.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < displayImages.length - 1 ? prev + 1 : 0));
  };

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && onImageUpload) {
      onImageUpload(event.target.files);
    }
  };

  // 最適化されたドラッグ&ドロップハンドラー
  const handleDragEnter = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    dragCounterRef.current++;

    // 初回のdragEnterのみ状態を更新
    if (dragCounterRef.current === 1) {
      setIsDragOver(true);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    // dragOverでは状態を更新しない（既にdragEnterで更新済み）
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    dragCounterRef.current--;

    // カウンターが0になった時のみ（完全に領域外に出た時）
    if (dragCounterRef.current === 0) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // カウンターとフラグをリセット
    dragCounterRef.current = 0;
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files.length > 0 && onImageUpload) {
      onImageUpload(files);
    }
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>物件画像・間取り図</span>
          {displayImages.length > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="outline">{displayImages.length}枚</Badge>
              <span className="text-sm text-gray-600">
                物件画像({currentIndex + 1}/{displayImages.length})
              </span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <div className="grid grid-cols-3 gap-4 h-full">
          {/* 左カラム: メイン画像表示エリア（DnD対応） */}
          <div
            className={`${
              displayImages.length > 0 ? "col-span-2" : "col-span-3"
            } relative min-h-0 flex flex-col ${isEditMode ? "cursor-pointer" : ""}`}
            onDragEnter={isEditMode ? handleDragEnter : undefined}
            onDragOver={isEditMode ? handleDragOver : undefined}
            onDragLeave={isEditMode ? handleDragLeave : undefined}
            onDrop={isEditMode ? handleDrop : undefined}
            onClick={
              isEditMode ? () => document.getElementById("image-upload")?.click() : undefined
            }
            onKeyDown={
              isEditMode
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      document.getElementById("image-upload")?.click();
                    }
                  }
                : undefined
            }
            role={isEditMode ? "button" : undefined}
            tabIndex={isEditMode ? 0 : undefined}
          >
            {displayImages.length > 0 ? (
              <>
                <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden relative group">
                  <img
                    src={displayImages[currentIndex]?.url}
                    alt={displayImages[currentIndex]?.alt || "物件画像"}
                    className="w-full h-full object-cover"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                    role="presentation"
                  />

                  {/* スライダーナビゲーション（画像内配置） */}
                  {displayImages.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevious();
                        }}
                        className="h-10 w-10 p-0 bg-white/90 hover:bg-white shadow-lg pointer-events-auto"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNext();
                        }}
                        className="h-10 w-10 p-0 bg-white/90 hover:bg-white shadow-lg pointer-events-auto"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  {/* DnDインジケーター（編集モード時のみ） */}
                  {isEditMode && isDragOver && (
                    <div className="absolute inset-0 bg-muted/20 border-4 border-muted border-dashed rounded-lg flex items-center justify-center z-10 pointer-events-none">
                      <div className="bg-muted rounded-lg p-6 shadow-lg">
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-lg font-medium text-muted-foreground">
                          画像をドロップしてアップロード
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div
                className={`w-full h-full rounded-xl flex items-center justify-center transition-all duration-300 relative ${
                  isDragOver
                    ? "border-[6px] border-dashed border-primary bg-primary/10 scale-[0.98]"
                    : "border-[3px] border-dashed border-muted-foreground/30 bg-muted/10 hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.02]"
                }`}
              >
                <div className="text-center pointer-events-none">
                  <Upload className="w-24 h-24 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-xl font-semibold text-foreground mb-2">
                    画像をアップロードしてください
                  </p>
                  <p className="text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full inline-block">
                    クリックまたはドラッグ&ドロップ
                  </p>
                </div>
              </div>
            )}

            {/* 非表示のファイル入力 */}
            <input
              type="file"
              id="image-upload"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* 右カラム: サムネイル一覧（編集モード・通常モード共通） */}
          {displayImages.length > 0 && (
            <div className="col-span-1 flex flex-col min-h-0">
              <div className="grid grid-cols-3 gap-1.5 flex-1 auto-rows-[80px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {displayImages.map((image, index) => (
                  <div
                    key={image.id}
                    className={`relative w-full h-[80px] rounded-md overflow-hidden border transition-all group ${
                      index === currentIndex
                        ? "border-blue-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleImageClick(index)}
                      className="w-full h-full cursor-pointer p-0 border-0 bg-transparent"
                    >
                      <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
                    </button>

                    {/* 削除アイコン（編集モード時のみ表示） */}
                    {isEditMode && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onImageDelete) {
                            onImageDelete(image.id);
                          }
                        }}
                        className="absolute top-1 right-1 p-1 bg-white text-black rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                        title="画像を削除"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
