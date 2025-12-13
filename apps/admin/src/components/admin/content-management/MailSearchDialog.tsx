import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

interface MailFormData {
  freeword: string;
  deliverySetting: {
    delivery: boolean;
    stop: boolean;
  };
  displayCount: string;
}

interface MailSearchDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: MailFormData;
  onFormDataChange: (field: string, value: string) => void;
  onCheckboxChange: (category: string, field: string, checked: boolean) => void;
  onSearch: () => void;
  onReset: () => void;
}

export const MailSearchDialog: React.FC<MailSearchDialogProps> = ({
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

          {/* 配信設定 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">配信設定</Label>
            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="delivery"
                  checked={formData.deliverySetting.delivery}
                  onCheckedChange={(checked: boolean) =>
                    onCheckboxChange("deliverySetting", "delivery", checked)
                  }
                />
                <Label htmlFor="delivery" className="text-sm font-normal cursor-pointer">
                  配信
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="stop"
                  checked={formData.deliverySetting.stop}
                  onCheckedChange={(checked: boolean) =>
                    onCheckboxChange("deliverySetting", "stop", checked)
                  }
                />
                <Label htmlFor="stop" className="text-sm font-normal cursor-pointer">
                  停止
                </Label>
              </div>
            </div>
          </div>

          {/* 表示件数 */}
          <div className="space-y-2">
            <Label htmlFor="displayCount" className="text-sm font-medium">
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
