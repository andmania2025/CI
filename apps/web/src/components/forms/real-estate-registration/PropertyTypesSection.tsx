"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HANDLING_TYPES, PROPERTY_FEATURES, REAL_ESTATE_TYPES } from "@/lib/constants/realEstate";
import type { RealEstateAgentFormData } from "@/schemas/realEstateAgentSchema";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import { CheckboxGroupField } from "./CheckboxGroupField";

interface PropertyTypesSectionProps {
  control: Control<RealEstateAgentFormData>;
  errors: FieldErrors<RealEstateAgentFormData>;
  onArrayFieldChange: (
    fieldName: keyof RealEstateAgentFormData,
    value: string,
    checked: boolean,
    currentValues: string[]
  ) => void;
}

/**
 * 取扱物件情報セクションコンポーネント
 * 取扱物件種別、取扱形態、不動産種別、物件特徴を含む
 */
export const PropertyTypesSection = ({
  control,
  errors,
  onArrayFieldChange,
}: PropertyTypesSectionProps) => {
  return (
    <section>
      <div className="space-y-4">
        {/* 取扱物件種別 */}
        <Controller
          name="propertyTypes"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-2">
              <Label className="text-foreground text-base font-medium flex items-center justify-between pr-2">
                取扱物件種別
                <Badge variant="destructive" className="ml-2">
                  必須
                </Badge>
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2">
                {["売買不動産", "その他", "賃貸不動産", "投資用・事業用不動産"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`propertyType-${type}`}
                      checked={field.value.includes(type)}
                      onCheckedChange={(checked) =>
                        onArrayFieldChange("propertyTypes", type, !!checked, field.value)
                      }
                    />
                    <Label htmlFor={`propertyType-${type}`} className="text-sm">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.propertyTypes && (
                <p className="text-red-500 text-sm mt-2">{errors.propertyTypes.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          name="handlingTypes"
          control={control}
          render={({ field }) => (
            <CheckboxGroupField
              label="取扱形態"
              required
              options={HANDLING_TYPES}
              selectedValues={field.value}
              onCheckedChange={(value, checked) =>
                onArrayFieldChange("handlingTypes", value, checked, field.value)
              }
              idPrefix="handlingForm"
              error={errors.handlingTypes?.message}
            />
          )}
        />

        <Controller
          name="realEstateTypes"
          control={control}
          render={({ field }) => (
            <CheckboxGroupField
              label="不動産種別"
              required
              options={REAL_ESTATE_TYPES}
              selectedValues={field.value}
              onCheckedChange={(value, checked) =>
                onArrayFieldChange("realEstateTypes", value, checked, field.value)
              }
              idPrefix="propertyType"
              error={errors.realEstateTypes?.message}
            />
          )}
        />

        <Controller
          name="propertyFeatures"
          control={control}
          render={({ field }) => (
            <CheckboxGroupField
              label="物件特徴"
              required
              options={PROPERTY_FEATURES}
              selectedValues={field.value}
              onCheckedChange={(value, checked) =>
                onArrayFieldChange("propertyFeatures", value, checked, field.value)
              }
              idPrefix="propertyFeature"
              error={errors.propertyFeatures?.message}
            />
          )}
        />
      </div>
    </section>
  );
};
