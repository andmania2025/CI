import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Search } from "lucide-react";
import type React from "react";
import type { PropertySearchDialogProps } from "./types";

export const PropertySearchDialog: React.FC<PropertySearchDialogProps> = ({
  isOpen,
  onOpenChange,
  formData,
  onFormDataChange,
  onCheckboxChange,
  onSearch,
  onReset,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg font-semibold">検索条件</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* フリーワード | 不動産種別 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="freeword" className="text-sm font-medium">
                フリーワード
              </Label>
              <Input
                id="freeword"
                type="text"
                value={formData.freeword}
                onChange={(e) => onFormDataChange("freeword", e.target.value)}
                placeholder="フリーワードを入力"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyType" className="text-sm font-medium">
                不動産種別
              </Label>
              <Select
                value={formData.propertyType}
                onValueChange={(value) => onFormDataChange("propertyType", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mansion">マンション</SelectItem>
                  <SelectItem value="house">一戸建て</SelectItem>
                  <SelectItem value="land">土地</SelectItem>
                  <SelectItem value="office">事務所</SelectItem>
                  <SelectItem value="store">店舗</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 物件特徴 | 質問カテゴリ(全般) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="propertyFeature" className="text-sm font-medium">
                物件特徴
              </Label>
              <Select
                value={formData.propertyFeature}
                onValueChange={(value) => onFormDataChange("propertyFeature", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">新築</SelectItem>
                  <SelectItem value="used">中古</SelectItem>
                  <SelectItem value="renovated">リノベーション</SelectItem>
                  <SelectItem value="corner">角地</SelectItem>
                  <SelectItem value="south-facing">南向き</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="questionCategory" className="text-sm font-medium">
                質問カテゴリ(全般)
              </Label>
              <Select
                value={formData.questionCategory}
                onValueChange={(value) => onFormDataChange("questionCategory", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="purchase">購入について</SelectItem>
                  <SelectItem value="sale">売却について</SelectItem>
                  <SelectItem value="rent">賃貸について</SelectItem>
                  <SelectItem value="loan">ローンについて</SelectItem>
                  <SelectItem value="other">その他</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 公開状況 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">公開状況</Label>
            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="public"
                  checked={formData.publicationStatus.public}
                  onCheckedChange={(checked: boolean) =>
                    onCheckboxChange("publicationStatus", "public", checked)
                  }
                />
                <Label htmlFor="public" className="text-sm font-normal cursor-pointer">
                  公開
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="nonPublic"
                  checked={formData.publicationStatus.nonPublic}
                  onCheckedChange={(checked: boolean) =>
                    onCheckboxChange("publicationStatus", "nonPublic", checked)
                  }
                />
                <Label htmlFor="nonPublic" className="text-sm font-normal cursor-pointer">
                  非公開
                </Label>
              </div>
            </div>
          </div>

          {/* 登録日 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">登録日</Label>
            <div className="flex items-center gap-2">
              <DatePicker
                value={
                  formData.registrationDateFrom
                    ? new Date(formData.registrationDateFrom)
                    : undefined
                }
                onChange={(date) => {
                  onFormDataChange("registrationDateFrom", date ? format(date, "yyyy-MM-dd") : "");
                }}
                placeholder="開始日を選択"
                className="w-full"
              />
              <span className="text-gray-500">〜</span>
              <DatePicker
                value={
                  formData.registrationDateTo ? new Date(formData.registrationDateTo) : undefined
                }
                onChange={(date) => {
                  onFormDataChange("registrationDateTo", date ? format(date, "yyyy-MM-dd") : "");
                }}
                placeholder="終了日を選択"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" onClick={onReset}>
            クリア
          </Button>
          <Button onClick={onSearch} className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            検索
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
