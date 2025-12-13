import {
  DetailModalHeader,
  Field,
  MODAL_STYLES,
  Section,
} from "@/components/common/ModalComponents";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { SiteInquiry } from "@/data/inquiry-data";
import type React from "react";

interface SiteInquiryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiry: SiteInquiry | null;
}

// Note: SiteInquiry uses "overflow-hidden" instead of "overflow-y-auto" for content
const SITE_MODAL_CONTENT_STYLE = "flex-1 px-5 pt-1 pb-4 overflow-hidden";

// 問い合わせ情報セクション（問い合わせ内容、日時、ステータスをまとめる）
const InquiryInfoSection: React.FC<{ inquiry: SiteInquiry }> = ({ inquiry }) => (
  <div className={MODAL_STYLES.card}>
    <div className="flex items-center gap-3 mb-2">
      <h3 className="text-sm font-semibold text-neutral-900 m-0 leading-none">問い合わせ情報</h3>
      <span className="text-xs text-neutral-400 leading-none">|</span>
      <p className="text-xs font-mono text-neutral-900 m-0 leading-none">{inquiry.date}</p>
      <span className="text-xs text-neutral-400 leading-none">|</span>
      <span
        className={`px-2 py-0.5 rounded-full text-xs ${
          inquiry.status === "完了"
            ? "bg-green-100 text-green-800"
            : inquiry.status === "対応中"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
        }`}
      >
        {inquiry.status}
      </span>
    </div>
    <div className="space-y-2">
      <Field label="問い合わせ種別" value={inquiry.inquiryType} />
      <Field label="問い合わせ内容" value={inquiry.inquiryContent} />
    </div>
  </div>
);

// 個人情報セクション
const PersonalInfoSection: React.FC<{ inquiry: SiteInquiry }> = ({ inquiry }) => {
  const personalFields = [
    { key: "inquirer", label: "氏名" },
    { key: "furigana", label: "氏名（フリガナ）" },
    { key: "gender", label: "性別" },
    { key: "birthDate", label: "生年月日" },
    { key: "email", label: "メールアドレス" },
    { key: "phone", label: "電話番号" },
    { key: "fax", label: "FAX番号" },
    { key: "postalCode", label: "郵便番号" },
    { key: "address", label: "住所" },
  ] as const;

  return (
    <Section title="個人情報" className="h-full flex flex-col">
      <div className="grid grid-cols-3 gap-2.5">
        {personalFields.map(({ key, label }) => (
          <Field key={key} label={label} value={inquiry[key as keyof SiteInquiry] as string} />
        ))}
      </div>
    </Section>
  );
};

// 備考欄セクション
const RemarksSection: React.FC<{ inquiry: SiteInquiry }> = ({ inquiry }) => (
  <Section title="備考欄" className="h-full flex flex-col">
    <p className={`${MODAL_STYLES.fieldValue} flex-1 min-h-[200px]`}>{inquiry.remarks || "-"}</p>
  </Section>
);

export const SiteInquiryDetailModal: React.FC<SiteInquiryDetailModalProps> = ({
  isOpen,
  onClose,
  inquiry,
}) => {
  if (!inquiry) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={MODAL_STYLES.container} showCloseButton={false}>
        <DetailModalHeader onClose={onClose} />

        <div className={SITE_MODAL_CONTENT_STYLE}>
          <div className={MODAL_STYLES.section}>
            {/* 問い合わせ情報（内容、日時、ステータスをまとめる） */}
            <InquiryInfoSection inquiry={inquiry} />

            {/* 個人情報と備考欄を2カラムで表示 */}
            <div className="grid grid-cols-[7fr_3fr] gap-3 items-stretch">
              <PersonalInfoSection inquiry={inquiry} />
              <RemarksSection inquiry={inquiry} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
