import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { QuestionFormData } from "@/hooks/useQuestionForm";
import { cn } from "@/lib/utils";
import type React from "react";

interface PersonalInfoSectionProps {
  formData: QuestionFormData;
  errors: Record<string, string>;
  onInputChange: (
    field: keyof QuestionFormData,
    value: string | boolean,
  ) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  errors,
  onInputChange,
}) => {
  return (
    <section>
      <div className="space-y-4">
        {/* ニックネーム */}
        <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-4">
          <Label
            htmlFor="nickname"
            className="text-foreground text-base font-medium shrink-0 flex items-center justify-between pr-2"
          >
            ニックネーム
            <Badge variant="destructive" className="ml-2">
              必須
            </Badge>
          </Label>
          <div className="w-full max-w-[720px]">
            <Input
              id="nickname"
              value={formData.nickname}
              onChange={(e) => onInputChange("nickname", e.target.value)}
              placeholder="例）ウチカツくん"
              required
              aria-invalid={!!errors.nickname}
              className={cn("w-full", errors.nickname && "border-red-500")}
            />
            {errors.nickname && (
              <p className="text-red-500 text-sm mt-1">{errors.nickname}</p>
            )}
          </div>
        </div>

        {/* メールアドレス */}
        <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-4">
          <Label
            htmlFor="email"
            className="text-foreground text-base font-medium shrink-0 flex items-center justify-between pr-2"
          >
            メールアドレス
            <Badge variant="destructive" className="ml-2">
              必須
            </Badge>
          </Label>
          <div className="w-full max-w-[720px]">
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => onInputChange("email", e.target.value)}
              placeholder="例）nihon@dream-plan.com"
              required
              aria-invalid={!!errors.email}
              className={cn("w-full", errors.email && "border-red-500")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
