import type { CheckedState } from "@radix-ui/react-checkbox";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { JSX } from "react";

const PROPERTY_CATEGORY_TYPES = Array.from({ length: 8 }, (_, index) => index + 1);

interface PropertyCategorySectionProps {
  propertyCategory: {
    type1: boolean;
    type2: boolean;
    type3: boolean;
    type4: boolean;
    type5: boolean;
    type6: boolean;
    type7: boolean;
    type8: boolean;
  };
  onCheckboxChange: (parentField: string, childField: string, checked: boolean) => void;
}

export const PropertyCategorySection = ({
  propertyCategory,
  onCheckboxChange,
}: PropertyCategorySectionProps): JSX.Element => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">物件カテゴリ</Label>
      <div className="grid grid-cols-4 gap-3">
        {PROPERTY_CATEGORY_TYPES.map((num) => (
          <div key={num} className="flex items-center space-x-2">
            <Checkbox
              id={`type${num}`}
              checked={propertyCategory[`type${num}` as keyof typeof propertyCategory]}
              onCheckedChange={(checked: CheckedState) =>
                onCheckboxChange("propertyCategory", `type${num}`, checked === true)
              }
            />
            <Label htmlFor={`type${num}`} className="text-sm">
              タイプ{num}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
