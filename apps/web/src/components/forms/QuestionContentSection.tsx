import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { QuestionFormData } from "@/hooks/useQuestionForm";
import { cn } from "@/lib/utils";
import type React from "react";

interface QuestionContentSectionProps {
  formData: QuestionFormData;
  errors: Record<string, string>;
  onInputChange: (
    field: keyof QuestionFormData,
    value: string | boolean,
  ) => void;
}

export const QuestionContentSection: React.FC<QuestionContentSectionProps> = ({
  formData,
  errors,
  onInputChange,
}) => {
  return (
    <section>
      <div className="space-y-4">
        {/* 質問内容 */}
        <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-4">
          <Label
            htmlFor="content"
            className="text-foreground text-base font-medium shrink-0 flex items-center justify-between pr-2"
          >
            質問内容
            <Badge variant="destructive" className="ml-2">
              必須
            </Badge>
          </Label>
          <div className="w-full max-w-[720px]">
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => onInputChange("content", e.target.value)}
              placeholder="質問内容を入力してください"
              required
              aria-invalid={!!errors.content}
              className={cn("w-full", errors.content && "border-red-500")}
              rows={6}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
