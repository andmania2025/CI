"use client";

import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import type React from "react";

// ============================================
// 共通Props型定義
// ============================================

interface BaseRowProps {
  label: string;
  isEditMode: boolean;
  className?: string;
}

interface TextRowProps extends BaseRowProps {
  value?: string;
  defaultValue: string;
  placeholder?: string;
}

interface NumberRowProps extends BaseRowProps {
  value?: number;
  defaultValue: number;
  unit: string;
  step?: string;
  formatValue?: (val: number) => string;
}

interface SelectRowProps extends BaseRowProps {
  value?: string;
  defaultValue: string;
  options: { value: string; label: string }[];
}

interface BooleanSelectRowProps extends BaseRowProps {
  value?: boolean;
  trueLabel?: string;
  falseLabel?: string;
  options: { value: string; label: string }[];
}

interface DateRowProps extends BaseRowProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
}

// ============================================
// スタイル定数
// ============================================

const HEAD_CLASS = "w-1/3 align-middle pt-4 sticky left-0 bg-background pl-0";
const CELL_CLASS = "pl-6 py-4";
const INPUT_NUMBER_CLASS =
  "w-40 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]";

// ============================================
// テキスト入力行
// ============================================

export const TextInputRow: React.FC<TextRowProps> = ({
  label,
  isEditMode,
  value,
  defaultValue,
  placeholder,
}) => (
  <TableRow>
    <TableHead className={HEAD_CLASS}>{label}</TableHead>
    <TableCell className={CELL_CLASS}>
      {isEditMode ? (
        <Input
          defaultValue={value ?? defaultValue}
          placeholder={placeholder}
          className="max-w-md"
        />
      ) : (
        (value ?? defaultValue)
      )}
    </TableCell>
  </TableRow>
);

// ============================================
// 数値入力行（単位付き）
// ============================================

export const NumberInputRow: React.FC<NumberRowProps> = ({
  label,
  isEditMode,
  value,
  defaultValue,
  unit,
  step,
  formatValue,
}) => {
  const displayValue = value ?? defaultValue;
  const formattedDisplay = formatValue
    ? formatValue(displayValue)
    : `${displayValue.toLocaleString()}${unit}`;

  return (
    <TableRow>
      <TableHead className={HEAD_CLASS}>{label}</TableHead>
      <TableCell className={CELL_CLASS}>
        {isEditMode ? (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              step={step}
              defaultValue={displayValue}
              className={INPUT_NUMBER_CLASS}
            />
            <span className="text-sm text-gray-500">{unit}</span>
          </div>
        ) : (
          formattedDisplay
        )}
      </TableCell>
    </TableRow>
  );
};

// ============================================
// 金額入力行（円単位）
// ============================================

interface PriceRowProps extends BaseRowProps {
  value?: number;
  defaultValue: number;
  noValueText?: string;
}

export const PriceInputRow: React.FC<PriceRowProps> = ({
  label,
  isEditMode,
  value,
  defaultValue,
  noValueText = "なし",
}) => {
  const displayValue = value ?? defaultValue;

  return (
    <TableRow>
      <TableHead className={HEAD_CLASS}>{label}</TableHead>
      <TableCell className={CELL_CLASS}>
        {isEditMode ? (
          <div className="flex items-center gap-2">
            <Input type="number" defaultValue={displayValue} className={INPUT_NUMBER_CLASS} />
            <span className="text-sm text-gray-500">円</span>
          </div>
        ) : displayValue > 0 ? (
          `${displayValue.toLocaleString()}円`
        ) : (
          noValueText
        )}
      </TableCell>
    </TableRow>
  );
};

// ============================================
// 面積入力行（㎡単位）
// ============================================

interface AreaRowProps extends BaseRowProps {
  value?: number;
  defaultValue: number;
}

