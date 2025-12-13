import type { Property, PropertyImage } from "@/types/models";

export type { Property, PropertyImage };

// 検索フォームの型定義
export interface PropertyFormData {
  freeword: string;
  realEstateCompany: string;
  area: string;
  prefecture: string;
  city: string;
  ward: string;
  route: string;
  station: string;
  floorPlan: string;
  propertyType: string;
  completionSale: {
    completion: boolean;
    sale: boolean;
  };
  registrationStatus: {
    registered: boolean;
    underReview: boolean;
  };
  publicationStatus: {
    public: boolean;
    private: boolean;
  };
  buildingStatus: {
    existing: boolean;
    underConstruction: boolean;
  };
  publicationSettings: {
    notPublished: boolean;
    public: boolean;
    private: boolean;
  };
  nextUpdateDate: boolean;
  displayCount: string;
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
