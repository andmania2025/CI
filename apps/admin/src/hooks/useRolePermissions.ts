import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROLE_PERMISSIONS, type RolePermissions, type UserRole } from "@/types/role";

export const useRolePermissions = (): RolePermissions => {
  const { user } = useAuth();
  const role = (user?.role as UserRole) || "user";

  return ROLE_PERMISSIONS[role];
};

export const useCanView = (permission: keyof RolePermissions): boolean => {
  const permissions = useRolePermissions();
  return permissions[permission];
};
