import type { Property, PropertyImage } from "@/types/models";

export type { PropertyImage };

export interface PropertyDetailTabsProps {
  property: Property;
  isEditMode?: boolean;
}
