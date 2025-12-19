import { useEffect, useState } from "react";

export interface QuestionFormData {
  title: string;
  prefecture: string;
  city: string;
  questionCategory: string;
  realEstateType: string;
  propertyFeature: string;
  nickname: string;
  email: string;
  content: string;
  agreeToTerms: boolean;
  furigana: string;
  phone: string;
  address: string;
  inquiryType: string;
}

interface UseQuestionFormProps {
  isInquiryMode?: boolean;
  selectedCategory?: string | null;
}

export const useQuestionForm = ({
  isInquiryMode = false,
  selectedCategory = null,
}: UseQuestionFormProps = {}) => {
  const [formData, setFormData] = useState<QuestionFormData>({
    title: "",
    prefecture: "",
    city: "",
    questionCategory: "",
    realEstateType: "",
    propertyFeature: "",
    nickname: "",
    email: "",
    content: "",
    agreeToTerms: false,
    furigana: "",
    phone: "",
    address: "",
    inquiryType: "",
  });

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "terms" | "privacy" | null;
  }>({
    isOpen: false,
    type: null,
  });

  const [hasViewedTerms, setHasViewedTerms] = useState(false);
  const [hasViewedPrivacy, setHasViewedPrivacy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // selectedCategoryが存在する場合、フォームの初期値を設定
  useEffect(() => {
    if (selectedCategory) {
      setFormData((prev) => ({
        ...prev,
        questionCategory: selectedCategory,
      }));
    }
  }, [selectedCategory]);

  const handleInputChange = (field: keyof QuestionFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const openModal = (type: "terms" | "privacy") => {
    setModalState({ isOpen: true, type });
    if (type === "terms") {
      setHasViewedTerms(true);
    } else {
      setHasViewedPrivacy(true);
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  const canCheckAgreement = hasViewedTerms && hasViewedPrivacy;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const isEmpty = (v: string) => !v || v.trim().length === 0;

    if (isInquiryMode) {
      // お問い合わせモードのバリデーション
      if (isEmpty(formData.nickname)) newErrors.nickname = "必須項目です";
      if (isEmpty(formData.furigana)) newErrors.furigana = "必須項目です";
      if (isEmpty(formData.email)) newErrors.email = "必須項目です";
      if (isEmpty(formData.phone)) newErrors.phone = "必須項目です";
      if (isEmpty(formData.address)) newErrors.address = "必須項目です";
      if (isEmpty(formData.inquiryType)) newErrors.inquiryType = "必須項目です";
      if (isEmpty(formData.content)) newErrors.content = "必須項目です";
    } else {
      // 質問投稿モードのバリデーション
      if (isEmpty(formData.title)) newErrors.title = "必須項目です";
      if (isEmpty(formData.prefecture)) newErrors.prefecture = "必須項目です";
      if (isEmpty(formData.city)) newErrors.city = "必須項目です";
      if (isEmpty(formData.questionCategory)) newErrors.questionCategory = "必須項目です";
      if (isEmpty(formData.realEstateType)) newErrors.realEstateType = "必須項目です";
      if (isEmpty(formData.propertyFeature)) newErrors.propertyFeature = "必須項目です";
      if (isEmpty(formData.nickname)) newErrors.nickname = "必須項目です";
      if (isEmpty(formData.email)) newErrors.email = "必須項目です";
      if (isEmpty(formData.content)) newErrors.content = "必須項目です";
    }

    if (!formData.agreeToTerms) newErrors.agreeToTerms = "同意が必要です";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    // TODO: ここで質問投稿の処理を実装
  };

  return {
    formData,
    setFormData,
    errors,
    modalState,
    hasViewedTerms,
    hasViewedPrivacy,
    canCheckAgreement,
    handleInputChange,
    openModal,
    closeModal,
    validate,
    handleSubmit,
  };
};
