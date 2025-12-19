export interface Realtor {
  id: string;
  companyName: string;
  representative: string;
  licenseNumber: string;
  accountType: string;
  status: string;
  registrationDate: string;
  lastLogin: string;
  propertyCount: number;
}

export interface RealtorFormData {
  freeword: string;
  companyPermission: {
    valid: boolean;
    invalid: boolean;
  };
  accountType: {
    free: boolean;
    paid: boolean;
  };
  accountStatus: {
    valid: boolean;
    invalid: boolean;
  };
  displayCount: string;
}

// RealtorAnswerManagement 用の型定義
export interface RealtorAnswer {
  id: string;
  answerDate: string;
  company: string;
  representative: string;
  questionTitle: string;
}

export interface RealtorAnswerFormData {
  freeword: string;
  realEstateCompany: string;
  questionType: string;
  questionCategory: string;
  questionCategoryGeneral: string;
  publicStatus: {
    public: boolean;
    nonPublic: boolean;
  };
  answerDateFrom: string;
  answerDateTo: string;
  displayCount: string;
}
