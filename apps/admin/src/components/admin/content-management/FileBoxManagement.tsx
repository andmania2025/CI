import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
        ...(prev[category as keyof typeof prev] as Record<string, boolean>),
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
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5" />
        <h2 className="text-xl font-semibold">コンテンツ管理</h2>
        <span className="text-gray-500">ファイルBOX</span>
      </div>

      {/* ファイルBOXセクション */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* 検索アコーディオンヘッダー */}
        <button
          type="button"
          className="w-full bg-blue-700 text-white p-4 rounded-t-lg flex items-center justify-between hover:bg-blue-800 transition-colors"
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
        </button>

        {/* 検索フォーム（アコーディオン） */}
        {isSearchExpanded && (
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column */}
              <div className="col-span-6 space-y-6">
                {/* フリーワード */}
                <div className="space-y-2">
                  <Label htmlFor="freeword">フリーワード</Label>
                  <Input
                    id="freeword"
                    type="text"
                    value={formData.freeword}
                    onChange={(e) => handleInputChange("freeword", e.target.value)}
                    placeholder="キーワードで検索"
                  />
                </div>

                {/* タグリスト */}
                <div className="space-y-2">
                  <Label htmlFor="tagList">タグリスト</Label>
                  <Input
                    id="tagList"
                    type="text"
                    value={formData.tagList}
                    onChange={(e) => handleInputChange("tagList", e.target.value)}
                    placeholder="タグを入力"
                  />
                </div>

                {/* ステータス */}
                <div className="space-y-3">
                  <Label>ステータス</Label>
                  <div className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="status-normal"
                        checked={formData.status.normal}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("status", "normal", !!checked)
                        }
                      />
                      <Label htmlFor="status-normal" className="font-normal">
                        正常
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="status-notFound"
                        checked={formData.status.notFound}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("status", "notFound", !!checked)
                        }
                      />
                      <Label htmlFor="status-notFound" className="font-normal">
                        ファイル（Not Found）
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="status-notUploaded"
                        checked={formData.status.notUploaded}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("status", "notUploaded", !!checked)
                        }
                      />
                      <Label htmlFor="status-notUploaded" className="font-normal">
                        未実装（取得中）
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Empty for spacing */}
              <div className="col-span-6" />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <Button variant="outline" onClick={handleReset}>
                条件をリセット
              </Button>
              <Button onClick={handleSearch}>
                <Search className="w-4 h-4 mr-2" />
                検索する
              </Button>
            </div>
          </div>
        )}

        {/* アクションボタン */}
        <div className="p-4 border-b border-gray-200 flex gap-3 flex-wrap">
          <Button className="bg-orange-500 hover:bg-orange-600">新規ファイル追加</Button>
          <Button variant="secondary">ファイルチェック実行</Button>
          <Button variant="secondary">
            <Upload className="w-4 h-4 mr-2" />
            CSVインポート
          </Button>
          <Button variant="secondary">
            <Download className="w-4 h-4 mr-2" />
            検索結果をCSVダウンロード
          </Button>
        </div>

        {/* ファイルBOX一覧 */}
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">ファイルBOX</h3>

          {/* 選択リストを削除ボタン */}
          <div className="mb-4">
            <Button
              variant="link"
              onClick={handleDeleteSelected}
              className="text-blue-600 p-0 h-auto font-normal underline"
              disabled={selectedFiles.length === 0}
            >
              選択リストを削除
            </Button>
          </div>

          {/* ページネーション情報 */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">162件中 1-20件表示</span>
            <div className="flex gap-1">
              <Button size="sm" variant="default">
                1
              </Button>
              <Button size="sm" variant="outline">
                2
              </Button>
              <Button size="sm" variant="outline">
                3
              </Button>
              <Button size="sm" variant="outline">
                4
              </Button>
              <Button size="sm" variant="outline">
                5
              </Button>
              <span className="px-3 py-1">...</span>
              <Button size="sm" variant="outline">
                »
              </Button>
            </div>
          </div>

          {/* テーブル */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={(checked) => handleSelectAll(!!checked)}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead>ファイルタイトル</TableHead>
                  <TableHead>ファイルパス</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedFiles.includes(file.id)}
                        onCheckedChange={(checked) => handleSelectFile(file.id, !!checked)}
                        aria-label={`Select ${file.title}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {file.icon}
                        <span className="text-blue-600 hover:underline cursor-pointer">
                          {file.title}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{file.filePath}</TableCell>
                    <TableCell>{file.status}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="secondary">
                          ダウンロード
                        </Button>
                        <Button size="sm" variant="secondary">
                          編集
                        </Button>
                        <Button size="sm" variant="destructive">
                          削除
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
