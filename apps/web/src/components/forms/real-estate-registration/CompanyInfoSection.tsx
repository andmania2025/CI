"use client";

import type { RealEstateAgentFormData } from "@/schemas/realEstateAgentSchema";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import { TextInputField } from "./TextInputField";

interface CompanyInfoSectionProps {
  control: Control<RealEstateAgentFormData>;
  errors: FieldErrors<RealEstateAgentFormData>;
}

/**
 * 企業情報セクションコンポーネント
 * 会社名、支店名、部課名、代表者名、担当者名、電話番号を含む
 */
export const CompanyInfoSection = ({ control, errors }: CompanyInfoSectionProps) => {
  return (
    <section>
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左列 */}
          <div className="space-y-4">
            <Controller
              name="companyName"
              control={control}
              render={({ field }) => (
                <TextInputField
                  id="companyName"
                  label="会社名"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="会社名を入力してください"
                  required
                  error={errors.companyName?.message}
                />
              )}
            />
            <Controller
              name="representativeName"
              control={control}
              render={({ field }) => (
                <TextInputField
                  id="representativeName"
                  label="代表者名"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="代表者名を入力してください"
                  required
                  error={errors.representativeName?.message}
                />
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <TextInputField
                  id="phone"
                  label="電話番号"
                  type="tel"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="電話番号を入力してください"
                  required
                  error={errors.phoneNumber?.message}
                />
              )}
            />
          </div>

          {/* 右列 */}
          <div className="space-y-4">
            <Controller
              name="branchName"
              control={control}
              render={({ field }) => (
                <TextInputField
                  id="branchName"
                  label="支店名"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="支店名を入力してください"
                />
              )}
            />
            <Controller
              name="contactPersonName"
              control={control}
              render={({ field }) => (
                <TextInputField
                  id="contactPersonName"
                  label="担当者名"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="担当者名を入力してください"
                  required
                  error={errors.contactPersonName?.message}
                />
              )}
            />
            <Controller
              name="departmentName"
              control={control}
              render={({ field }) => (
                <TextInputField
                  id="departmentName"
                  label="部課名"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="部課名を入力してください"
                />
              )}
            />
          </div>
        </div>

        {/* メールアドレス */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextInputField
              id="email"
              label="メールアドレス"
              type="email"
              value={field.value}
              onChange={field.onChange}
              placeholder="メールアドレスを入力してください"
              required
              error={errors.email?.message}
            />
          )}
        />
      </div>
    </section>
  );
};
