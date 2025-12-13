"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type React from "react";

interface TextInputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  type?: "text" | "email" | "tel";
  maxLength?: number;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  helperText?: string;
}

/**
 * テキスト入力フィールドコンポーネント
 * フォームのテキスト入力に使用
 */
export const TextInputField: React.FC<TextInputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  type = "text",
  maxLength,
  disabled = false,
  className,
  inputClassName,
  helperText,
}) => {
  return (
    <div className={cn("grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-4", className)}>
      <Label
        htmlFor={id}
        className="text-foreground text-base font-medium shrink-0 flex items-center justify-between pr-2"
      >
        <span className="whitespace-nowrap">{label}</span>
        {required && (
          <Badge variant="destructive" className="ml-2">
            必須
          </Badge>
        )}
      </Label>
      <div className="w-full">
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          aria-invalid={!!error}
          disabled={disabled}
          maxLength={maxLength}
          className={cn("w-full", error && "border-red-500", inputClassName)}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {helperText && <p className="text-blue-500 text-sm mt-1">{helperText}</p>}
      </div>
    </div>
  );
};
