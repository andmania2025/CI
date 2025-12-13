import { cn, dropdownStyles } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useCallback, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface PropertySearchDropdownProps {
  onSelect?: (value: string) => void;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
}

// 物件タイプの定数
const PROPERTY_TYPES = [
  "マンション",
  "一戸建て",
  "土地",
  "店舗・事務所・倉庫・工場",
  "一棟ビル・一棟マンション",
  "アパート",
  "その他（宿泊施設等）",
] as const;

// ルーティングマップ
const ROUTE_MAP: Record<string, string> = {
  マンション: "/mansion-search",
} as const;

export const PropertySearchDropdown = React.memo<PropertySearchDropdownProps>(
  ({ onSelect, defaultValue = "売買物件検索", className = "", disabled = false }) => {
    const router = useRouter();
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    // 選択処理
    const handleSelect = useCallback(
      (value: string) => {
        setSelectedValue(value);
        onSelect?.(value);

        // ルーティング処理
        const route = ROUTE_MAP[value];
        if (route) {
          router.push(route);
        }
      },
      [onSelect, router]
    );

    // スタイルクラスの計算
    const triggerClasses = useMemo(
      () =>
        cn(
          "w-full h-[45px] rounded flex items-center justify-between px-3",
          "cursor-pointer hover:opacity-80 transition-colors",
          "text-white text-sm font-medium",
          "bg-[#003992] border-0 outline-none",
          "focus:outline-none focus:ring-0 focus:ring-offset-0",
          "focus-visible:outline-none focus-visible:ring-0",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        ),
      [className]
    );

    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          className={triggerClasses}
          onFocus={dropdownStyles.handleFocusBlur}
          onBlur={dropdownStyles.handleFocusBlur}
          disabled={disabled}
          aria-label="物件タイプを選択"
        >
          <span className="text-white text-sm font-medium truncate">{selectedValue}</span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-white transition-transform duration-200",
              disabled && "opacity-50"
            )}
            aria-hidden="true"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-[446px] bg-white border border-gray-200 shadow-lg rounded-md p-0 max-h-60 overflow-y-auto"
          align="start"
          sideOffset={4}
        >
          {PROPERTY_TYPES.map((type) => (
            <DropdownMenuItem
              key={type}
              className="px-4 py-3 text-sm text-black hover:bg-blue-50 focus:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 focus:outline-none"
              onClick={() => handleSelect(type)}
            >
              {type}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

PropertySearchDropdown.displayName = "PropertySearchDropdown";
