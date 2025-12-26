import { useCallback, useState } from "react";
import type { RealtorAnswer, RealtorAnswerFormData } from "../types";
import { INITIAL_FORM_DATA, SAMPLE_ANSWERS } from "./constants";

interface UseRealtorAnswerManagementReturn {
  // フォーム関連
  formData: RealtorAnswerFormData;
  handleInputChange: (field: string, value: string) => void;
  handleCheckboxChange: (
    category: keyof RealtorAnswerFormData,
    field: string,
    checked: boolean,
  ) => void;
  handleSearch: () => void;
  handleReset: () => void;

  // 選択関連
  selectedAnswers: string[];
  selectAll: boolean;
  handleSelectAll: (checked: boolean) => void;
  handleSelectAnswer: (answerId: string, checked: boolean) => void;

  // 削除関連
  confirmOpen: boolean;
  setConfirmOpen: (open: boolean) => void;
  handleDeleteSelected: () => void;
  executeDelete: () => void;

  // UI状態
  isSearchExpanded: boolean;
  setIsSearchExpanded: (expanded: boolean) => void;

  // データ
  answers: RealtorAnswer[];
}

export const useRealtorAnswerManagement =
  (): UseRealtorAnswerManagementReturn => {
    const [formData, setFormData] =
      useState<RealtorAnswerFormData>(INITIAL_FORM_DATA);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const answers = SAMPLE_ANSWERS;

    const handleInputChange = useCallback((field: string, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }, []);

    const handleCheckboxChange = useCallback(
      (
        category: keyof RealtorAnswerFormData,
        field: string,
        checked: boolean,
      ) => {
        setFormData((prev) => {
          const target = prev[category];
          if (
            typeof target === "object" &&
            target !== null &&
            !Array.isArray(target)
          ) {
            return {
              ...prev,
              [category]: {
                ...target,
                [field]: checked,
              },
            };
          }
          return prev;
        });
      },
      [],
    );

    const handleSearch = useCallback(() => {
      console.log("検索実行:", formData);
    }, [formData]);

    const handleReset = useCallback(() => {
      setFormData(INITIAL_FORM_DATA);
    }, []);

    const handleSelectAll = useCallback(
      (checked: boolean) => {
        setSelectAll(checked);
        if (checked) {
          setSelectedAnswers(answers.map((a) => a.id));
        } else {
          setSelectedAnswers([]);
        }
      },
      [answers],
    );

    const handleSelectAnswer = useCallback(
      (answerId: string, checked: boolean) => {
        if (checked) {
          setSelectedAnswers((prev) => [...prev, answerId]);
        } else {
          setSelectedAnswers((prev) => prev.filter((id) => id !== answerId));
          setSelectAll(false);
        }
      },
      [],
    );

    const handleDeleteSelected = useCallback(() => {
      setConfirmOpen(true);
    }, []);

    const executeDelete = useCallback(() => {
      console.log("選択された業者回答を削除:", selectedAnswers);
    }, [selectedAnswers]);

    return {
      formData,
      handleInputChange,
      handleCheckboxChange,
      handleSearch,
      handleReset,
      selectedAnswers,
      selectAll,
      handleSelectAll,
      handleSelectAnswer,
      confirmOpen,
      setConfirmOpen,
      handleDeleteSelected,
      executeDelete,
      isSearchExpanded,
      setIsSearchExpanded,
      answers,
    };
  };
