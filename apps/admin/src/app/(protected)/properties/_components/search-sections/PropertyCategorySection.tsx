import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type React from "react";

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

export const PropertyCategorySection: React.FC<PropertyCategorySectionProps> = ({
  propertyCategory,
  onCheckboxChange,
}) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">物件カテゴリ</Label>
      <div className="grid grid-cols-4 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <div key={num} className="flex items-center space-x-2">
            <Checkbox
              id={`type${num}`}
              checked={propertyCategory[`type${num}` as keyof typeof propertyCategory]}
              onCheckedChange={(checked: boolean) =>
                onCheckboxChange("propertyCategory", `type${num}`, checked)
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
