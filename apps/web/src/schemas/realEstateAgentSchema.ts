import { z } from "zod";

/**
 * 不動産会社登録フォームのバリデーションスキーマ
 */
export const realEstateAgentSchema = z.object({
  // 企業情報
  companyName: z.string().min(1, "会社名は必須です"),
  branchName: z.string(),
  departmentName: z.string(),
  representativeName: z.string().min(1, "代表者名は必須です"),
  contactPersonName: z.string().min(1, "担当者名は必須です"),

  // 連絡先情報
  phoneNumber: z.string().min(1, "電話番号は必須です"),
  email: z
    .string()
    .min(1, "メールアドレスは必須です")
    .email("有効なメールアドレスを入力してください"),
  postalCode: z
    .string()
    .min(1, "郵便番号は必須です")
    .regex(/^\d{7}$/, "7桁の数字で入力してください"),
  prefecture: z.string().min(1, "都道府県は必須です"),
  city: z.string().min(1, "市区町村は必須です"),
  address: z.string().min(1, "住所は必須です"),

  // 取扱物件情報
  propertyTypes: z.array(z.string()),
  handlingTypes: z.array(z.string()).min(1, "1つ以上選択してください"),
  realEstateTypes: z.array(z.string()).min(1, "1つ以上選択してください"),
  propertyFeatures: z.array(z.string()).min(1, "1つ以上選択してください"),

  // 質問カテゴリ
  questionCategories: z.array(z.string()).min(1, "1つ以上選択してください"),

  // 不動産査定方法
  appraisalMethods: z.array(z.string()),

  // 免許・所属情報
  licenseNumber: z.string().min(1, "免許番号は必須です"),
  associationMembership: z.string().min(1, "所属協会は必須です"),
  fairTradeMembership: z.string().min(1, "公正取引協議会加盟状況は必須です"),

  // 同意事項
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "利用規約への同意が必要です",
  }),
});

/**
 * フォームデータの型（Zodスキーマから推論）
 */
export type RealEstateAgentFormData = z.infer<typeof realEstateAgentSchema>;

/**
 * フォームの初期値
 */
export const realEstateAgentDefaultValues: RealEstateAgentFormData = {
  companyName: "",
  branchName: "",
  departmentName: "",
  representativeName: "",
  contactPersonName: "",
  phoneNumber: "",
  email: "",
  postalCode: "",
  prefecture: "",
  city: "",
  address: "",
  propertyTypes: [],
  handlingTypes: [],
  realEstateTypes: [],
  propertyFeatures: [],
  questionCategories: [],
  appraisalMethods: [],
  licenseNumber: "",
  associationMembership: "",
  fairTradeMembership: "",
  agreeToTerms: true,
};

/**
 * フォーム入力用のデフォルト値（agreeToTermsはfalse）
 */
export const realEstateAgentInputDefaultValues: RealEstateAgentFormData = {
  ...realEstateAgentDefaultValues,
  agreeToTerms: false,
};
