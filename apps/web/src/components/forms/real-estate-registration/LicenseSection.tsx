"use client";

import type { RealEstateAgentFormData } from "@/schemas/realEstateAgentSchema";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import { TextInputField } from "./TextInputField";

interface LicenseSectionProps {
  control: Control<RealEstateAgentFormData>;
  errors: FieldErrors<RealEstateAgentFormData>;
}

/**
 * 免許・所属情報セクションコンポーネント
 * 免許番号、所属協会、公正取引協議会加盟状況を含む
 */
export const LicenseSection = ({ control, errors }: LicenseSectionProps) => {
  return (
    <section>
      <div className="space-y-4">
        <Controller
          name="licenseNumber"
          control={control}
          render={({ field }) => (
            <TextInputField
              id="licenseNumber"
              label="免許番号"
              value={field.value}
              onChange={field.onChange}
              placeholder="免許番号を入力してください"
              required
              error={errors.licenseNumber?.message}
              inputClassName="max-w-[720px] h-10"
            />
          )}
        />
        <Controller
          name="associationMembership"
          control={control}
          render={({ field }) => (
            <TextInputField
              id="associationMembership"
              label="所属協会"
              value={field.value}
              onChange={field.onChange}
              placeholder="供託の場合などは「供託」「未加入」等を入力してください"
              required
              error={errors.associationMembership?.message}
              inputClassName="max-w-[720px] h-10"
            />
          )}
        />
        <Controller
          name="fairTradeMembership"
          control={control}
          render={({ field }) => (
            <TextInputField
              id="fairTradeMembership"
              label="公正取引協議会加盟状況"
              value={field.value}
              onChange={field.onChange}
              placeholder="例) 「公益社団法人首都圏不動産公正取引協議会」「未加入」等を入力してください"
              required
              error={errors.fairTradeMembership?.message}
              inputClassName="max-w-[720px] h-10"
            />
          )}
        />
      </div>
    </section>
  );
};
