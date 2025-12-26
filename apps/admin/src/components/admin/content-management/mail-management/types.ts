import type { MailVariable } from "../MailVariableSettingsDialog";

// メールテンプレートの型定義
export interface MailTemplate {
  id: string;
  templateName: string;
  subject: string;
  templateType: "配信" | "停止";
  status: string;
}

// フォームデータの型定義
export interface MailFormData {
  freeword: string;
  deliverySetting: {
    delivery: boolean;
    stop: boolean;
  };
  displayCount: string;
}

// フォームの初期値
export const INITIAL_FORM_DATA: MailFormData = {
  freeword: "",
  deliverySetting: {
    delivery: false,
    stop: false,
  },
  displayCount: "20",
};

// デフォルトのメール変数
export const DEFAULT_MAIL_VARIABLES: MailVariable[] = [
  {
    id: "var_1",
    variableName: "[name]",
    displayName: "会員名",
    description: "会員の氏名を挿入します",
    category: "user",
  },
  {
    id: "var_2",
    variableName: "[name_ruby]",
    displayName: "会員名（ふりがな）",
    description: "会員の氏名のふりがなを挿入します",
    category: "user",
  },
  {
    id: "var_3",
    variableName: "[regist]",
    displayName: "登録日時",
    description: "問い合わせ登録日時を挿入します",
    category: "system",
  },
  {
    id: "var_4",
    variableName: "[item_list]",
    displayName: "項目リスト",
    description: "問い合わせ項目のリストを挿入します",
    category: "property",
  },
  {
    id: "var_5",
    variableName: "[signature]",
    displayName: "署名",
    description: "メール署名を挿入します",
    category: "system",
  },
];
