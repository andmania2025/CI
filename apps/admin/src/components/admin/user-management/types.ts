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
