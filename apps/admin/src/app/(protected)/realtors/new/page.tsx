"use client";

// 動的レンダリングを強制（プリレンダリングを無効化）
// DB接続がない状況でもビルド可能にするため
export const dynamic = "force-dynamic";

import { BasicInfoTab } from "@/components/property-forms/tabs/BasicInfoTab";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type RealtorFormData, realtorSchema } from "@/schemas/realtorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DescriptionTab } from "./_components/DescriptionTab";
import { FacilitiesTab } from "./_components/FacilitiesTab";
import { LandBuildingTab } from "./_components/LandBuildingTab";
import { MediaTab } from "./_components/MediaTab";
import { OtherTab } from "./_components/OtherTab";
import { RealtorDetailsTab } from "./_components/RealtorDetailsTab";

export default function NewRealtorPage() {
  const router = useRouter();

  const methods = useForm({
    resolver: zodResolver(realtorSchema),
    mode: "onBlur",
    defaultValues: {
      utilities: "complete",
      inquiryCount: 0,
      publicScope: "public",
      featured: "normal",
      parkingAvailable: "none",
    } as RealtorFormData,
  });

  useEffect(() => {
    // クライアント側でのみ実行されることを保証
    if (typeof window !== "undefined") {
      // document.titleを直接設定（PageTitleContextを使用しない）
      document.title = "新規不動産業者登録 - ウチカツ管理システム";
    }
  }, []);

  const handleBack = () => {
    router.back();
  };

  const onSubmit = async (data: RealtorFormData) => {
    try {
      console.log("不動産業者登録データ:", data);
      // TODO: API呼び出しを実装
      alert("不動産業者を登録しました");
      router.push("/realtors");
    } catch (error) {
      console.error("登録エラー:", error);
      alert("登録に失敗しました");
    }
  };

  const handleSubmit = () => {
    methods.handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-1 flex-col gap-6 p-6 min-h-0 h-full">
        {/* ヘッダー */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">新規不動産業者登録</h1>
          <div className="flex items-center gap-3">
            <Button onClick={handleBack} variant="outline" type="button">
              キャンセル
            </Button>
            <Button
              onClick={handleSubmit}
              type="button"
              className="bg-white text-black border border-gray-300 hover:bg-gray-50"
            >
              登録
            </Button>
          </div>
        </div>

        {/* タブコンテンツ */}
        <div className="flex-1 min-h-0">
          <Tabs defaultValue="basic" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="basic">基本情報</TabsTrigger>
              <TabsTrigger value="details">詳細情報</TabsTrigger>
              <TabsTrigger value="land">土地・建物</TabsTrigger>
              <TabsTrigger value="facilities">設備・特性</TabsTrigger>
              <TabsTrigger value="description">説明・環境</TabsTrigger>
              <TabsTrigger value="media">メディア・公開</TabsTrigger>
              <TabsTrigger value="other">その他</TabsTrigger>
            </TabsList>

            <div className="flex-1 mt-6">
              <TabsContent value="basic" className="h-full">
                <BasicInfoTab showContactPerson />
              </TabsContent>
              <TabsContent value="details" className="h-full">
                <RealtorDetailsTab />
              </TabsContent>
              <TabsContent value="land" className="h-full">
                <LandBuildingTab />
              </TabsContent>
              <TabsContent value="facilities" className="h-full">
                <FacilitiesTab />
              </TabsContent>
              <TabsContent value="description" className="h-full">
                <DescriptionTab />
              </TabsContent>
              <TabsContent value="media" className="h-full">
                <MediaTab />
              </TabsContent>
              <TabsContent value="other" className="h-full">
                <OtherTab />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </form>
    </FormProvider>
  );
}
