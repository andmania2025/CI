import { Button } from "@/components/ui/button";
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
import { Search } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import type { RealtorSearchDialogProps } from "./types";

export const RealtorSearchDialog: React.FC<RealtorSearchDialogProps> = ({
  isOpen,
  onOpenChange,
  formData,
  onFormDataChange,
  onSearch,
  onReset,
}) => {
  const [localFormData, setLocalFormData] = useState({
    freeword: "",
    propertyPublicationPermission: "",
    paidAccount: "",
    status: "",
    displayCount: "20",
  });

  // フォームデータが変更されたときにローカル状態を更新
  useEffect(() => {
    setLocalFormData(
      formData as {
        freeword: string;
        propertyPublicationPermission: string;
        paidAccount: string;
        status: string;
        displayCount: string;
      }
    );
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...localFormData, [field]: value };
    setLocalFormData(newData);
    onFormDataChange(field, value);
  };

  const handleReset = () => {
    const resetData = {
      freeword: "",
      propertyPublicationPermission: "",
      paidAccount: "",
      status: "",
      displayCount: "20",
    };
    setLocalFormData(resetData);
    onReset();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">検索条件</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* フリーワード */}
          <div className="space-y-2">
            <Label htmlFor="freeword">フリーワード</Label>
            <Input
              id="freeword"
              value={localFormData.freeword}
              onChange={(e) => handleInputChange("freeword", e.target.value)}
              placeholder="会社名、代表者名、免許番号で検索"
            />
          </div>

          {/* 物件公開権限と有料アカウントを横並び */}
          <div className="grid grid-cols-2 gap-4">
            {/* 物件公開権限 */}
            <div className="space-y-2">
              <Label htmlFor="propertyPublicationPermission">物件公開権限</Label>
              <Select
                value={localFormData.propertyPublicationPermission}
                onValueChange={(value) => handleInputChange("propertyPublicationPermission", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="permitted">許可</SelectItem>
                  <SelectItem value="notPermitted">不許可</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 有料アカウント */}
            <div className="space-y-2">
              <Label htmlFor="paidAccount">有料アカウント</Label>
              <Select
                value={localFormData.paidAccount}
                onValueChange={(value) => handleInputChange("paidAccount", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="paid">有料</SelectItem>
                  <SelectItem value="free">無料</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* アカウント状態と表示件数を横並び */}
          <div className="grid grid-cols-2 gap-4">
            {/* アカウント状態 */}
            <div className="space-y-2">
              <Label htmlFor="status">アカウント状態</Label>
              <Select
                value={localFormData.status}
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="active">有効</SelectItem>
                  <SelectItem value="inactive">無効</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 表示件数 */}
            <div className="space-y-2">
              <Label htmlFor="displayCount">表示件数</Label>
              <Select
                value={localFormData.displayCount}
                onValueChange={(value) => handleInputChange("displayCount", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="表示件数を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10件</SelectItem>
                  <SelectItem value="20">20件</SelectItem>
                  <SelectItem value="50">50件</SelectItem>
                  <SelectItem value="100">100件</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" onClick={handleReset}>
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
