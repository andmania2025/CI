import { Save, User } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

const LoginInfoPage: React.FC = () => {
  const [formData, setFormData] = useState({
    loginId: "admin",
    loginPassword: "",
    ipAddressRestriction: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "ログイン情報 - ウチカツ管理システム";
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("ログイン情報を保存:", formData);
    // 保存処理をここに実装
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <User className="w-5 h-5" />
        <h2 className="text-xl font-semibold">ログイン情報</h2>
        <span className="text-gray-500">ログイン情報変更</span>
      </div>

      {/* ログイン情報変更セクション */}
      <div className="bg-white rounded-lg shadow-sm max-w-2xl">
        <div className="p-6">
          <h3 className="text-lg font-medium mb-6">ログイン情報</h3>

          <div className="space-y-6">
            {/* ログインID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ログインID <span className="text-red-500">*必須</span>
              </label>
              <input
                type="text"
                value={formData.loginId}
                onChange={(e) => handleInputChange("loginId", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ログインIDを入力してください。"
              />
            </div>

            {/* ログインパスワード */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ログインパスワード <span className="text-red-500">*必須</span>
              </label>
              <input
                type="password"
                value={formData.loginPassword}
                onChange={(e) => handleInputChange("loginPassword", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ログインパスワードを入力してください。"
              />
            </div>

            {/* IPアドレス制限 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">IPアドレス制限</label>
              <textarea
                value={formData.ipAddressRestriction}
                onChange={(e) => handleInputChange("ipAddressRestriction", e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="IPアドレス制限を入力してください。"
              />
              <div className="mt-2 text-sm text-gray-600">
                <p>※複数のIPアドレスを設定する場合は、改行で区切ってください。</p>
                <p>
                  ※IPアドレスを空欄にすると制限は無効になります。（制限なしの場合、制限なしとなります。）
                </p>
                <p>※グローバルIPアドレスを入力してください。プライベートIPは設定できません。</p>
              </div>
            </div>
          </div>

          {/* 保存ボタン */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              確認する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginInfoPage;
