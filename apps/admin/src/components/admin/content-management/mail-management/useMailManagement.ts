import { useCallback, useEffect, useMemo, useState } from "react";
import { MOCK_MAIL_TEMPLATES } from "./mockData";
import {
  DEFAULT_MAIL_VARIABLES,
  INITIAL_FORM_DATA,
  type MailFormData,
  type MailTemplate,
} from "./types";

/**
 * メール管理機能のカスタムフック
 * ロジックをUIから分離し、テスタビリティと再利用性を向上
 */
export function useMailManagement() {
  // フォームデータ
  const [formData, setFormData] = useState<MailFormData>(INITIAL_FORM_DATA);

  // 選択状態
  const [selectedMails, setSelectedMails] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // ダイアログ状態
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<MailTemplate | null>(
    null
  );

  // メールテンプレートデータ（将来的にはAPIから取得）
  const [mailTemplates] = useState<MailTemplate[]>(MOCK_MAIL_TEMPLATES);

  // メール変数
  const mailVariables = DEFAULT_MAIL_VARIABLES;

  // ページネーション
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 画面サイズに応じて表示件数を変更
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1536) {
        setItemsPerPage(20);
      } else if (window.innerWidth >= 1280) {
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
    setCurrentPage(1);
  }, [itemsPerPage]);

  // ページネーション計算（メモ化）
  const pagination = useMemo(() => {
    const totalPages = Math.ceil(mailTemplates.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTemplates = mailTemplates.slice(startIndex, endIndex);

    return {
      totalPages,
      startIndex,
      endIndex,
      currentTemplates,
      totalItems: mailTemplates.length,
    };
  }, [mailTemplates, currentPage, itemsPerPage]);

  // 選択されているメールの配信設定状態を計算（メモ化）
  const selectionStats = useMemo(() => {
    const selectedTemplates = mailTemplates.filter((template) =>
      selectedMails.includes(template.id)
    );
    const stoppedCount = selectedTemplates.filter(
      (template) => template.templateType === "停止"
    ).length;
    const deliveryCount = selectedTemplates.filter(
      (template) => template.templateType === "配信"
    ).length;

    return { stoppedCount, deliveryCount };
  }, [mailTemplates, selectedMails]);

  // ハンドラー関数（useCallbackでメモ化）
  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleCheckboxChange = useCallback(
    (category: keyof MailFormData, field: string, checked: boolean) => {
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
    },
    []
  );

  const handleSearch = useCallback(() => {
    console.log("検索実行:", formData);
    setIsSearchModalOpen(false);
  }, [formData]);

  const handleReset = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
  }, []);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectAll(checked);
      if (checked) {
        setSelectedMails(pagination.currentTemplates.map((m) => m.id));
      } else {
        setSelectedMails([]);
      }
    },
    [pagination.currentTemplates]
  );

  const handleSelectMail = useCallback((mailId: string, checked: boolean) => {
    if (checked) {
      setSelectedMails((prev) => [...prev, mailId]);
    } else {
      setSelectedMails((prev) => prev.filter((id) => id !== mailId));
      setSelectAll(false);
    }
  }, []);

  const handleOpenNewTemplate = useCallback(() => {
    setEditingTemplate(null);
    setIsEditDialogOpen(true);
  }, []);

  const handleOpenEditTemplate = useCallback((template: MailTemplate) => {
    setEditingTemplate(template);
    setIsEditDialogOpen(true);
  }, []);

  const handleCloseEditDialog = useCallback((open: boolean) => {
    setIsEditDialogOpen(open);
    if (!open) {
      setEditingTemplate(null);
    }
  }, []);

  const handleSaveTemplate = useCallback(
    (data: Record<string, unknown>) => {
      console.log("メールテンプレートを保存:", data);
      // TODO: サーバーに保存する処理を実装
      setIsEditDialogOpen(false);
      setEditingTemplate(null);
    },
    []
  );

  const handleChangeToDelivery = useCallback(() => {
    console.log("選択リストの配信設定を「配信」に変更");
    // TODO: 配信設定変更処理を実装
  }, []);

  const handleChangeToStop = useCallback(() => {
    console.log("選択リストの配信設定を「停止」に変更");
    // TODO: 配信停止設定変更処理を実装
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    // 状態
    formData,
    selectedMails,
    selectAll,
    isSearchModalOpen,
    isEditDialogOpen,
    editingTemplate,
    mailVariables,
    currentPage,
    pagination,
    selectionStats,

    // セッター
    setIsSearchModalOpen,

    // ハンドラー
    handleInputChange,
    handleCheckboxChange,
    handleSearch,
    handleReset,
    handleSelectAll,
    handleSelectMail,
    handleOpenNewTemplate,
    handleOpenEditTemplate,
    handleCloseEditDialog,
    handleSaveTemplate,
    handleChangeToDelivery,
    handleChangeToStop,
    handlePageChange,
  };
}
