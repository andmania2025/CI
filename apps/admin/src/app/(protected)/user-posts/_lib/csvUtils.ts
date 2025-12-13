import type { Property } from "@/types/models";
import type { Member } from "../_components/types";

/**
 * 物件データをCSV形式に変換する
 */
export const convertPropertiesToCSV = (properties: Property[]): string => {
  if (properties.length === 0) {
    return "";
  }

  // CSVヘッダー
  const headers = ["ID", "タイトル", "掲載状況", "更新日", "次回更新予定日", "問い合わせ数"];

  // CSVデータ行
  const rows = properties.map((property) => [
    property.id,
    property.title,
    property.publicationStatus,
    property.updateDate,
    property.nextUpdateDate,
    property.inquiryCount.toString(),
  ]);

  // CSV文字列を生成
  const csvContent = [headers, ...rows]
    .map((row) => row.map((field) => `"${field}"`).join(","))
    .join("\n");

  return csvContent;
};

/**
 * CSVファイルをダウンロードする
 */
export const downloadCSV = (csvContent: string, filename: string): void => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

/**
 * 選択された物件のCSVをダウンロードする
 */
export const downloadSelectedPropertiesCSV = (
  properties: Property[],
  selectedPropertyIds: string[]
): void => {
  const selectedProperties = properties.filter((property) =>
    selectedPropertyIds.includes(property.id)
  );

  if (selectedProperties.length === 0) {
    alert("選択された物件がありません。");
    return;
  }

  const csvContent = convertPropertiesToCSV(selectedProperties);
  const timestamp = new Date().toISOString().split("T")[0];
  const filename = `selected_properties_${timestamp}.csv`;

  downloadCSV(csvContent, filename);
};

/**
 * 会員データをCSV形式に変換する
 */
export const convertMembersToCSV = (members: Member[]): string => {
  if (members.length === 0) {
    return "";
  }

  // CSVヘッダー
  const headers = [
    "ID",
    "氏名",
    "性別",
    "生年月日",
    "メールアドレス",
    "電話番号",
    "FAX番号",
    "郵便番号",
    "住所",
    "アカウント状態",
  ];

  // CSVデータ行
  const rows = members.map((member) => [
    member.id,
    member.name,
    member.gender || "",
    member.dateOfBirth || "",
    member.email || "",
    member.phone || "",
    member.fax || "",
    member.postalCode || "",
    member.address || "",
    member.accountStatus || "",
  ]);

  // CSV文字列を生成
  const csvContent = [headers, ...rows]
    .map((row) => row.map((field) => `"${field}"`).join(","))
    .join("\n");

  return csvContent;
};

/**
 * 選択された会員のCSVをダウンロードする
 */
export const downloadSelectedMembersCSV = (
  members: Member[],
  selectedMemberIds: string[]
): void => {
  const selectedMembers = members.filter((member) => selectedMemberIds.includes(member.id));

  if (selectedMembers.length === 0) {
    alert("選択された会員がありません。");
    return;
  }

  const csvContent = convertMembersToCSV(selectedMembers);
  const timestamp = new Date().toISOString().split("T")[0];
  const filename = `selected_members_${timestamp}.csv`;

  downloadCSV(csvContent, filename);
};
