import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { QuestionFormData } from "@/hooks/useQuestionForm";
import {
  PROPERTY_FEATURES,
  QUESTION_CATEGORIES,
  REAL_ESTATE_TYPES,
} from "@/lib/constants/realEstate";
import type React from "react";

interface QuestionCategorySectionProps {
  formData: QuestionFormData;
  errors: Record<string, string>;
  onInputChange: (field: keyof QuestionFormData, value: string | boolean) => void;
}

export const QuestionCategorySection: React.FC<QuestionCategorySectionProps> = ({
  formData,
  errors,
  onInputChange,
}) => {
  return (
    <section>
      <div className="space-y-4">
        {/* 質問カテゴリ */}
        <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-4">
          <Label className="text-foreground text-base font-medium shrink-0 flex items-center justify-between pr-2">
            質問カテゴリ
            <Badge variant="destructive" className="ml-2">
              必須
            </Badge>
          </Label>
          <div className="w-full max-w-[720px]">
            <Select
              value={formData.questionCategory}
              onValueChange={(value) => onInputChange("questionCategory", value)}
            >
              <SelectTrigger className={cn("h-10", errors.questionCategory && "border-red-500")}>
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                {QUESTION_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.questionCategory && (
              <p className="text-red-500 text-sm mt-1">{errors.questionCategory}</p>
            )}
          </div>
        </div>

        {/* 不動産種別 */}
        <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-4">
          <Label className="text-foreground text-base font-medium shrink-0 flex items-center justify-between pr-2">
            不動産種別
            <Badge variant="destructive" className="ml-2">
              必須
            </Badge>
          </Label>
          <div className="w-full max-w-[720px]">
            <Select
              value={formData.realEstateType}
              onValueChange={(value) => onInputChange("realEstateType", value)}
            >
              <SelectTrigger className={cn("h-10", errors.realEstateType && "border-red-500")}>
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                {REAL_ESTATE_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.realEstateType && (
              <p className="text-red-500 text-sm mt-1">{errors.realEstateType}</p>
            )}
          </div>
        </div>

        {/* 物件特徴 */}
        <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-4">
          <Label className="text-foreground text-base font-medium shrink-0 flex items-center justify-between pr-2">
            物件特徴
            <Badge variant="destructive" className="ml-2">
              必須
            </Badge>
          </Label>
          <div className="w-full max-w-[720px]">
            <Select
              value={formData.propertyFeature}
              onValueChange={(value) => onInputChange("propertyFeature", value)}
            >
              <SelectTrigger className={cn("h-10", errors.propertyFeature && "border-red-500")}>
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_FEATURES.map((feature) => (
                  <SelectItem key={feature} value={feature}>
                    {feature}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.propertyFeature && (
              <p className="text-red-500 text-sm mt-1">{errors.propertyFeature}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
