"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type React from "react";

interface CheckboxGroupFieldProps {
  label: string;
  required?: boolean;
  options: readonly string[];
  selectedValues: string[];
  onCheckedChange: (value: string, checked: boolean) => void;
  idPrefix: string;
  columns?: 2 | 3 | 4;
  error?: string;
}

/**
 * チェックボックスグループフィールドコンポーネント
 * 複数選択が必要なフォームフィールドで使用
 */
export const CheckboxGroupField: React.FC<CheckboxGroupFieldProps> = ({
  label,
  required = false,
  options,
  selectedValues,
  onCheckedChange,
  idPrefix,
  columns = 3,
  error,
}) => {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  return (
    <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-2">
      <Label className="text-foreground text-base font-medium flex items-center justify-between pr-2">
        {label}
        {required && (
          <Badge variant="destructive" className="ml-2">
            必須
          </Badge>
        )}
      </Label>
      <div className={`grid ${gridCols[columns]} gap-x-8 gap-y-2`}>
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`${idPrefix}-${option}`}
              checked={selectedValues.includes(option)}
              onCheckedChange={(checked) => onCheckedChange(option, !!checked)}
            />
            <Label htmlFor={`${idPrefix}-${option}`} className="text-sm">
              {option}
            </Label>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-2 col-span-2">{error}</p>}
    </div>
  );
};
