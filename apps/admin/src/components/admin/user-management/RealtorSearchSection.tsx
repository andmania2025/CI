import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import type React from "react";
import type { RealtorFormData } from "./types";

interface RealtorSearchSectionProps {
  formData: RealtorFormData;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onInputChange: (field: string, value: string) => void;
  onCheckboxChange: (
    category: keyof Pick<RealtorFormData, "companyPermission" | "accountType" | "accountStatus">,
    field: string,
    checked: boolean
  ) => void;
  onSearch: () => void;
  onReset: () => void;
}

export const RealtorSearchSection: React.FC<RealtorSearchSectionProps> = ({
  formData,
  isExpanded,
  onToggleExpand,
  onInputChange,
  onCheckboxChange,
  onSearch,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* 検索アコーディオンヘッダー */}
      <Button
        variant="ghost"
        className="bg-blue-700 text-white p-4 rounded-t-lg rounded-b-none flex items-center justify-between cursor-pointer hover:bg-blue-800 hover:text-white transition-colors w-full h-auto"
        onClick={onToggleExpand}
      >
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          <span className="font-medium">検索</span>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </Button>

      {/* 検索フォーム（アコーディオン） */}
      {isExpanded && (
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="col-span-6 space-y-6">
              {/* フリーワード */}
              <div>
                <Label className="mb-2 block">フリーワード</Label>
                <Input
                  type="text"
                  value={formData.freeword}
                  onChange={(e) => onInputChange("freeword", e.target.value)}
                  placeholder="会社名、代表者名、免許番号等で検索"
                />
              </div>

              {/* 物件公開権限 */}
              <div>
                <Label className="mb-3 block">物件公開権限</Label>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="companyPermission-valid"
                      checked={formData.companyPermission.valid}
                      onCheckedChange={(checked) =>
                        onCheckboxChange("companyPermission", "valid", checked === true)
                      }
                    />
                    <Label htmlFor="companyPermission-valid" className="font-normal">
                      有効
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="companyPermission-invalid"
                      checked={formData.companyPermission.invalid}
                      onCheckedChange={(checked) =>
                        onCheckboxChange("companyPermission", "invalid", checked === true)
                      }
                    />
                    <Label htmlFor="companyPermission-invalid" className="font-normal">
                      無効
                    </Label>
                  </div>
                </div>
              </div>

              {/* アカウント種別 */}
              <div>
                <Label className="mb-3 block">アカウント種別</Label>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="accountType-free"
                      checked={formData.accountType.free}
                      onCheckedChange={(checked) =>
                        onCheckboxChange("accountType", "free", checked === true)
                      }
                    />
                    <Label htmlFor="accountType-free" className="font-normal">
                      無料アカウント
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="accountType-paid"
                      checked={formData.accountType.paid}
                      onCheckedChange={(checked) =>
                        onCheckboxChange("accountType", "paid", checked === true)
                      }
                    />
                    <Label htmlFor="accountType-paid" className="font-normal">
                      有料アカウント
                    </Label>
                  </div>
                </div>
              </div>

              {/* アカウント状態 */}
              <div>
                <Label className="mb-3 block">アカウント状態</Label>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="accountStatus-valid"
                      checked={formData.accountStatus.valid}
                      onCheckedChange={(checked) =>
                        onCheckboxChange("accountStatus", "valid", checked === true)
                      }
                    />
                    <Label htmlFor="accountStatus-valid" className="font-normal">
                      有効
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="accountStatus-invalid"
                      checked={formData.accountStatus.invalid}
                      onCheckedChange={(checked) =>
                        onCheckboxChange("accountStatus", "invalid", checked === true)
                      }
                    />
                    <Label htmlFor="accountStatus-invalid" className="font-normal">
                      無効
                    </Label>
                  </div>
                </div>
              </div>

              {/* 表示件数 */}
              <div>
                <Label className="mb-2 block">表示件数</Label>
                <Select
                  value={formData.displayCount}
                  onValueChange={(value) => onInputChange("displayCount", value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="表示件数" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">20件</SelectItem>
                    <SelectItem value="50">50件</SelectItem>
                    <SelectItem value="100">100件</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Column - Empty for spacing */}
            <div className="col-span-6" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Button
              variant="outline"
              onClick={onReset}
              className="px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              条件をリセット
            </Button>
            <Button
              onClick={onSearch}
              className="px-8 bg-gray-700 text-white hover:bg-gray-800 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              検索する
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
