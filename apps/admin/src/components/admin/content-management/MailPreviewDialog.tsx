import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type React from "react";
import type { MailVariable } from "./MailVariableSettingsDialog";

interface MailPreviewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  subject: string;
  body: string;
  fromEmail?: string;
  fromName?: string;
  variables: MailVariable[];
}

// 変数のサンプル値マッピング
const getSampleValue = (variableName: string, variables: MailVariable[]): string => {
  const variable = variables.find((v) => {
    const cleanName = v.variableName.replace(/[\[\]]/g, "");
    const cleanMention = variableName.replace("@", "");
    return cleanName === cleanMention;
  });

  if (!variable) return variableName;

  // デフォルトのサンプル値
  const sampleValues: Record<string, string> = {
    name: "田中太郎",
    name_ruby: "たなかたろう",
    regist: "2024年1月1日 12:00",
    item_list: "物件情報\n- 物件名: サンプルマンション\n- 価格: 3,000万円",
    signature: "ウチカツ運営事務局",
  };

  const cleanName = variable.variableName.replace(/[\[\]]/g, "");
  return sampleValues[cleanName] || `${variable.displayName}の値`;
};

// 変数を実際の値に置き換える
const replaceVariables = (text: string, variables: MailVariable[]): string => {
  let result = text;

  // @変数名 のパターンを検出して置換
  const mentionPattern = /@(\w+)/g;
  result = result.replace(mentionPattern, (match, _varName) => {
    return getSampleValue(match, variables);
  });

  return result;
};

export const MailPreviewDialog: React.FC<MailPreviewDialogProps> = ({
  isOpen,
  onOpenChange,
  subject,
  body,
  fromEmail,
  fromName,
  variables,
}) => {
  const previewSubject = replaceVariables(subject, variables);
  const previewBody = replaceVariables(body, variables);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">メールプレビュー</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* 送信者情報 */}
          <div className="border-b pb-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-gray-600">差出人名:</span>
              <span className="text-gray-700">{fromName || "ウチカツ"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-gray-600">差出人メールアドレス:</span>
              <span className="text-gray-700">{fromEmail || "noreply@ucikatu.com"}</span>
            </div>
          </div>

          {/* 件名 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-600">件名</Label>
            <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3">
              <p className="text-gray-900 font-medium">{previewSubject}</p>
            </div>
          </div>

          {/* 本文 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-600">本文</Label>
            <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3 min-h-[200px]">
              <div className="text-gray-900 whitespace-pre-wrap">{previewBody}</div>
            </div>
          </div>

          {/* 注釈 */}
          <div className="bg-blue-50 border border-blue-200 rounded-md px-4 py-3">
            <p className="text-sm text-blue-800">
              ※このプレビューは変数をサンプル値で表示しています。実際の送信時には実際の値が挿入されます。
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
