import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp, FileText, Search } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface UserPostFormData {
  freeword: string;
  questionCategory: string;
  questionType: string;
  questionCategoryGeneral: string;
  publicStatus: {
    public: boolean;
    nonPublic: boolean;
  };
  postDateFrom: string;
  postDateTo: string;
  displayCount: string;
}

const UserPostManagement: React.FC = () => {
  const [formData, setFormData] = useState<UserPostFormData>({
    freeword: "",
    questionCategory: "",
    questionType: "",
    questionCategoryGeneral: "",
    publicStatus: {
      public: false,
      nonPublic: false,
    },
    postDateFrom: "",
    postDateTo: "",
    displayCount: "20",
  });

  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // サンプルユーザー投稿データ
  const posts = [
    {
      id: "up001",
      title: "4号地2階の洗い場に関する質問です。土地の価格について（神奈川県横浜市港南区）",
      postDate: "2025/05/22 17:42:41",
      questionCategory: "売却について",
      publicStatus: "公開",
      answerCount: 1,
    },
    {
      id: "up002",
      title: "MC（住宅建築・販売中心）",
      postDate: "2025/04/18 23:14:58",
      questionCategory: "売却について",
      publicStatus: "非公開",
      answerCount: 0,
    },
    {
      id: "up003",
      title: "MC（住宅建築・販売中心）",
      postDate: "2025/04/18 23:13:54",
      questionCategory: "売却について",
      publicStatus: "非公開",
      answerCount: 0,
    },
  ];

  const handleInputChange = (
    field: keyof Omit<UserPostFormData, "publicStatus">,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (
    category: "publicStatus",
    field: keyof UserPostFormData["publicStatus"],
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
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
      questionCategory: "",
      questionType: "",
      questionCategoryGeneral: "",
      publicStatus: {
        public: false,
        nonPublic: false,
      },
      postDateFrom: "",
      postDateTo: "",
      displayCount: "20",
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedPosts(posts.map((p) => p.id));
    } else {
      setSelectedPosts([]);
    }
  };

  const handleSelectPost = (postId: string, checked: boolean) => {
    if (checked) {
      setSelectedPosts((prev) => [...prev, postId]);
    } else {
      setSelectedPosts((prev) => prev.filter((id) => id !== postId));
      setSelectAll(false);
    }
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleDeleteSelected = () => {
    setConfirmOpen(true);
  };
  const executeDelete = () => {
    console.log("選択されたユーザー投稿を削除:", selectedPosts);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5" />
        <h2 className="text-xl font-semibold">質問管理</h2>
        <span className="text-gray-500">ユーザー投稿一覧</span>
      </div>

      {/* ユーザー投稿一覧セクション */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* 検索アコーディオンヘッダー */}
        <Button
          type="button"
          className="w-full bg-blue-700 text-white p-4 rounded-t-lg flex items-center justify-between cursor-pointer hover:bg-blue-800 transition-colors border-none"
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
        </Button>

        {/* 検索フォーム（アコーディオン） */}
        {isSearchExpanded && (
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column */}
              <div className="col-span-6 space-y-6">
                {/* フリーワード */}
                <div>
                  <Label className="mb-2 block">フリーワード</Label>
                  <Input
                    type="text"
                    value={formData.freeword}
                    onChange={(e) => handleInputChange("freeword", e.target.value)}
                    placeholder="キーワードで検索"
                  />
                </div>

                {/* 不動産種別 */}
                <div>
                  <Label className="mb-2 block">不動産種別</Label>
                  <Select
                    value={formData.questionCategory}
                    onValueChange={(value) => handleInputChange("questionCategory", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">一戸建て</SelectItem>
                      <SelectItem value="apartment">マンション</SelectItem>
                      <SelectItem value="land">土地</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 質問種別 */}
                <div>
                  <Label className="mb-2 block">質問種別</Label>
                  <Select
                    value={formData.questionType}
                    onValueChange={(value) => handleInputChange("questionType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">売却について</SelectItem>
                      <SelectItem value="purchase">購入について</SelectItem>
                      <SelectItem value="rent">賃貸について</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 質問カテゴリ（全般） */}
                <div>
                  <Label className="mb-2 block">質問カテゴリ（全般）</Label>
                  <Select
                    value={formData.questionCategoryGeneral}
                    onValueChange={(value) => handleInputChange("questionCategoryGeneral", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">一般的な質問</SelectItem>
                      <SelectItem value="technical">技術的な質問</SelectItem>
                      <SelectItem value="legal">法的な質問</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 公開状況 */}
                <div>
                  <Label className="mb-3 block">公開状況</Label>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="publicStatus-public"
                        checked={formData.publicStatus.public}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("publicStatus", "public", checked as boolean)
                        }
                      />
                      <Label htmlFor="publicStatus-public" className="font-normal">
                        公開
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="publicStatus-nonPublic"
                        checked={formData.publicStatus.nonPublic}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("publicStatus", "nonPublic", checked as boolean)
                        }
                      />
                      <Label htmlFor="publicStatus-nonPublic" className="font-normal">
                        非公開
                      </Label>
                    </div>
                  </div>
                </div>

                {/* 投稿日 */}
                <div>
                  <Label className="mb-2 block">投稿日</Label>
                  <div className="flex items-center gap-2">
                    <div className="relative w-full">
                      <Input
                        type="date"
                        value={formData.postDateFrom}
                        onChange={(e) => handleInputChange("postDateFrom", e.target.value)}
                      />
                    </div>
                    <span className="text-gray-500">〜</span>
                    <div className="relative w-full">
                      <Input
                        type="date"
                        value={formData.postDateTo}
                        onChange={(e) => handleInputChange("postDateTo", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Empty for spacing */}
              <div className="col-span-6" />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <Button
                variant="outline"
                onClick={handleReset}
                className="px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                条件をリセット
              </Button>
              <Button
                onClick={handleSearch}
                className="px-8 bg-gray-700 text-white hover:bg-gray-800 flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                検索する
              </Button>
            </div>
          </div>
        )}

        {/* ユーザー投稿一覧 */}
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">ユーザー投稿一覧</h3>

          {/* 選択リストを削除ボタン */}
          <div className="mb-4">
            <Button
              variant="link"
              onClick={handleDeleteSelected}
              className="text-blue-600 hover:text-blue-800 text-sm underline p-0 h-auto"
            >
              選択リストを削除
            </Button>
          </div>

          {/* ページネーション情報 */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">101件中 1-20件表示</span>
            <div className="flex gap-1">
              <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                1
              </Button>
              <Button size="sm" variant="outline" className="text-gray-700 border-gray-300">
                2
              </Button>
              <Button size="sm" variant="outline" className="text-gray-700 border-gray-300">
                3
              </Button>
              <Button size="sm" variant="outline" className="text-gray-700 border-gray-300">
                4
              </Button>
              <Button size="sm" variant="outline" className="text-gray-700 border-gray-300">
                5
              </Button>
              <span className="px-3 py-1">...</span>
              <Button size="sm" variant="outline" className="text-gray-700 border-gray-300">
                »
              </Button>
            </div>
          </div>

          {/* テーブル */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-3 text-left">
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                    />
                  </th>
                  <th className="border border-gray-300 p-3 text-left">質問タイトル</th>
                  <th className="border border-gray-300 p-3 text-left">投稿日</th>
                  <th className="border border-gray-300 p-3 text-left">質問状況</th>
                  <th className="border border-gray-300 p-3 text-left">回答状況</th>
                  <th className="border border-gray-300 p-3 text-left">回答数</th>
                  <th className="border border-gray-300 p-3 text-left">操作</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">
                      <Checkbox
                        checked={selectedPosts.includes(post.id)}
                        onCheckedChange={(checked) => handleSelectPost(post.id, checked as boolean)}
                      />
                    </td>
                    <td className="border border-gray-300 p-3 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                      {post.title}
                    </td>
                    <td className="border border-gray-300 p-3 text-sm">{post.postDate}</td>
                    <td className="border border-gray-300 p-3 text-sm">{post.questionCategory}</td>
                    <td className="border border-gray-300 p-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          post.publicStatus === "公開"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {post.publicStatus}
                      </span>
                    </td>
                    <td className="border border-gray-300 p-3 text-sm text-center">
                      {post.answerCount}
                    </td>
                    <td className="border border-gray-300 p-3">
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          className="bg-gray-500 hover:bg-gray-600 text-white h-7 text-xs"
                        >
                          詳細
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gray-500 hover:bg-gray-600 text-white h-7 text-xs"
                        >
                          編集
                        </Button>
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
        description={`選択された ${selectedPosts.length} 件を削除します。よろしいですか？`}
        confirmText="削除する"
        onConfirm={executeDelete}
      />
    </div>
  );
};

export default UserPostManagement;