export const AreaInputRow: React.FC<AreaRowProps> = ({
  label,
  isEditMode,
  value,
  defaultValue,
}) => {
  const displayValue = value ?? defaultValue;

  return (
    <TableRow>
      <TableHead className={HEAD_CLASS}>{label}</TableHead>
      <TableCell className={CELL_CLASS}>
        {isEditMode ? (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              step="0.01"
              defaultValue={displayValue}
              className={INPUT_NUMBER_CLASS}
            />
            <span className="text-sm text-gray-500">㎡</span>
          </div>
        ) : (
          `${displayValue.toFixed(2)}㎡`
        )}
      </TableCell>
    </TableRow>
  );
};

// ============================================
// パーセント入力行
// ============================================

interface PercentRowProps extends BaseRowProps {
  value?: number;
  defaultValue: number;
  noValueText?: string;
}

export const PercentInputRow: React.FC<PercentRowProps> = ({
  label,
  isEditMode,
  value,
  defaultValue,
  noValueText = "未設定",
}) => {
  const displayValue = value ?? defaultValue;

  return (
    <TableRow>
      <TableHead className={HEAD_CLASS}>{label}</TableHead>
      <TableCell className={CELL_CLASS}>
        {isEditMode ? (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              step="0.01"
              defaultValue={displayValue}
              className={INPUT_NUMBER_CLASS}
            />
            <span className="text-sm text-gray-500">%</span>
          </div>
        ) : displayValue > 0 ? (
          `${displayValue}%`
        ) : (
          noValueText
        )}
      </TableCell>
    </TableRow>
  );
};

// ============================================
// セレクト入力行
// ============================================

export const SelectInputRow: React.FC<SelectRowProps> = ({
  label,
  isEditMode,
  value,
  defaultValue,
  options,
}) => {
  const displayValue = value ?? defaultValue;

  return (
    <TableRow>
      <TableHead className={HEAD_CLASS}>{label}</TableHead>
      <TableCell className={CELL_CLASS}>
        {isEditMode ? (
          <Select defaultValue={displayValue}>
            <SelectTrigger className="max-w-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          displayValue
        )}
      </TableCell>
    </TableRow>
  );
};

// ============================================
// Boolean セレクト入力行
// ============================================

export const BooleanSelectRow: React.FC<BooleanSelectRowProps> = ({
  label,
  isEditMode,
  value,
  trueLabel = "可",
  falseLabel = "不可",
  options,
}) => {
  const displayValue = value ? trueLabel : falseLabel;

  return (
    <TableRow>
      <TableHead className={HEAD_CLASS}>{label}</TableHead>
      <TableCell className={CELL_CLASS}>
        {isEditMode ? (
          <Select defaultValue={displayValue}>
            <SelectTrigger className="max-w-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          displayValue
        )}
      </TableCell>
    </TableRow>
  );
};

// ============================================
// 日付入力行
// ============================================

export const DateInputRow: React.FC<DateRowProps> = ({
  label,
  isEditMode,
  value,
  onChange,
  placeholder,
}) => (
  <TableRow>
    <TableHead className={HEAD_CLASS}>{label}</TableHead>
    <TableCell className={CELL_CLASS}>
      {isEditMode ? (
        <DatePicker
          value={value}
          onChange={onChange}
          placeholder={placeholder || `${label}を選択`}
          className="max-w-xs"
        />
      ) : (
        value?.toISOString().split("T")[0] || placeholder || "未設定"
      )}
    </TableCell>
  </TableRow>
);

// ============================================
// オプション定義のエクスポート
// ============================================

export const PROPERTY_TYPE_OPTIONS = [
  { value: "賃貸マンション", label: "賃貸マンション" },
  { value: "賃貸アパート", label: "賃貸アパート" },
  { value: "賃貸戸建て", label: "賃貸戸建て" },
  { value: "売買マンション", label: "売買マンション" },
  { value: "売買戸建て", label: "売買戸建て" },
  { value: "売買土地", label: "売買土地" },
];

export const BUILDING_STRUCTURE_OPTIONS = [
  { value: "木造", label: "木造" },
  { value: "鉄骨造", label: "鉄骨造" },
  { value: "RC造", label: "RC造" },
  { value: "SRC造", label: "SRC造" },
  { value: "その他", label: "その他" },
];

