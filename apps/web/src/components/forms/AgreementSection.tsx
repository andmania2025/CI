import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { QuestionFormData } from "@/hooks/useQuestionForm";
import type React from "react";

interface AgreementSectionProps {
  formData: {
    agreeToTerms: boolean;
  };
  errors: Record<string, string>;
  canCheckAgreement: boolean;
  onInputChange: (field: keyof QuestionFormData, value: string | boolean) => void;
  onOpenModal: (type: "terms" | "privacy") => void;
}

export const AgreementSection: React.FC<AgreementSectionProps> = ({
  formData,
  errors,
  canCheckAgreement,
  onInputChange,
  onOpenModal,
}) => {
  return (
    <section className="text-center bg-[#f2f7ff] rounded-md p-6 w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-center space-x-2">
        <Checkbox
          id="agreeToTerms"
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) => onInputChange("agreeToTerms", !!checked)}
          disabled={!canCheckAgreement}
          aria-invalid={!!errors.agreeToTerms}
        />
        <Label htmlFor="agreeToTerms" className="text-sm">
          <Button
            variant="link"
            type="button"
            onClick={() => onOpenModal("terms")}
            className="text-red-600 underline p-0 h-auto font-normal"
          >
            利用規約
          </Button>
          と
          <Button
            variant="link"
            type="button"
            onClick={() => onOpenModal("privacy")}
            className="text-red-600 underline p-0 h-auto font-normal"
          >
            プライバシーポリシー
          </Button>
          への同意が必要
        </Label>
      </div>
      {errors.agreeToTerms && <p className="text-red-500 text-sm mt-2">{errors.agreeToTerms}</p>}

      {!canCheckAgreement && (
        <p className="text-md font-bold mt-2">
          利用規約とプライバシーポリシーを確認してからチェックしてください
        </p>
      )}
    </section>
  );
};
