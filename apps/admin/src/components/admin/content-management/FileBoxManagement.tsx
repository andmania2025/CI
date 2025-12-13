import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Download,
  File,
  FileText,
  Search,
  Star,
  Upload,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

const FileBoxManagement: React.FC = () => {
  const [formData, setFormData] = useState({
    freeword: "",
    tagList: "",
    status: {
      normal: false,
      notFound: false,
      notUploaded: false,
    },
    displayCount: "20",
  });

  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // サンプルファイルデータ
  const files = [
    {
      id: "file001",
      icon: <File className="w-5 h-5 text-gray-500" />,
      title: "各種大型店",
      filePath: "/file/Docs/form/regist.pdf",
      status: "正常",
    },
    {
      id: "file002",
      icon: <div className="w-5 h-5 bg-gray-300 rounded" />,
      title: "各種大型店",
      filePath: "/file/Docs/estate/css/img/contents_bg.png",
      status: "正常",
    },
    {
      id: "file003",
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      title: "各種大型店",
      filePath: "/file/Docs/estate/css/img/icon_alert.png",
      status: "正常",
    },
    {
      id: "file004",
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      title: "各種大型店",
      filePath: "/file/Docs/estate/css/img/icon_arrow1.png",
      status: "正常",
    },
    {
      id: "file005",
      icon: <div className="w-5 h-5 bg-gray-300 rounded" />,
      title: "各種大型店",
      filePath: "/file/Docs/estate/css/img/icon_arrow2.png",
      status: "正常",
    },
    {
      id: "file006",
      icon: <Star className="w-5 h-5 text-yellow-500" />,
      title: "各種大型店",
      filePath: "/file/Docs/estate/css/img/icon_bookmark.png",
      status: "正常",
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (category: string, field: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category as keyof typeof prev] as any),
        [field]: checked,
      },
    }));
  };

  const handleSearch = () => {
    console.log("検索実行:", formData);
  };

  const handleReset = () => {
    setFormData({
      freeword: "",
      tagList: "",
      status: {
        normal: false,
        notFound: false,
        notUploaded: false,
      },
      displayCount: "20",
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedFiles(files.map((f) => f.id));
    } else {
      setSelectedFiles([]);
    }
  };

  const handleSelectFile = (fileId: string, checked: boolean) => {
    if (checked) {
      setSelectedFiles((prev) => [...prev, fileId]);
    } else {
      setSelectedFiles((prev) => prev.filter((id) => id !== fileId));
      setSelectAll(false);
    }
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleDeleteSelected = () => {
    setConfirmOpen(true);
  };
  const executeDelete = () => {
    console.log("選択されたファイルを削除:", selectedFiles);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5" />
        <h2 className="text-xl font-semibold">コンテンツ管理</h2>
        <span className="text-gray-500">ファイルBOX</span>
      </div>

      {/* ファイルBOXセクション */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* 検索アコーディオンヘッダー */}
        <div
          className="bg-blue-700 text-white p-4 rounded-t-lg flex items-center justify-between cursor-pointer hover:bg-blue-800 transition-colors"
          onClick={() => setIsSearchExpanded(!isSearchExpanded)}
        >
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            <span className="font-medium">検索</span>
          </div>
          {isSearchExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>

        {/* 検索フォーム（アコーディオン） */}
        {isSearchExpanded && (
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column */}
              <div className="col-span-6 space-y-6">
                {/* フリーワード */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    フリーワード
                  </label>
                  <input
                    type="text"
                    value={formData.freeword}
                    onChange={(e) => handleInputChange("freeword", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="キーワードで検索"
                  />
                </div>

                {/* タグリスト */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">タグリスト</label>
                  <input
                    type="text"
                    value={formData.tagList}
                    onChange={(e) => handleInputChange("tagList", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="タグを入力"
                  />
                </div>

                {/* ステータス */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">ステータス</label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.status.normal}
                        onChange={(e) => handleCheckboxChange("status", "normal", e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm">正常</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.status.notFound}
                        onChange={(e) =>
                          handleCheckboxChange("status", "notFound", e.target.checked)
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">ファイル（Not Found）</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.status.notUploaded}
                        onChange={(e) =>
                          handleCheckboxChange("status", "notUploaded", e.target.checked)
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">未実装（取得中）</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column - Empty for spacing */}
              <div className="col-span-6" />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleReset}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                条件をリセット
              </button>
              <button
                onClick={handleSearch}
                className="px-8 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                検索する
              </button>
            </div>
          </div>
        )}

        {/* アクションボタン */}
        <div className="p-4 border-b border-gray-200 flex gap-3">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
            新規ファイル追加
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
            ファイルチェック実行
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" />
            CSVインポート
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            検索結果をCSVダウンロード
          </button>
        </div>

        {/* ファイルBOX一覧 */}
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">ファイルBOX</h3>

          {/* 選択リストを削除ボタン */}
          <div className="mb-4">
            <button
              onClick={handleDeleteSelected}
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              選択リストを削除
            </button>
          </div>

          {/* ページネーション情報 */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">162件中 1-20件表示</span>
            <div className="flex gap-1">
              <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                4
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                5
              </button>
              <span className="px-3 py-1">...</span>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                »
              </button>
            </div>
          </div>

          {/* テーブル */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th className="border border-gray-300 p-3 text-left">ファイルタイトル</th>
                  <th className="border border-gray-300 p-3 text-left">ファイルパス</th>
                  <th className="border border-gray-300 p-3 text-left">ステータス</th>
                  <th className="border border-gray-300 p-3 text-left">操作</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={(e) => handleSelectFile(file.id, e.target.checked)}
                      />
                    </td>
                    <td className="border border-gray-300 p-3 text-sm">
                      <div className="flex items-center gap-2">
                        {file.icon}
                        <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                          {file.title}
                        </span>
                      </div>
                    </td>
                    <td className="border border-gray-300 p-3 text-sm text-gray-600">
                      {file.filePath}
                    </td>
                    <td className="border border-gray-300 p-3 text-sm">{file.status}</td>
                    <td className="border border-gray-300 p-3">
                      <div className="flex gap-1">
                        <button className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600">
                          ダウンロード
                        </button>
                        <button className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600">
                          編集
                        </button>
                        <button className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">
                          削除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="選択削除の確認"
        description={`選択された ${selectedFiles.length} 件を削除します。よろしいですか？`}
        confirmText="削除する"
        onConfirm={executeDelete}
      />
    </div>
  );
};

export default FileBoxManagement;
