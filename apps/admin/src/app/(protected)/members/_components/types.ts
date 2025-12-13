import type { Property, PropertyImage } from "@/types/models";

export type { Property, PropertyImage };

// 検索フォームの型定義
export interface PropertyFormData {
  freeword: string;
  registrationDate: string;
  accountStatus: {
    active: boolean;
    cancelled: boolean;
    invalid: boolean;
  };
  displayCount: string;
}

// 会員データの型定義
export interface Member {
  id: string;
  name: string; // 氏名
  gender?: "male" | "female" | "other"; // 性別
  dateOfBirth?: string; // 生年月日
  email?: string; // メールアドレス
  phone?: string; // 電話番号
  fax?: string; // FAX番号
  postalCode?: string; // 郵便番号
  address?: string; // 住所
  password?: string; // パスワード
  accountStatus?: "active" | "cancelled" | "invalid"; // アカウント状態
}

// 会員詳細タブのProps型定義
export interface MemberDetailTabsProps {
  member: Member;
  isEditMode?: boolean;
}

// コンポーネントのProps型定義
export interface PropertyTableProps {
  properties: Property[];
  selectedProperties: string[];
  selectAll: boolean;
  onSelectProperty: (id: string) => void;
  onSelectAll: (selected: boolean) => void;
  onDuplicateProperty?: (propertyId: string) => void;
}

export interface PropertySearchDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: PropertyFormData;
  onFormDataChange: (field: string, value: string) => void;
  onCheckboxChange: (parentField: string, childField: string, checked: boolean) => void;
  onSearch: () => void;
  onReset: () => void;
}

export interface PropertyActionsProps {
  selectedProperties: string[];
  onSearch: () => void;
  onDownload: () => void;
  onUpload: () => void;
  onBulkDelete: () => void;
}
