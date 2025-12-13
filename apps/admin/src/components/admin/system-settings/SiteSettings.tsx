"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const freeFieldKeys = [
  { key: "field1", label: "フリー項目名1", placeholder: "項目名" },
  { key: "field2", label: "フリー項目名2", placeholder: "建築年月" },
  { key: "field3", label: "フリー項目名3", placeholder: "計画地・建築条件" },
  { key: "field4", label: "フリー項目名4", placeholder: "その他費用等" },
  { key: "field5", label: "フリー項目名5", placeholder: "金利上限" },
  { key: "field6", label: "フリー項目名6", placeholder: "その他事業者情報" },
  { key: "field7", label: "フリー項目名7", placeholder: "立地・神奈川県" },
  { key: "field8", label: "フリー項目名8", placeholder: "設備条件・設備等" },
  { key: "field9", label: "フリー項目名9", placeholder: "NONE" },
  { key: "field10", label: "フリー項目名10", placeholder: "NONE" },
] as const;

const freeFieldsSchema = z.object({
  field1: z.string().default(""),
  field2: z.string().default(""),
  field3: z.string().default(""),
  field4: z.string().default(""),
  field5: z.string().default(""),
  field6: z.string().default(""),
  field7: z.string().default(""),
  field8: z.string().default(""),
  field9: z.string().default(""),
  field10: z.string().default(""),
});

const SiteSettingsSchema = z.object({
  siteTitle: z.string().min(1, "必須です"),
  siteDescription: z.string().default(""),
  siteKeywords: z.string().default(""),
  googleMapsApiKey: z.string().default(""),
  googleAnalyticsCode: z.string().default(""),
  freeFields: freeFieldsSchema,
});

type SiteSettingsValues = z.input<typeof SiteSettingsSchema>;

const SiteSettings: React.FC = () => {
  const form = useForm<SiteSettingsValues>({
    resolver: zodResolver(SiteSettingsSchema),
    defaultValues: {
      siteTitle: "ウチカツ",
      siteDescription: "",
      siteKeywords: "",
      googleMapsApiKey: "",
      googleAnalyticsCode: "",
      freeFields: {
        field1: "",
        field2: "",
        field3: "",
        field4: "",
        field5: "",
        field6: "",
        field7: "",
        field8: "",
        field9: "",
        field10: "",
      },
    },
  });

  const onSubmit = (values: SiteSettingsValues) => {
    console.log("サイト設定を保存:", values);
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium mb-6">サイト設定</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="siteTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>サイトタイトル</FormLabel>
                  <FormControl>
                    <Input placeholder="サイト名" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="siteKeywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>サイトキーワード</FormLabel>
                  <FormControl>
                    <Input placeholder="カンマ区切り" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="googleMapsApiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Maps API Key</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="googleAnalyticsCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Analytics Code</FormLabel>
                  <FormControl>
                    <Input placeholder="G-XXXXXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {freeFieldKeys.map(({ key, label, placeholder }) => (
              <FormField
                key={key}
                control={form.control}
                name={`freeFields.${key}` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {label} <span className="text-red-500">*必須</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="pt-2 flex justify-center">
            <Button type="submit" className="px-8">
              保存する
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SiteSettings;
