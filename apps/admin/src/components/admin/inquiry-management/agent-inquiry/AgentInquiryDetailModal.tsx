import {
  DetailModalHeader,
  Field,
  MODAL_STYLES,
  Section,
} from "@/components/common/ModalComponents";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { AgentInquiry } from "@/data/inquiry-data";
import type React from "react";

interface AgentInquiryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiry: AgentInquiry | null;
}

// 問い合わせ情報セクション（問い合わせ内容、日時、ステータスをまとめる）
const InquiryInfoSection: React.FC<{ inquiry: AgentInquiry }> = ({ inquiry }) => (
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

// 会社情報セクション
const CompanyInfoSection: React.FC<{ inquiry: AgentInquiry }> = ({ inquiry }) => {
  const companyFields = [
    { key: "companyName", label: "会社名" },
    { key: "contactPerson", label: "担当者名" },
    { key: "email", label: "メールアドレス" },
    { key: "phone", label: "電話番号" },
    { key: "fax", label: "FAX番号" },
  ] as const;

  return (
    <Section title="会社情報" className="h-full flex flex-col">
      <div className="grid grid-cols-2 gap-2.5">
        {companyFields.map(({ key, label }) => (
          <Field key={key} label={label} value={inquiry[key as keyof AgentInquiry] as string} />
        ))}
      </div>
    </Section>
  );
};

// 担当者情報セクション
const ContactInfoSection: React.FC<{ inquiry: AgentInquiry }> = ({ inquiry }) => {
  const contactFields = [
    { key: "furigana", label: "担当者名（フリガナ）" },
    { key: "gender", label: "性別" },
    { key: "birthDate", label: "生年月日" },
    { key: "postalCode", label: "郵便番号" },
    { key: "address", label: "住所" },
  ] as const;

  return (
    <Section title="担当者情報" className="h-full flex flex-col">
      <div className="grid grid-cols-2 gap-2.5">
        {contactFields.map(({ key, label }) => (
          <Field key={key} label={label} value={inquiry[key as keyof AgentInquiry] as string} />
        ))}
      </div>
    </Section>
  );
};

// 備考欄セクション
const RemarksSection: React.FC<{ inquiry: AgentInquiry }> = ({ inquiry }) => (
  <Section title="備考欄" className="h-full flex flex-col">
    <p className={`${MODAL_STYLES.fieldValue} flex-1 min-h-[120px]`}>{inquiry.remarks || "-"}</p>
  </Section>
);

export const AgentInquiryDetailModal: React.FC<AgentInquiryDetailModalProps> = ({
  isOpen,
  onClose,
  inquiry,
}) => {
  if (!inquiry) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={MODAL_STYLES.container} showCloseButton={false}>
        <DetailModalHeader onClose={onClose} />

        <div className={MODAL_STYLES.content}>
          <div className={MODAL_STYLES.section}>
            {/* 問い合わせ情報（内容、日時、ステータスをまとめる） */}
            <InquiryInfoSection inquiry={inquiry} />

            {/* 会社情報と担当者情報を2カラムで表示 */}
            <div className="grid grid-cols-2 gap-3 items-stretch">
              <CompanyInfoSection inquiry={inquiry} />
              <ContactInfoSection inquiry={inquiry} />
            </div>

            {/* 備考欄を全幅で表示 */}
            <RemarksSection inquiry={inquiry} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
