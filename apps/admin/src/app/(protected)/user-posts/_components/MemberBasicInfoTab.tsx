import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type React from "react";
import { useState } from "react";
import type { MemberDetailTabsProps } from "./types";

export const MemberBasicInfoTab: React.FC<MemberDetailTabsProps> = ({
  member,
  isEditMode = false,
}) => {
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(
    member.dateOfBirth ? new Date(member.dateOfBirth) : undefined
  );

  // フィールドコンポーネント
  const FieldItem = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">基本情報</h3>
      <div className="grid grid-cols-2 gap-6">
        {/* 左カラム */}
        <div className="space-y-4">
          <FieldItem label="氏名">
            {isEditMode ? (
              <Input defaultValue={member.name} className="w-full" placeholder="氏名を入力" />
            ) : (
              <span className="text-gray-600">{member.name || "-"}</span>
            )}
          </FieldItem>

          <FieldItem label="性別">
            {isEditMode ? (
              <Select defaultValue={member.gender || ""}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">男性</SelectItem>
                  <SelectItem value="female">女性</SelectItem>
                  <SelectItem value="other">その他</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <span className="text-gray-600">
                {member.gender === "male"
                  ? "男性"
                  : member.gender === "female"
                    ? "女性"
                    : member.gender === "other"
                      ? "その他"
                      : "-"}
              </span>
            )}
          </FieldItem>

          <FieldItem label="生年月日">
            {isEditMode ? (
              <DatePicker
                value={dateOfBirth}
                onChange={setDateOfBirth}
                placeholder="生年月日を選択"
                className="w-full"
              />
            ) : (
              <span className="text-gray-600">
                {dateOfBirth ? dateOfBirth.toISOString().split("T")[0] : member.dateOfBirth || "-"}
              </span>
            )}
          </FieldItem>

          <FieldItem label="メールアドレス">
            {isEditMode ? (
              <Input
                type="email"
                defaultValue={member.email || ""}
                className="w-full"
                placeholder="メールアドレスを入力"
              />
            ) : (
              <span className="text-gray-600">{member.email || "-"}</span>
            )}
          </FieldItem>

          <FieldItem label="パスワード">
            <div className="pb-2">
              {isEditMode ? (
                <Input
                  type="password"
                  defaultValue={member.password || ""}
                  className="w-full"
                  placeholder="パスワードを入力"
                />
              ) : (
                <span className="text-gray-600">••••••••</span>
              )}
            </div>
          </FieldItem>
        </div>

        {/* 右カラム */}
        <div className="space-y-4">
          <FieldItem label="電話番号">
            {isEditMode ? (
              <Input
                type="tel"
                defaultValue={member.phone || ""}
                className="w-full"
                placeholder="電話番号を入力"
              />
            ) : (
              <span className="text-gray-600">{member.phone || "-"}</span>
            )}
          </FieldItem>

          <FieldItem label="FAX番号">
            {isEditMode ? (
              <Input
                type="tel"
                defaultValue={member.fax || ""}
                className="w-full"
                placeholder="FAX番号を入力"
              />
            ) : (
              <span className="text-gray-600">{member.fax || "-"}</span>
            )}
          </FieldItem>

          <FieldItem label="郵便番号">
            {isEditMode ? (
              <Input
                defaultValue={member.postalCode || ""}
                className="w-full"
                placeholder="郵便番号を入力"
              />
            ) : (
              <span className="text-gray-600">{member.postalCode || "-"}</span>
            )}
          </FieldItem>

          <FieldItem label="住所">
            {isEditMode ? (
              <Input
                defaultValue={member.address || ""}
                className="w-full"
                placeholder="住所を入力"
              />
            ) : (
              <span className="text-gray-600">{member.address || "-"}</span>
            )}
          </FieldItem>

          <FieldItem label="アカウント状態">
            {isEditMode ? (
              <Select defaultValue={member.accountStatus || "active"}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">有効</SelectItem>
                  <SelectItem value="cancelled">退会</SelectItem>
                  <SelectItem value="invalid">無効</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <span className="text-gray-600">
                {member.accountStatus === "active"
                  ? "有効"
                  : member.accountStatus === "cancelled"
                    ? "退会"
                    : member.accountStatus === "invalid"
                      ? "無効"
                      : "-"}
              </span>
            )}
          </FieldItem>
        </div>
      </div>
    </div>
  );
};
