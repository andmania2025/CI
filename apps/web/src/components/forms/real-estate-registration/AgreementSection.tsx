"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type React from "react";

interface AgreementSectionProps {
  agreeToTerms: boolean;
  onAgreeChange: (checked: boolean) => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  canCheckAgreement: boolean;
  error?: string;
}

/**
 * 同意事項セクションコンポーネント
 * 利用規約・プライバシーポリシーへの同意を管理
 */
export const AgreementSection: React.FC<AgreementSectionProps> = ({
  agreeToTerms,
  onAgreeChange,
  onOpenTerms,
  onOpenPrivacy,
  canCheckAgreement,
  error,
}) => {
  return (
    <section className="text-center bg-[#f2f7ff] rounded-md p-6 w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-center space-x-2">
        <Checkbox
          id="agreeToTerms"
          checked={agreeToTerms}
          onCheckedChange={(checked) => onAgreeChange(!!checked)}
          disabled={!canCheckAgreement}
          aria-invalid={!!error}
        />
        <Label htmlFor="agreeToTerms" className="text-sm">
          <Button
            variant="link"
            type="button"
            onClick={onOpenTerms}
            className="text-red-600 underline p-0 h-auto font-normal"
          >
            利用規約
          </Button>
          と
          <Button
            variant="link"
            type="button"
            onClick={onOpenPrivacy}
            className="text-red-600 underline p-0 h-auto font-normal"
          >
            プライバシーポリシー
          </Button>
          への同意が必要
        </Label>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {!canCheckAgreement && (
        <p className="text-md font-bold mt-2">
          利用規約とプライバシーポリシーを確認してからチェックしてください
        </p>
      )}
    </section>
  );
};
