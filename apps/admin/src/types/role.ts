export type UserRole = "admin" | "sales" | "user";

export interface RolePermissions {
  canViewDashboard: boolean;
  canViewProperties: boolean;
  canViewRealtors: boolean;
  canViewMembers: boolean;
  canViewSettings: boolean;
  canViewSiteInquiries: boolean;
  canViewUserPosts: boolean;
  canViewContent: boolean;
  canViewFileBox: boolean;
  canViewMail: boolean;
  canViewPropertyInquiries: boolean;
  canViewRealtorInquiries: boolean;
  canViewBulkSettings: boolean;
  canViewRealtorReplies: boolean;
  canViewAreaSettings: boolean;
  canViewPropertyTypeSettings: boolean;
  canViewPropertyCategorySettings: boolean;
  canViewFloorPlanSettings: boolean;
  canViewFeatureSettings: boolean;
  canViewLoginInfo: boolean;
  canViewSystemSettings: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  admin: {
    canViewDashboard: true,
    canViewProperties: true,
    canViewRealtors: true,
    canViewMembers: true,
    canViewSettings: true,
    canViewSiteInquiries: true,
    canViewUserPosts: true,
    canViewContent: true,
    canViewFileBox: true,
    canViewMail: true,
    canViewPropertyInquiries: true,
    canViewRealtorInquiries: true,
    canViewBulkSettings: true,
    canViewRealtorReplies: true,
    canViewAreaSettings: true,
    canViewPropertyTypeSettings: true,
    canViewPropertyCategorySettings: true,
    canViewFloorPlanSettings: true,
    canViewFeatureSettings: true,
    canViewLoginInfo: true,
    canViewSystemSettings: true,
  },
  sales: {
    canViewDashboard: true,
    canViewProperties: true,
    canViewRealtors: false,
    canViewMembers: false,
    canViewSettings: false,
    canViewSiteInquiries: true,
    canViewUserPosts: true,
    canViewContent: false,
    canViewFileBox: false,
    canViewMail: true,
    canViewPropertyInquiries: true,
    canViewRealtorInquiries: true,
    canViewBulkSettings: false,
    canViewRealtorReplies: true,
    canViewAreaSettings: false,
    canViewPropertyTypeSettings: false,
    canViewPropertyCategorySettings: false,
    canViewFloorPlanSettings: false,
    canViewFeatureSettings: false,
    canViewLoginInfo: true,
    canViewSystemSettings: false,
  },
  user: {
    canViewDashboard: true,
    canViewProperties: false,
    canViewRealtors: false,
    canViewMembers: false,
    canViewSettings: false,
    canViewSiteInquiries: false,
    canViewUserPosts: false,
    canViewContent: false,
    canViewFileBox: false,
    canViewMail: false,
    canViewPropertyInquiries: false,
    canViewRealtorInquiries: false,
    canViewBulkSettings: false,
    canViewRealtorReplies: false,
    canViewAreaSettings: false,
    canViewPropertyTypeSettings: false,
    canViewPropertyCategorySettings: false,
    canViewFloorPlanSettings: false,
    canViewFeatureSettings: false,
    canViewLoginInfo: true,
    canViewSystemSettings: false,
  },
};
