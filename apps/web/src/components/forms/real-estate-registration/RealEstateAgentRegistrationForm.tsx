"use client";

import { Button } from "@/components/ui/button";
import { PREFECTURE_MAP } from "@/lib/constants/prefectureMap";
import { APPRAISAL_METHODS, QUESTION_CATEGORIES } from "@/lib/constants/realEstate";
import { useCitiesQuery } from "@/lib/tanstack-query/queries/cities";
import { usePostalCodeQuery } from "@/lib/tanstack-query/queries/postalCode";
import {
  type RealEstateAgentFormData,
  realEstateAgentInputDefaultValues,
  realEstateAgentSchema,
} from "@/schemas/realEstateAgentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TermsModal } from "../TermsModal";
import { AddressSection } from "./AddressSection";
import { AgreementSection } from "./AgreementSection";
import { CheckboxGroupField } from "./CheckboxGroupField";
import { CompanyInfoSection } from "./CompanyInfoSection";
import { LicenseSection } from "./LicenseSection";
import { PropertyTypesSection } from "./PropertyTypesSection";

/**
 * 不動産会社登録フォームコンポーネント
 * React Hook Form + Zod バリデーション版
 */
export const RealEstateAgentRegistrationForm = () => {
  // React Hook Form セットアップ
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RealEstateAgentFormData>({
    resolver: zodResolver(realEstateAgentSchema),
    defaultValues: realEstateAgentInputDefaultValues,
    mode: "onBlur",
  });

  // モーダル状態
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "terms" | "privacy" | null;
  }>({
    isOpen: false,
    type: null,
  });
  const [hasViewedTerms, setHasViewedTerms] = useState(false);
  const [hasViewedPrivacy, setHasViewedPrivacy] = useState(false);

  // フォーム値の監視
  const postalCode = watch("postalCode");
  const prefecture = watch("prefecture");
  const agreeToTerms = watch("agreeToTerms");

  // 都道府県キーから都道府県名を取得
  const prefectureName = prefecture ? PREFECTURE_MAP[prefecture] : undefined;

  // TanStack Queryを使用して市区町村データを取得
  const {
    data: cityOptions = [],
    isLoading: isLoadingCities,
    error: citiesError,
  } = useCitiesQuery(prefectureName, !!prefecture);

  // TanStack Queryを使用して郵便番号から住所を取得
  const {
    data: postalCodeData,
    isLoading: isLoadingAddress,
    error: postalCodeError,
  } = usePostalCodeQuery(postalCode, true);

  // エラーログ
  if (citiesError) {
    console.error("市区町村取得エラー:", citiesError);
  }
  if (postalCodeError) {
    console.error("郵便番号検索エラー:", postalCodeError);
  }

  // 郵便番号検索結果をフォームに反映
  useEffect(() => {
    if (postalCodeData) {
      const prefectureKey =
        Object.entries(PREFECTURE_MAP).find(
          ([_key, name]) => name === postalCodeData.prefecture
        )?.[0] || postalCodeData.prefecture;

      setValue("prefecture", prefectureKey);
      setValue("city", postalCodeData.city || "");
      setValue("address", postalCodeData.address || "");
    }
  }, [postalCodeData, setValue]);

  // モーダル操作
  const openModal = (type: "terms" | "privacy") => {
    setModalState({ isOpen: true, type });
    if (type === "terms") {
      setHasViewedTerms(true);
    } else {
      setHasViewedPrivacy(true);
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  const canCheckAgreement = hasViewedTerms && hasViewedPrivacy;

  // フォーム送信
  const onSubmit = (data: RealEstateAgentFormData) => {
    console.log("Form submitted:", data);
    // TODO: API送信処理
  };

  // チェックボックス配列の更新ヘルパー
  const handleArrayFieldChange = (
    fieldName: keyof RealEstateAgentFormData,
    value: string,
    checked: boolean,
    currentValues: string[]
  ) => {
    if (checked) {
      setValue(fieldName, [...currentValues, value] as never);
    } else {
      setValue(fieldName, currentValues.filter((item) => item !== value) as never);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
      <div className="bg-card rounded-lg border border-black/20 p-10 space-y-6">
        {/* 企業情報セクション */}
        <CompanyInfoSection control={control} errors={errors} />

        {/* 住所セクション */}
        <section>
          <Controller
            name="postalCode"
            control={control}
            render={({ field: postalCodeField }) => (
              <Controller
                name="prefecture"
                control={control}
                render={({ field: prefectureField }) => (
                  <Controller
                    name="city"
                    control={control}
                    render={({ field: cityField }) => (
                      <Controller
                        name="address"
                        control={control}
                        render={({ field: addressField }) => (
                          <AddressSection
                            postalCode={postalCodeField.value}
                            prefecture={prefectureField.value}
                            city={cityField.value}
                            address={addressField.value}
                            onPostalCodeChange={postalCodeField.onChange}
                            onPrefectureChange={(value) => {
                              prefectureField.onChange(value);
                              cityField.onChange("");
                            }}
                            onCityChange={cityField.onChange}
                            onAddressChange={addressField.onChange}
                            cityOptions={cityOptions}
                            isLoadingAddress={isLoadingAddress}
                            isLoadingCities={isLoadingCities}
                            errors={{
                              postalCode: errors.postalCode?.message,
                              prefecture: errors.prefecture?.message,
                              city: errors.city?.message,
                              address: errors.address?.message,
                            }}
                          />
                        )}
                      />
                    )}
                  />
                )}
              />
            )}
          />
        </section>

        {/* 取扱物件情報セクション */}
        <PropertyTypesSection
          control={control}
          errors={errors}
          onArrayFieldChange={handleArrayFieldChange}
        />

        {/* 質問カテゴリセクション */}
        <section>
          <Controller
            name="questionCategories"
            control={control}
            render={({ field }) => (
              <CheckboxGroupField
                label="質問カテゴリ（不動産全般）"
                required
                options={QUESTION_CATEGORIES}
                selectedValues={field.value}
                onCheckedChange={(value, checked) =>
                  handleArrayFieldChange("questionCategories", value, checked, field.value)
                }
                idPrefix="questionCategory"
                error={errors.questionCategories?.message}
              />
            )}
          />
        </section>

        {/* 不動産査定方法セクション */}
        <section>
          <Controller
            name="appraisalMethods"
            control={control}
            render={({ field }) => (
              <CheckboxGroupField
                label="不動産査定方法"
                options={APPRAISAL_METHODS}
                selectedValues={field.value}
                onCheckedChange={(value, checked) =>
                  handleArrayFieldChange("appraisalMethods", value, checked, field.value)
                }
                idPrefix="appraisalMethod"
              />
            )}
          />
        </section>

        {/* 免許・所属情報セクション */}
        <LicenseSection control={control} errors={errors} />

        {/* 同意事項セクション */}
        <Controller
          name="agreeToTerms"
          control={control}
          render={({ field }) => (
            <AgreementSection
              agreeToTerms={field.value}
              onAgreeChange={field.onChange}
              onOpenTerms={() => openModal("terms")}
              onOpenPrivacy={() => openModal("privacy")}
              canCheckAgreement={canCheckAgreement}
              error={errors.agreeToTerms?.message}
            />
          )}
        />

        {/* 送信ボタン */}
        <div className="flex justify-center">
          <Button
            type="submit"
            size="lg"
            className="px-8 py-3 text-lg bg-[#093893] text-white border border-[#093893] hover:bg-white hover:text-[#093893] transition-colors disabled:bg-gray-400 disabled:border-gray-400 disabled:text-white disabled:pointer-events-none"
            disabled={!agreeToTerms}
          >
            登録
          </Button>
        </div>
      </div>

      {/* モーダル */}
      {modalState.isOpen && modalState.type && (
        <TermsModal isOpen={modalState.isOpen} onClose={closeModal} type={modalState.type} />
      )}
    </form>
  );
};

// 後方互換性のためのデフォルトエクスポート（非推奨）
export default RealEstateAgentRegistrationForm;
