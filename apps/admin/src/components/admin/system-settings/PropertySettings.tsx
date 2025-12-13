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
  { key: "field1", label: "フリー項目1" },
  { key: "field2", label: "フリー項目2" },
  { key: "field3", label: "フリー項目3" },
  { key: "field4", label: "フリー項目4" },
  { key: "field5", label: "フリー項目5" },
] as const;

const PropertySettingsSchema = z.object({
  propertyInquirySettings: z.object({
    enableInquiry: z.boolean().default(true),
    enableDetailedInquiry: z.boolean().default(true),
  }),
  freeFields: z.object({
    field1: z.string().default(""),
    field2: z.string().default(""),
    field3: z.string().default(""),
    field4: z.string().default(""),
    field5: z.string().default(""),
  }),
  mailSettings: z.object({
    enableAutoMail: z.boolean().default(true),
  }),
});

type PropertySettingsValues = z.input<typeof PropertySettingsSchema>;

const PropertySettings: React.FC = () => {
  const form = useForm<PropertySettingsValues>({
    resolver: zodResolver(PropertySettingsSchema),
    defaultValues: {
      propertyInquirySettings: {
        enableInquiry: true,
        enableDetailedInquiry: true,
      },
      freeFields: {
        field1: "",
        field2: "",
        field3: "",
        field4: "",
        field5: "",
      },
      mailSettings: {
        enableAutoMail: true,
      },
    },
  });

  const onSubmit = (values: PropertySettingsValues) => {
    console.log("物件設定を保存:", values);
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium mb-6">物件設定</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* 物件問い合わせ設定 */}
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-4">
              物件問い合わせ設定 <span className="text-red-500">*必須</span>
            </h4>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="propertyInquirySettings.enableInquiry"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormControl>
                        <input
                          type="checkbox"
                          className="mr-3"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      </FormControl>
                      <FormLabel className="m-0">物件問い合わせを有効にする</FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="propertyInquirySettings.enableDetailedInquiry"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormControl>
                        <input
                          type="checkbox"
                          className="mr-3"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      </FormControl>
                      <FormLabel className="m-0">詳細問い合わせを有効にする</FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              ※「物件問い合わせ」の設定により、管理者が物件の「アカウント有効」と「有効」とする事で管理ログインできるようになります。
            </p>
          </div>

          {/* フリー項目設定 */}
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-4">フリー項目設定</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {freeFieldKeys.map(({ key }, index) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={`freeFields.${key}` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        フリー項目{index + 1} <span className="text-red-500">*必須</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="項目名" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          {/* メール設定 */}
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-4">メール設定</h4>
            <FormField
              control={form.control}
              name="mailSettings.enableAutoMail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    物件問い合わせ時の自動メール送信設定 <span className="text-red-500">*必須</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          className="mr-2"
                          checked={field.value === true}
                          onChange={() => field.onChange(true)}
                        />
                        <span className="text-sm">送信する</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          className="mr-2"
                          checked={field.value === false}
                          onChange={() => field.onChange(false)}
                        />
                        <span className="text-sm">送信しない</span>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-sm text-gray-600 mt-2">
              ※物件問い合わせ時に、問い合わせ者に自動でメールを送信するかどうかを設定します。
            </p>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                自動メール送信時の件名とメール本文
              </label>
              <div className="flex items-center gap-2 mb-2">
                <select className="px-3 py-2 border border-gray-300 rounded-md">
                  <option>物件問い合わせ</option>
                </select>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  選択する
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">件名:</span>
                  <span className="text-sm">[admin]</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">送信者:</span>
                  <span className="text-sm">[admin_display]</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">返信先:</span>
                  <span className="text-sm">[admin_mail]</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                ※「件名」「送信者」「返信先」は、「メール管理」で設定したメールテンプレートの内容が表示されます。
              </p>
            </div>
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

export default PropertySettings;
