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
import { Building2, Search, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { RealtorSelectDialog } from "./RealtorSelectDialog";
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
  const [isRealtorSelectOpen, setIsRealtorSelectOpen] = useState(false);

  // サンプル不動産業者データ（実際の実装ではAPIから取得）
  const realtors = [
    { id: "1", name: "株式会社ワード・スポット", contactPerson: "三田 浩太朗" },
    { id: "2", name: "シュガー株式会社", contactPerson: "高谷 千賀子" },
    { id: "3", name: "株式会社イチカワプランニング", contactPerson: "市川 敦久" },
    { id: "4", name: "株式会社ベルファーストコーポレーション", contactPerson: "鈴木一" },
    { id: "5", name: "桃崎製作所", contactPerson: "堤 勇太" },
    { id: "6", name: "三河建設株式会社", contactPerson: "鈴木雄司" },
    { id: "7", name: "合同会社負動産の窓口", contactPerson: "松岡 実可子" },
    { id: "8", name: "株式会社浜石工務店", contactPerson: "高野 昭秀" },
  ];

  const selectedRealtor = realtors.find((r) => r.id === formData.realtorCompany);

  const handleRealtorSelect = (realtorId: string) => {
    onFormDataChange("realtorCompany", realtorId);
  };

  const handleRealtorClear = () => {
    onFormDataChange("realtorCompany", "");
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-lg font-semibold">検索条件</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* フリーワード | 不動産業者様 */}
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
                <Label className="text-sm font-medium">不動産業者様</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsRealtorSelectOpen(true)}
                    className="flex-1 justify-start h-10 px-3 py-2 text-sm"
                  >
                    <Building2 className="w-4 h-4 mr-2 shrink-0" />
                    <span className="truncate">
                      {selectedRealtor ? selectedRealtor.name : "選択してください"}
                    </span>
                  </Button>
                  {formData.realtorCompany && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleRealtorClear}
                      className="h-10 w-10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* 不動産種別 | 物件特徴 */}
            <div className="grid grid-cols-2 gap-4">
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
            </div>

            {/* 質問カテゴリ(全般) */}
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

            {/* 回答日 */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">回答日</Label>
              <div className="flex items-center gap-2">
                <DatePicker
                  value={formData.answerDateFrom ? new Date(formData.answerDateFrom) : undefined}
                  onChange={(date) => {
                    onFormDataChange("answerDateFrom", date ? format(date, "yyyy-MM-dd") : "");
                  }}
                  placeholder="開始日を選択"
                  className="w-full"
                />
                <span className="text-gray-500">〜</span>
                <DatePicker
                  value={formData.answerDateTo ? new Date(formData.answerDateTo) : undefined}
                  onChange={(date) => {
                    onFormDataChange("answerDateTo", date ? format(date, "yyyy-MM-dd") : "");
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

      {/* 不動産業者選択ダイアログ */}
      <RealtorSelectDialog
        isOpen={isRealtorSelectOpen}
        onOpenChange={setIsRealtorSelectOpen}
        selectedRealtorId={formData.realtorCompany}
        onSelect={handleRealtorSelect}
      />
    </>
  );
};
