import type { Property, PropertyImage } from "@/types/models";

export type { Property, PropertyImage };

// 不動産業者データの型定義
export interface Realtor {
  id: string;
  title: string;
  representativeName?: string;
  contactPerson?: string;
  publicationStatus: string;
  updateDate: string;
  nextUpdateDate: string;
  inquiryCount: number;
  actions: string;
  accountType?: "paid" | "free"; // 有料または無料
}

// 検索フォームの型定義
export interface RealtorFormData {
  freeword: string;
  propertyPublicationPermission: string;
  paidAccount: string;
  status: string;
  displayCount: string;
}

// コンポーネントのProps型定義
export interface RealtorTableProps {
  realtors: Realtor[];
  selectedRealtors: string[];
  selectAll: boolean;
  onSelectRealtor: (id: string) => void;
  onSelectAll: (selected: boolean) => void;
  onDuplicateRealtor?: (realtorId: string) => void;
}

export interface RealtorSearchDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: RealtorFormData;
  onFormDataChange: (field: string, value: string) => void;
  onSearch: () => void;
  onReset: () => void;
}

export interface RealtorActionsProps {
  selectedRealtors: string[];
  onSearch: () => void;
  onDownload: () => void;
  onUpload: () => void;
  onBulkDelete: () => void;
}

export interface RealtorDetailTabsProps {
  realtor: Realtor;
  isEditMode?: boolean;
}
