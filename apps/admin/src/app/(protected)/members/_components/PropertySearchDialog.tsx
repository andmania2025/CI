"use client";

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
          {/* フリーワード */}
          <div className="space-y-2">
            <Label htmlFor="freeword" className="text-sm font-medium mb-2">
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

          {/* 登録日 */}
          <div className="space-y-2">
            <Label htmlFor="registrationDate" className="text-sm font-medium mb-2">
              登録日
            </Label>
            <DatePicker
              value={formData.registrationDate ? new Date(formData.registrationDate) : undefined}
              onChange={(date) => {
                onFormDataChange("registrationDate", date ? format(date, "yyyy-MM-dd") : "");
              }}
              placeholder="日付を選択"
            />
          </div>

          {/* アカウント状態 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium mb-2">アカウント状態</Label>
            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="active"
                  checked={formData.accountStatus.active}
                  onCheckedChange={(checked: boolean) =>
                    onCheckboxChange("accountStatus", "active", checked)
                  }
                />
                <Label htmlFor="active" className="text-sm font-normal cursor-pointer">
                  有効
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cancelled"
                  checked={formData.accountStatus.cancelled}
                  onCheckedChange={(checked: boolean) =>
                    onCheckboxChange("accountStatus", "cancelled", checked)
                  }
                />
                <Label htmlFor="cancelled" className="text-sm font-normal cursor-pointer">
                  退会
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="invalid"
                  checked={formData.accountStatus.invalid}
                  onCheckedChange={(checked: boolean) =>
                    onCheckboxChange("accountStatus", "invalid", checked)
                  }
                />
                <Label htmlFor="invalid" className="text-sm font-normal cursor-pointer">
                  無効
                </Label>
              </div>
            </div>
          </div>

          {/* 表示件数 */}
          <div className="space-y-2">
            <Label htmlFor="displayCount" className="text-sm font-medium mb-2">
              表示件数
            </Label>
            <Select
              value={formData.displayCount}
              onValueChange={(value) => onFormDataChange("displayCount", value)}
            >
              <SelectTrigger className="w-full">
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
