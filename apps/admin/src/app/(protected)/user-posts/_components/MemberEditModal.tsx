"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Save, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MemberBasicInfoTab } from "./MemberBasicInfoTab";
import type { Member } from "./types";

interface MemberEditModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  memberId: string | null;
  onSuccess?: () => void;
}

export const MemberEditModal: React.FC<MemberEditModalProps> = ({
  isOpen,
  onOpenChange,
  memberId,
  onSuccess,
}) => {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 会員データを読み込む
  useEffect(() => {
    const loadMember = async () => {
      if (!memberId || !isOpen) return;

      try {
        setLoading(true);
        // TODO: 実際のAPIから会員データを取得
        // 現在はダミーデータを使用
        const dummyMember: Member = {
          id: memberId,
          name: "田中太郎",
          gender: "male",
          dateOfBirth: "1990-01-15",
          email: "tanaka@example.com",
          phone: "03-1234-5678",
          fax: "03-1234-5679",
          postalCode: "150-0013",
          address: "東京都渋谷区恵比寿1-2-3",
          password: "",
          accountStatus: "active",
        };
        setMember(dummyMember);
      } catch (error) {
        console.error("会員データの読み込みに失敗:", error);
        toast.error("会員データの読み込みに失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadMember();
  }, [memberId, isOpen]);

  const handleSave = async () => {
    if (!member) return;

    try {
      setIsSaving(true);
      // TODO: 実際のAPIに保存処理を実装
      toast.success("会員情報を更新しました");
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error("保存に失敗:", error);
      toast.error("保存に失敗しました");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  if (!member && loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">データを読み込み中...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!member) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>会員情報の読み込みエラー</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600">会員データが見つかりませんでした。</p>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleClose}>閉じる</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] flex flex-col p-0 border-0">
        <DialogHeader className="shrink-0 px-6 pt-6 pb-4">
          <DialogTitle className="text-lg font-semibold">
            会員情報編集
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 min-h-0 px-6 pb-6 overflow-hidden">
          <MemberBasicInfoTab member={member} isEditMode={true} />
        </div>

        <div className="flex justify-end gap-4 pt-4 pb-6 px-6 shrink-0">
          <Button variant="outline" onClick={handleClose} disabled={isSaving}>
            <X className="w-4 h-4 mr-2" />
            キャンセル
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "保存中..." : "保存"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