export const CONTRACT_PERIOD_OPTIONS = [
  { value: "1年", label: "1年" },
  { value: "2年", label: "2年" },
  { value: "3年", label: "3年" },
  { value: "期間定めなし", label: "期間定めなし" },
];

export const PET_OPTIONS = [
  { value: "可", label: "可" },
  { value: "不可", label: "不可" },
  { value: "相談", label: "相談" },
];

export const MANAGEMENT_TYPE_OPTIONS = [
  { value: "管理会社", label: "管理会社" },
  { value: "自主管理", label: "自主管理" },
  { value: "その他", label: "その他" },
];

export const RENOVATION_OPTIONS = [
  { value: "なし", label: "なし" },
  { value: "あり", label: "あり" },
  { value: "部分リフォーム", label: "部分リフォーム" },
  { value: "全面リフォーム", label: "全面リフォーム" },
];

export const DIRECTION_OPTIONS = [
  { value: "南", label: "南" },
  { value: "北", label: "北" },
  { value: "東", label: "東" },
  { value: "西", label: "西" },
  { value: "南東", label: "南東" },
  { value: "南西", label: "南西" },
  { value: "北東", label: "北東" },
  { value: "北西", label: "北西" },
];

export const LAND_RIGHTS_OPTIONS = [
  { value: "所有権", label: "所有権" },
  { value: "借地権", label: "借地権" },
  { value: "地上権", label: "地上権" },
  { value: "その他", label: "その他" },
];

export const CURRENT_STATUS_OPTIONS = [
  { value: "更地", label: "更地" },
  { value: "建物あり", label: "建物あり" },
  { value: "工事中", label: "工事中" },
  { value: "完成済み", label: "完成済み" },
];

export const CITY_PLANNING_OPTIONS = [
  { value: "市街化区域", label: "市街化区域" },
  { value: "市街化調整区域", label: "市街化調整区域" },
  { value: "非線引都市計画区域", label: "非線引都市計画区域" },
  { value: "準都市計画区域", label: "準都市計画区域" },
];

export const LAND_USE_OPTIONS = [
  { value: "宅地", label: "宅地" },
  { value: "田", label: "田" },
  { value: "畑", label: "畑" },
  { value: "山林", label: "山林" },
  { value: "原野", label: "原野" },
  { value: "その他", label: "その他" },
];

export const ZONING_OPTIONS = [
  { value: "第一種住居地域", label: "第一種住居地域" },
  { value: "第二種住居地域", label: "第二種住居地域" },
  { value: "第一種中高層住居専用地域", label: "第一種中高層住居専用地域" },
  { value: "第二種中高層住居専用地域", label: "第二種中高層住居専用地域" },
  { value: "第一種住居専用地域", label: "第一種住居専用地域" },
  { value: "第二種住居専用地域", label: "第二種住居専用地域" },
  { value: "準住居地域", label: "準住居地域" },
  { value: "近隣商業地域", label: "近隣商業地域" },
  { value: "商業地域", label: "商業地域" },
  { value: "準工業地域", label: "準工業地域" },
  { value: "工業地域", label: "工業地域" },
  { value: "工業専用地域", label: "工業専用地域" },
];

export const EASEMENT_OPTIONS = [
  { value: "なし", label: "なし" },
  { value: "あり", label: "あり" },
  { value: "通行地役権", label: "通行地役権" },
  { value: "その他", label: "その他" },
];

export const LAND_NOTIFICATION_OPTIONS = [
  { value: "不要", label: "不要" },
  { value: "必要", label: "必要" },
  { value: "届出済み", label: "届出済み" },
];

export const UTILITY_OPTIONS = [
  { value: "あり", label: "あり" },
  { value: "なし", label: "なし" },
  { value: "計画中", label: "計画中" },
];

export const GAS_OPTIONS = [
  { value: "都市ガス", label: "都市ガス" },
  { value: "プロパンガス", label: "プロパンガス" },
  { value: "なし", label: "なし" },
  { value: "計画中", label: "計画中" },
];
