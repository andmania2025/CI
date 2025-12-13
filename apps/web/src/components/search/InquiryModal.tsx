"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface Company {
  id: string;
  name: string;
  location: string;
  propertyTypes: string[];
  propertyFeatures: string[];
  appraisalMethods: string[];
}

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
}

interface InquiryFormData {
  name: string;
  nameFurigana: string;
  email: string;
  phone: string;
  postalCode1: string;
  postalCode2: string;
  address: string;
  inquiryTypes: {
    realEstateConsultation: boolean;
    purchaseConsultation: boolean;
    saleConsultation: boolean;
    otherInquiry: boolean;
  };
  inquiryContent: string;
  agreeToPrivacyPolicy: boolean;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, company }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: "",
    nameFurigana: "",
    email: "",
    phone: "",
    postalCode1: "",
    postalCode2: "",
    address: "",
    inquiryTypes: {
      realEstateConsultation: false,
      purchaseConsultation: false,
      saleConsultation: false,
      otherInquiry: false,
    },
    inquiryContent: "",
    agreeToPrivacyPolicy: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      inquiryTypes: {
        ...prev.inquiryTypes,
        [name]: !prev.inquiryTypes[name as keyof typeof prev.inquiryTypes],
      },
    }));
  };

  const handlePrivacyPolicyChange = () => {
    setFormData((prev) => ({
      ...prev,
      agreeToPrivacyPolicy: !prev.agreeToPrivacyPolicy,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // フォーム送信処理をここに実装
    console.log("お問い合わせ送信:", formData);
    onClose();
  };

  if (!isOpen || !company) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">お問い合わせ</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* 対象の不動産業者 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">対象の不動産業者</h3>
            <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg shrink-0" />
              <div className="flex-1">
                <h4 className="text-blue-600 font-semibold text-lg mb-2">{company.name}</h4>
                <p className="text-gray-700 mb-2">{company.location}</p>
                <p className="text-gray-600 text-sm">
                  宅地建物取引業免許 国土交通大臣(1)第000000号
                </p>
              </div>
              <Button variant="outline" size="sm">
                詳細
              </Button>
            </div>
          </div>

          {/* 不動産業者問い合わせフォーム */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">不動産業者問い合わせ</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 氏名 */}
              <div>
                <Label className="mb-2 block">
                  氏名 <span className="text-red-500">■</span>
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="例）山田 一郎"
                  className="w-full"
                  required
                />
              </div>

              {/* 氏名（フリガナ） */}
              <div>
                <Label className="mb-2 block">
                  氏名（フリガナ） <span className="text-red-500">■</span>
                </Label>
                <Input
                  type="text"
                  name="nameFurigana"
                  value={formData.nameFurigana}
                  onChange={handleInputChange}
                  placeholder="例）ヤマダ イチロウ"
                  className="w-full"
                  required
                />
              </div>

              {/* メールアドレス */}
              <div>
                <Label className="mb-2 block">
                  メールアドレス <span className="text-red-500">■</span>
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="例）xxxxxx@dream-plan.com"
                  className="w-full"
                  required
                />
              </div>

              {/* 電話番号 */}
              <div>
                <Label className="mb-2 block">
                  電話番号 <span className="text-red-500">■</span>
                </Label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="例）000-000-0000"
                  className="w-full"
                  required
                />
              </div>

              {/* 郵便番号 */}
              <div>
                <Label className="mb-2 block">
                  郵便番号 <span className="text-red-500">■</span>
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    name="postalCode1"
                    value={formData.postalCode1}
                    onChange={handleInputChange}
                    maxLength={3}
                    className="w-20 text-center"
                    required
                  />
                  <span className="text-gray-500">-</span>
                  <Input
                    type="text"
                    name="postalCode2"
                    value={formData.postalCode2}
                    onChange={handleInputChange}
                    maxLength={4}
                    className="w-24 text-center"
                    required
                  />
                </div>
              </div>

              {/* 住所 */}
              <div>
                <Label className="mb-2 block">
                  住所 <span className="text-red-500">■</span>
                </Label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="例）東京都渋谷区恵比寿1-1 ドリームマンション101"
                  className="w-full"
                  required
                />
              </div>

              {/* お問い合わせ種別 */}
              <div>
                <Label className="mb-2 block">
                  お問い合わせ種別 <span className="text-red-500">■</span>
                </Label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="realEstateConsultation"
                      checked={formData.inquiryTypes.realEstateConsultation}
                      onCheckedChange={() => handleCheckboxChange("realEstateConsultation")}
                    />
                    <Label htmlFor="realEstateConsultation" className="font-normal cursor-pointer">
                      不動産に関する相談
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="purchaseConsultation"
                      checked={formData.inquiryTypes.purchaseConsultation}
                      onCheckedChange={() => handleCheckboxChange("purchaseConsultation")}
                    />
                    <Label htmlFor="purchaseConsultation" className="font-normal cursor-pointer">
                      不動産購入の相談
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saleConsultation"
                      checked={formData.inquiryTypes.saleConsultation}
                      onCheckedChange={() => handleCheckboxChange("saleConsultation")}
                    />
                    <Label htmlFor="saleConsultation" className="font-normal cursor-pointer">
                      不動産売却の相談
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="otherInquiry"
                      checked={formData.inquiryTypes.otherInquiry}
                      onCheckedChange={() => handleCheckboxChange("otherInquiry")}
                    />
                    <Label htmlFor="otherInquiry" className="font-normal cursor-pointer">
                      その他お問い合わせ
                    </Label>
                  </div>
                </div>
              </div>

              {/* お問い合わせ内容 */}
              <div>
                <Label className="mb-2 block">
                  お問い合わせ内容 <span className="text-red-500">■</span>
                </Label>
                <Textarea
                  name="inquiryContent"
                  value={formData.inquiryContent}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full resize-vertical"
                  required
                />
              </div>

              {/* プライバシーポリシー同意 */}
              <div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="privacyPolicy"
                    checked={formData.agreeToPrivacyPolicy}
                    onCheckedChange={handlePrivacyPolicyChange}
                  />
                  <Label htmlFor="privacyPolicy" className="text-sm text-gray-700 font-normal">
                    <Button
                      variant="link"
                      type="button"
                      className="text-blue-600 hover:underline p-0 h-auto font-normal"
                      onClick={() => {
                        // プライバシーポリシーページを開く処理
                        console.log("プライバシーポリシーを開く");
                      }}
                    >
                      プライバシーポリシー
                    </Button>
                    に同意する
                  </Label>
                </div>
              </div>

              {/* 送信ボタン */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  className="px-8 py-3 text-lg font-medium"
                  disabled={!formData.agreeToPrivacyPolicy}
                >
                  送信へ
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
