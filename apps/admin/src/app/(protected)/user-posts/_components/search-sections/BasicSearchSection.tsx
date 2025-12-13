import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type React from "react";
import type { SearchOption } from "../../_data/types";

interface BasicSearchSectionProps {
  freeword: string;
  onFreewordChange: (value: string) => void;
  realEstateCompanies: SearchOption[];
  areas: SearchOption[];
  area: string;
  onAreaChange: (value: string) => void;
}

export const BasicSearchSection: React.FC<BasicSearchSectionProps> = ({
  freeword,
  onFreewordChange,
  realEstateCompanies,
  areas,
  area,
  onAreaChange,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* フリーワード */}
      <div className="space-y-8">
        <Label className="text-sm font-medium mb-6">フリーワード</Label>
        <div className="mt-2">
          <Input
            type="text"
            value={freeword}
            onChange={(e) => onFreewordChange(e.target.value)}
            placeholder="フリーワードを入力"
            className="w-full focus:outline-none focus:ring-0 focus:border-gray-300"
          />
        </div>
      </div>

      {/* 不動産業者名 */}
      <div className="space-y-8">
        <Label className="text-sm font-medium mb-6">不動産業者名</Label>
        <div className="mt-2">
          <Select>
            <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:border-gray-300">
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              side="bottom"
              align="start"
              className="max-h-[200px] overflow-y-auto"
            >
              <SelectItem value="none">選択してください</SelectItem>
              {realEstateCompanies.map((company) => (
                <SelectItem key={company.value} value={company.value}>
                  {company.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* エリア */}
      <div className="space-y-8">
        <Label htmlFor="area" className="text-sm font-medium mb-6">
          エリア
        </Label>
        <div className="mt-2">
          <Select value={area} onValueChange={onAreaChange}>
            <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:border-gray-300">
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              side="bottom"
              align="start"
              className="max-h-[200px] overflow-y-auto"
            >
              {areas.map((area) => (
                <SelectItem key={area.value} value={area.value}>
                  {area.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
