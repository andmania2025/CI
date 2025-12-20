import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical, Plus, Search } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { MailEditDialog } from "./MailEditDialog";
import { MailSearchDialog } from "./MailSearchDialog";
import type { MailVariable } from "./MailVariableSettingsDialog";

const MailManagement: React.FC = () => {
  const [formData, setFormData] = useState({
    freeword: "",
    deliverySetting: {
      delivery: false,
      stop: false,
    },
    displayCount: "20",
  });

  const [selectedMails, setSelectedMails] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  type MailTemplate = {
    id: string;
    templateName: string;
    subject: string;
    templateType: "配信" | "停止";
    status: string;
  };

  const [editingTemplate, setEditingTemplate] = useState<MailTemplate | null>(
    null,
  );
  const [mailVariables, _setMailVariables] = useState<MailVariable[]>([
    {
      id: "var_1",
      variableName: "[name]",
      displayName: "会員名",
      description: "会員の氏名を挿入します",
      category: "user",
    },
    {
      id: "var_2",
      variableName: "[name_ruby]",
      displayName: "会員名（ふりがな）",
      description: "会員の氏名のふりがなを挿入します",
      category: "user",
    },
    {
      id: "var_3",
      variableName: "[regist]",
      displayName: "登録日時",
      description: "問い合わせ登録日時を挿入します",
      category: "system",
    },
    {
      id: "var_4",
      variableName: "[item_list]",
      displayName: "項目リスト",
      description: "問い合わせ項目のリストを挿入します",
      category: "property",
    },
    {
      id: "var_5",
      variableName: "[signature]",
      displayName: "署名",
      description: "メール署名を挿入します",
      category: "system",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // サンプルメールテンプレートデータ
  const mailTemplates: MailTemplate[] = [
    {
      id: "mt001",
      templateName: "物件問い合わせ対応メール1",
      subject:
        "【ウチカツ】カテゴリー不動産のお問い合わせありがとうございました",
      templateType: "配信",
      status: "編集",
    },
    {
      id: "mt002",
      templateName: "物件問い合わせ対応メール2",
      subject: "お問い合わせありがとうございます",
      templateType: "停止",
      status: "編集",
    },
    {
      id: "mt003",
      templateName: "物件問い合わせ対応メール3",
      subject: "お問い合わせありがとうございます",
      templateType: "停止",
      status: "編集",
    },
    {
      id: "mt004",
      templateName: "物件問い合わせ対応メール1【管理者】",
      subject: "【会員登録不動産問合せ】",
      templateType: "配信",
      status: "編集",
    },
    {
      id: "mt005",
      templateName: "物件問い合わせ対応メール2【管理者】",
      subject: "物件問い合わせを受信しました",
      templateType: "停止",
      status: "編集",
    },
    {
      id: "mt006",
      templateName: "物件問い合わせ対応メール3【管理者】",
      subject: "物件問い合わせを受信しました",
      templateType: "停止",
      status: "編集",
    },
    {
      id: "mt007",
      templateName: "物件問い合わせ対応メール　物件問合せ1",
      subject: "物件問い合わせを受信しました物件問合せ",
      templateType: "停止",
      status: "編集",
    },
    {
      id: "mt008",
      templateName: "物件問い合わせ対応メール　物件問合せ2",
      subject: "物件問い合わせを受信しました物件問合せ",
      templateType: "停止",
      status: "編集",
    },
    {
      id: "mt009",
      templateName: "物件問い合わせ対応メール　物件問合せ3",
      subject: "物件問い合わせを受信しました物件問合せ",
      templateType: "停止",
      status: "編集",
    },
    {
      id: "mt010",
      templateName: "物件問い合わせ対応メール1【不動産業者様】",
      subject:
        "ご登録頂いたウーチカツの業者登録情報について【owner_name】【owner_branch_name】様宛",
      templateType: "配信",
      status: "編集",
    },
    {
      id: "mt011",
      templateName: "物件問い合わせ対応メール2【不動産業者様】",
      subject: "物件問い合わせを受信しました【不動産業者様】",
      templateType: "停止",
      status: "編集",
    },
    {
      id: "mt012",
      templateName: "物件問い合わせ対応メール3【不動産業者様】",
      subject: "物件問い合わせを受信しました【不動産業者様】",
      templateType: "停止",
      status: "編集",
    },
    {
      id: "mt013",
      templateName: "会員登録完了メール1【会員】",
      subject: "会員登録ありがとうございました",
      templateType: "停止",
      status: "編集",
    },
    {
      id: "mt014",
      templateName: "会員登録完了メール2【会員】",
      subject: "会員登録ありがとうございました",
      templateType: "停止",
      status: "編集",
    },
    {
      id: "mt015",
      templateName: "会員登録完了メール3【会員】",
      subject: "会員登録ありがとうございました",
      templateType: "停止",
      status: "編集",
    },
    {
      id: "mt016",
      templateName: "会員登録完了通知メール1【管理者】",
      subject: "会員登録がありました",
      templateType: "停止",
      status: "編集",
    },
    {
      id: "mt017",
      templateName: "会員登録完了通知メール2【管理者】",
      subject: "会員登録がありました",
      templateType: "停止",
      status: "編集",
    },
    {
      id: "mt018",
      templateName: "会員登録完了通知メール3【管理者】",
      subject: "会員登録がありました",
      templateType: "停止",
      status: "編集",
    },
    {
      id: "mt019",
      templateName: "不動産業者登録完了メール1【不動産業者様】",
      subject:
        "ご登録頂いたウーチカツの業者登録情報についてご案内いたします。【name】【branch_name】様宛",
      templateType: "配信",
      status: "編集",
    },
    {
      id: "mt020",
      templateName: "不動産業者登録完了メール2【不動産業者様】",
      subject: "不動産業者登録ありがとうございました",
      templateType: "停止",
      status: "編集",
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (
    category: keyof typeof formData,
    field: string,
    checked: boolean,
  ) => {
    setFormData((prev) => {
      const currentCategory = prev[category];
      if (typeof currentCategory === "object" && currentCategory !== null) {
        return {
          ...prev,
          [category]: {
            ...(currentCategory as Record<string, boolean>),
            [field]: checked,
          },
        };
      }
      return prev;
    });
  };

  const handleSearch = () => {
    console.log("検索実行:", formData);
    setIsSearchModalOpen(false);
  };

  const handleReset = () => {
    setFormData({
      freeword: "",
      deliverySetting: {
        delivery: false,
        stop: false,
      },
      displayCount: "20",
    });
  };

  // 画面サイズに応じて表示件数を変更
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1536) {
        // 2xl以上
        setItemsPerPage(20);
      } else if (window.innerWidth >= 1280) {
        // xl以上
        setItemsPerPage(15);
      } else {
        setItemsPerPage(10);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // 表示件数が変更されたときに現在のページをリセット
  useEffect(() => {
    if (itemsPerPage) {
      setCurrentPage(1);
    }
  }, [itemsPerPage]);

  // ページネーション計算
  const totalPages = Math.ceil(mailTemplates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTemplates = mailTemplates.slice(startIndex, endIndex);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedMails(currentTemplates.map((m) => m.id));
    } else {
      setSelectedMails([]);
    }
  };

  const handleSelectMail = (mailId: string, checked: boolean) => {
    if (checked) {
      setSelectedMails((prev) => [...prev, mailId]);
    } else {
      setSelectedMails((prev) => prev.filter((id) => id !== mailId));
      setSelectAll(false);
    }
  };

  // 選択されているメールの配信設定状態を計算
  const selectedTemplates = mailTemplates.filter((template) =>
    selectedMails.includes(template.id),
  );
  const stoppedCount = selectedTemplates.filter(
    (template) => template.templateType === "停止",
  ).length;
  const deliveryCount = selectedTemplates.filter(
    (template) => template.templateType === "配信",
  ).length;

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 min-h-0 h-full">
      {/* アクションボタン */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* 必要に応じて他のアクションボタンをここに追加 */}
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsSearchModalOpen(true)}
              className="bg-white text-black border border-gray-300 hover:bg-gray-50"
            >
              <Search className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => {
                setEditingTemplate(null);
                setIsEditDialogOpen(true);
              }}
              className="bg-white text-black border border-gray-300 hover:bg-gray-50"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 自動メールテンプレート一覧セクション */}
      <div className="space-y-4 h-full max-h-screen flex flex-col overflow-hidden">
        {/* 説明文ボタン */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            className={`h-8 ${stoppedCount > 0 ? "bg-blue-800 text-white border-blue-800 hover:bg-blue-900 hover:text-white" : ""}`}
            onClick={() => {
              // 選択リストの配信設定を「配信」に変更の処理
              console.log("選択リストの配信設定を「配信」に変更");
            }}
            disabled={stoppedCount === 0}
          >
            選択リストの配信設定を「配信」に変更
            {stoppedCount > 0 && `（${stoppedCount}件）`}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`h-8 ${deliveryCount > 0 ? "bg-blue-800 text-white border-blue-800 hover:bg-blue-900 hover:text-white" : ""}`}
            onClick={() => {
              // 選択リストの配信設定を「停止」に変更の処理
              console.log("選択リストの配信設定を「停止」に変更");
            }}
            disabled={deliveryCount === 0}
          >
            選択リストの配信設定を「停止」に変更
            {deliveryCount > 0 && `（${deliveryCount}件）`}
          </Button>
        </div>

        {/* ページネーション情報 */}
        <div className="flex items-center justify-between w-full px-0 shrink-0">
          {/* 左端：表示件数情報 */}
          <div className="text-sm text-gray-500 whitespace-nowrap shrink-0">
            {mailTemplates.length}件中 {startIndex + 1}-
            {Math.min(endIndex, mailTemplates.length)}
            件を表示
          </div>

          {/* 右端：ページネーション */}
          <div className="flex items-center gap-2 shrink-0">
            <Pagination className="m-0">
              <PaginationContent className="flex items-center gap-2 m-0">
                {/* 前へボタン */}
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1 || totalPages <= 1}
                    className="h-8 w-16"
                  >
                    前へ
                  </Button>
                </PaginationItem>

                {/* ページ番号 */}
                <div className="flex items-center gap-1">
                  {totalPages > 0 &&
                    Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ),
                    )}
                </div>

                {/* 次へボタン */}
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages || totalPages <= 1}
                    className="h-8 w-16"
                  >
                    次へ
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/* テーブル */}
        <div className="border border-gray-200 rounded-lg overflow-hidden flex-1 min-h-0">
          <div className="h-full max-h-[calc(100vh-180px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200 bg-gray-50">
                  <TableHead className="w-12 text-center font-semibold text-gray-700 py-2 bg-gray-50">
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-left font-semibold text-gray-700 py-2 bg-gray-50">
                    テンプレート名
                  </TableHead>
                  <TableHead className="text-left font-semibold text-gray-700 py-2 bg-gray-50">
                    件名
                  </TableHead>
                  <TableHead className="text-left font-semibold text-gray-700 py-2 bg-gray-50">
                    配信設定
                  </TableHead>
                  <TableHead className="text-left font-semibold text-gray-700 py-2 bg-gray-50" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentTemplates.map((template) => (
                  <TableRow
                    key={template.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <TableCell className="text-center py-2">
                      <Checkbox
                        checked={selectedMails.includes(template.id)}
                        onCheckedChange={(checked: boolean) =>
                          handleSelectMail(template.id, checked)
                        }
                      />
                    </TableCell>
                    <TableCell className="text-left text-gray-700 py-2">
                      {template.templateName}
                    </TableCell>
                    <TableCell className="text-left text-gray-600 py-2">
                      {template.subject}
                    </TableCell>
                    <TableCell className="text-left text-gray-600 py-2">
                      <Badge
                        variant={
                          template.templateType === "配信"
                            ? "success"
                            : "neutral"
                        }
                      >
                        {template.templateType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center py-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingTemplate(template);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            編集
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* 検索ダイアログ */}
      <MailSearchDialog
        isOpen={isSearchModalOpen}
        onOpenChange={setIsSearchModalOpen}
        formData={formData}
        onFormDataChange={handleInputChange}
        onCheckboxChange={handleCheckboxChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {/* 編集ダイアログ */}
      <MailEditDialog
        isOpen={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);
          if (!open) {
            setEditingTemplate(null);
          }
        }}
        template={editingTemplate}
        variables={mailVariables}
        onSave={(data) => {
          console.log("メールテンプレートを保存:", data);
          // TODO: サーバーに保存する処理を実装
          // 新規作成の場合は mailTemplates に追加、編集の場合は更新
          setIsEditDialogOpen(false);
          setEditingTemplate(null);
        }}
      />
    </div>
  );
};

export default MailManagement;
