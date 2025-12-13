import {
  DetailModalHeader,
  Field,
  MODAL_STYLES,
  Section,
} from "@/components/common/ModalComponents";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { BulkAssessment } from "@/data/inquiry-data";
import type React from "react";

interface BulkAssessmentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: BulkAssessment | null;
}

// 査定申請情報セクション（査定申請内容、申請日時、ステータスをまとめる）
const AssessmentInfoSection: React.FC<{ assessment: BulkAssessment }> = ({ assessment }) => (
  <div className={MODAL_STYLES.card}>
    <div className="flex items-center gap-3 mb-2">
      <h3 className="text-sm font-semibold text-neutral-900 m-0 leading-none">査定申請情報</h3>
      <span className="text-xs text-neutral-400 leading-none">|</span>
      <p className="text-xs font-mono text-neutral-900 m-0 leading-none">{assessment.date}</p>
      <span className="text-xs text-neutral-400 leading-none">|</span>
      <span
        className={`px-2 py-0.5 rounded-full text-xs ${
          assessment.status === "完了"
            ? "bg-green-100 text-green-800"
            : assessment.status === "査定中"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
        }`}
      >
        {assessment.status}
      </span>
    </div>
    <div className="space-y-2">
      <Field label="査定申請内容" value={assessment.inquiryContent} />
    </div>
  </div>
);

// 物件情報セクション
const PropertyInfoSection: React.FC<{ assessment: BulkAssessment }> = ({ assessment }) => {
  const propertyFields = [
    { key: "propertyAddress", label: "物件住所" },
    { key: "propertyType", label: "物件種別" },
    { key: "area", label: "面積" },
  ] as const;

  return (
    <Section title="物件情報" className="h-full flex flex-col">
      <div className="space-y-2">
        {propertyFields.map(({ key, label }) => (
          <Field
            key={key}
            label={label}
            value={assessment[key as keyof BulkAssessment] as string}
          />
        ))}
      </div>
    </Section>
  );
};

// 所有者情報セクション
const OwnerInfoSection: React.FC<{ assessment: BulkAssessment }> = ({ assessment }) => {
  const ownerFields = [
    { key: "ownerName", label: "所有者名" },
    { key: "furigana", label: "所有者名（フリガナ）" },
    { key: "gender", label: "性別" },
    { key: "birthDate", label: "生年月日" },
    { key: "email", label: "メールアドレス" },
    { key: "phone", label: "電話番号" },
    { key: "fax", label: "FAX番号" },
    { key: "postalCode", label: "郵便番号" },
    { key: "address", label: "住所" },
  ] as const;

  return (
    <Section title="所有者情報" className="h-full flex flex-col">
      <div className="grid grid-cols-3 gap-2.5">
        {ownerFields.map(({ key, label }) => (
          <Field
            key={key}
            label={label}
            value={assessment[key as keyof BulkAssessment] as string}
          />
        ))}
      </div>
    </Section>
  );
};

// 備考欄セクション
const RemarksSection: React.FC<{ assessment: BulkAssessment }> = ({ assessment }) => (
  <Section title="備考欄" className="h-full flex flex-col">
    <p className={`${MODAL_STYLES.fieldValue} flex-1 min-h-[120px]`}>{assessment.remarks || "-"}</p>
  </Section>
);

export const BulkAssessmentDetailModal: React.FC<BulkAssessmentDetailModalProps> = ({
  isOpen,
  onClose,
  assessment,
}) => {
  if (!assessment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={MODAL_STYLES.container} showCloseButton={false}>
        <DetailModalHeader
          onClose={onClose}
          title="査定申請詳細"
          description="査定申請の詳細情報を確認できます。"
        />

        <div className={MODAL_STYLES.content}>
          <div className={MODAL_STYLES.section}>
            {/* 査定申請情報（内容、日時、ステータスをまとめる） */}
            <AssessmentInfoSection assessment={assessment} />

            {/* 物件情報と所有者情報を2カラムで表示 */}
            <div className="grid grid-cols-[3fr_7fr] gap-3 items-stretch">
              <PropertyInfoSection assessment={assessment} />
              <OwnerInfoSection assessment={assessment} />
            </div>

            {/* 備考欄を全幅で表示 */}
            <RemarksSection assessment={assessment} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
