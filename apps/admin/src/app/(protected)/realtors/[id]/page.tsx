"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Edit3, Save, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { updateRealtor } from "../_actions/updateRealtorAction";
import { RealtorDetailTabs } from "../_components/RealtorDetailTabs";
import type { Realtor } from "../_components/types";

export default function RealtorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [realtor, setRealtor] = useState<Realtor | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const realtorId = params.id as string;

  useEffect(() => {
    // クライアント側でのみ実行されることを保証
    if (typeof window !== "undefined") {
      // document.titleを直接設定（PageTitleContextを使用しない）
      document.title = "業者詳細 - ウチカツ管理システム";
    }
  }, []);

  useEffect(() => {
    const loadRealtor = async () => {
      try {
        setLoading(true);
        // TODO: 実際のAPIから業者データを取得
        // 現在はダミーデータを使用
        const dummyRealtor: Realtor = {
          id: realtorId,
          title: "サンプル不動産株式会社",
          representativeName: "田中太郎",
          contactPerson: "佐藤花子",
          publicationStatus: "有効",
          updateDate: "2024-01-15",
          nextUpdateDate: "2024-02-15",
          inquiryCount: 50,
          actions: "",
        };
        setRealtor(dummyRealtor);
      } catch (error) {
        console.error("業者データの読み込みに失敗:", error);
        toast.error("業者データの読み込みに失敗しました");
      } finally {
        setLoading(false);
      }
    };

    if (realtorId) {
      loadRealtor();
    }
  }, [realtorId]);

  const handleBack = () => {
    router.back();
  };

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSave = async () => {
    if (!realtor) return;

    try {
      setIsSaving(true);

      const result = await updateRealtor({
        id: realtor.id,
        title: realtor.title,
        representativeName: realtor.representativeName,
        contactPerson: realtor.contactPerson,
        publicationStatus: realtor.publicationStatus,
      });

      if (result.success) {
        setIsEditMode(false);
        toast.success("業者情報を更新しました");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("保存に失敗:", error);
      toast.error("保存に失敗しました");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // 編集モードを抜ける
    setIsEditMode(false);
  };

  if (loading) {
    return (
      <div className="flex flex-1 flex-col gap-6 p-6 min-h-0 h-full">
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">データを読み込み中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!realtor) {
    return (
      <div className="flex flex-1 flex-col gap-6 p-6 min-h-0 h-full">
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <p className="text-gray-600">業者が見つかりませんでした。</p>
            <Button onClick={handleBack} className="mt-4">
              戻る
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 min-h-0 h-full">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{realtor.title}</h1>
          </div>
        </div>

        {/* 編集ボタン */}
        <div className="flex items-center gap-2">
          {isEditMode ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                キャンセル
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isSaving ? "保存中..." : "保存"}
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={handleEditToggle}
              className="flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              編集
            </Button>
          )}
        </div>
      </div>

      {/* タブコンテンツ */}
      <div className="flex-1 min-h-0">
        <Tabs defaultValue="basic" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">基本情報</TabsTrigger>
            <TabsTrigger value="account">アカウント情報</TabsTrigger>
            <TabsTrigger value="properties">掲載設定</TabsTrigger>
          </TabsList>

          <div className="flex-1 min-h-0 mt-6">
            <TabsContent value="basic" className="h-full">
              <RealtorDetailTabs.BasicInfo realtor={realtor} isEditMode={isEditMode} />
            </TabsContent>
            <TabsContent value="account" className="h-full">
              <RealtorDetailTabs.AccountInfo realtor={realtor} isEditMode={isEditMode} />
            </TabsContent>
            <TabsContent value="properties" className="h-full">
              <RealtorDetailTabs.Properties realtor={realtor} isEditMode={isEditMode} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
