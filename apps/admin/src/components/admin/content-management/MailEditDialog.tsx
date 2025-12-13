import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MailPreviewDialog } from "./MailPreviewDialog";
import type { MailVariable } from "./MailVariableSettingsDialog";
import { MentionInput } from "./MentionInput";
import { MentionTextarea } from "./MentionTextarea";

// バリデーションスキーマ
const mailEditSchema = z.object({
  templateName: z.string().min(1, "テンプレート名を入力してください"),
  fromEmail: z.string().optional(),
  fromName: z.string().optional(),
  subject: z.string().min(1, "件名を入力してください"),
  body: z.string().min(1, "本文を入力してください"),
});

type MailEditFormData = z.infer<typeof mailEditSchema>;

interface MailTemplate {
  id: string;
  templateName: string;
  subject: string;
  templateType: "配信" | "停止";
  status: string;
}

interface MailEditDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  template: MailTemplate | null;
  variables?: MailVariable[];
  onSave?: (data: MailEditFormData & { templateName: string }) => void;
}

export const MailEditDialog: React.FC<MailEditDialogProps> = ({
  isOpen,
  onOpenChange,
  template,
  variables = [],
  onSave,
}) => {
  // 変数リストを動的に取得（propsで渡されない場合はデフォルト値を使用）
  const mailVariables: MailVariable[] =
    variables.length > 0
      ? variables
      : [
          { id: "var_default_1", variableName: "[name]", displayName: "会員名", category: "user" },
          {
            id: "var_default_2",
            variableName: "[name_ruby]",
            displayName: "会員名（ふりがな）",
            category: "user",
          },
          {
            id: "var_default_3",
            variableName: "[regist]",
            displayName: "登録日時",
            category: "system",
          },
          {
            id: "var_default_4",
            variableName: "[item_list]",
            displayName: "項目リスト",
            category: "property",
          },
          {
            id: "var_default_5",
            variableName: "[signature]",
            displayName: "署名",
            category: "system",
          },
        ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<MailEditFormData>({
    resolver: zodResolver(mailEditSchema),
    defaultValues: {
      templateName: "",
      fromEmail: "",
      fromName: "",
      subject: "",
      body: "",
    },
  });

  // テンプレートが変更されたらフォームをリセット
  React.useEffect(() => {
    if (isOpen) {
      if (template) {
        reset({
          templateName: template.templateName || "",
          fromEmail: "",
          fromName: "",
          subject: template.subject || "",
          body: "",
        });
      } else {
        // 新規作成時
        reset({
          templateName: "",
          fromEmail: "",
          fromName: "",
          subject: "",
          body: "",
        });
      }
    }
  }, [template, isOpen, reset]);

  const onSubmit = (data: MailEditFormData) => {
    if (onSave) {
      onSave({
        ...data,
        templateName: data.templateName,
      });
    }
    onOpenChange(false);
  };

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const isNewTemplate = !template;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isNewTemplate ? "新規メールテンプレート作成" : "メールテンプレート内容"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* テンプレート名 */}
          <div className="space-y-2">
            <Label htmlFor="templateName" className="text-sm font-medium">
              テンプレート名 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="templateName"
              {...register("templateName")}
              placeholder="テンプレート名を入力"
              className="w-full"
            />
            {errors.templateName && (
              <p className="text-sm text-red-500">{errors.templateName.message}</p>
            )}
          </div>

          {/* 差出人名 */}
          <div className="space-y-2">
            <Label htmlFor="fromName" className="text-sm font-medium">
              差出人名 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fromName"
              {...register("fromName")}
              placeholder="ウチカツ"
              className="w-full"
            />
          </div>

          {/* 差出人メールアドレス */}
          <div className="space-y-2">
            <Label htmlFor="fromEmail" className="text-sm font-medium">
              差出人メールアドレス <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fromEmail"
              {...register("fromEmail")}
              placeholder="noreply1@ucikatu.com"
              className="w-full"
            />
          </div>

          {/* 件名 */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium">
              件名 <span className="text-red-500">*</span>
            </Label>
            <MentionInput
              id="subject"
              name="subject"
              variables={mailVariables}
              value={watch("subject") || ""}
              onValueChange={(value) => setValue("subject", value)}
              placeholder="件名を入力（/ を入力して変数を選択）"
            />
            {errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
            <p className="text-xs text-gray-500">
              ※「/」を入力して変数を選択し、差し込み配信を行えます。
            </p>
          </div>

          {/* 本文 */}
          <div className="space-y-2">
            <Label htmlFor="body" className="text-sm font-medium">
              本文 <span className="text-red-500">*</span>
            </Label>
            <MentionTextarea
              id="body"
              name="body"
              variables={mailVariables}
              value={watch("body") || ""}
              onValueChange={(value) => setValue("body", value)}
              placeholder="本文を入力（/ を入力して変数を選択）"
              className="w-full min-h-[300px]"
            />
            {errors.body && <p className="text-sm text-red-500">{errors.body.message}</p>}
            <p className="text-xs text-gray-500">
              ※「/」を入力して変数を選択し、差し込み配信を行えます。
            </p>
          </div>

          <DialogFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePreview}
              className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            >
              プレビュー
            </Button>
            <Button type="submit" className="bg-black text-white hover:bg-black/90">
              確認する
            </Button>
          </DialogFooter>
        </form>

        {/* プレビューダイアログ */}
        <MailPreviewDialog
          isOpen={isPreviewOpen}
          onOpenChange={setIsPreviewOpen}
          subject={watch("subject")}
          body={watch("body")}
          fromEmail={watch("fromEmail")}
          fromName={watch("fromName")}
          variables={mailVariables}
        />
      </DialogContent>
    </Dialog>
  );
};
