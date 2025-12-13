import type React from "react";

const MemberSettings: React.FC = () => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium mb-6">会員設定</h3>

      <div className="space-y-6">
        <div>
          <p className="text-gray-600">会員設定の項目がここに表示されます。</p>
        </div>

        <div className="pt-2 flex justify-center">
          <button className="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            保存する
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberSettings;
