import { useCallback, useMemo } from "react";

// アクセシビリティ属性の型定義
export interface AccessibilityProps {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-expanded"?: boolean;
  "aria-selected"?: boolean;
  "aria-disabled"?: boolean;
  "aria-hidden"?: boolean;
  "aria-live"?: "polite" | "assertive" | "off";
  "aria-atomic"?: boolean;
  role?: string;
  tabIndex?: number;
}

// フォーカス管理のプロパティ
export interface FocusProps {
  tabIndex?: number;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
}

// 物件カード用のアクセシビリティ属性
export const usePropertyCardAccessibility = (propertyTitle: string, isInteractive = true) => {
  return useMemo(() => {
    const baseProps: AccessibilityProps & FocusProps = {
      "aria-label": `${propertyTitle}の詳細を表示`,
    };

    if (isInteractive) {
      return {
        ...baseProps,
        role: "button",
        tabIndex: 0,
        onKeyDown: (event: React.KeyboardEvent) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            (event.currentTarget as HTMLElement).click();
          }
        },
      };
    }

    return baseProps;
  }, [propertyTitle, isInteractive]);
};

// ボタン用のアクセシビリティ属性
export const useButtonAccessibility = (label: string, isDisabled = false, isPressed = false) => {
  return useMemo(
    () => ({
      "aria-label": label,
      "aria-disabled": isDisabled,
      "aria-pressed": isPressed,
      tabIndex: isDisabled ? -1 : 0,
    }),
    [label, isDisabled, isPressed]
  );
};

// フォーム要素用のアクセシビリティ属性
export const useFormFieldAccessibility = (
  fieldName: string,
  isRequired = false,
  isInvalid = false,
  errorMessage?: string
) => {
  const errorId = useMemo(
    () => (errorMessage ? `${fieldName}-error` : undefined),
    [fieldName, errorMessage]
  );

  return useMemo(
    () => ({
      "aria-required": isRequired,
      "aria-invalid": isInvalid,
      "aria-describedby": errorId,
    }),
    [isRequired, isInvalid, errorId]
  );
};

// ナビゲーション用のアクセシビリティ属性
export const useNavigationAccessibility = (
  currentPath: string,
  linkPath: string,
  linkLabel: string
) => {
  return useMemo(
    () => ({
      "aria-label": linkLabel,
      "aria-current": currentPath === linkPath ? "page" : undefined,
    }),
    [currentPath, linkPath, linkLabel]
  );
};

// モーダル用のアクセシビリティ属性
export const useModalAccessibility = (
  isOpen: boolean,
  titleId?: string,
  descriptionId?: string
) => {
  return useMemo(
    () => ({
      role: "dialog",
      "aria-modal": true,
      "aria-hidden": !isOpen,
      "aria-labelledby": titleId,
      "aria-describedby": descriptionId,
      tabIndex: -1,
    }),
    [isOpen, titleId, descriptionId]
  );
};

// リスト用のアクセシビリティ属性
export const useListAccessibility = (totalItems: number, listType: "grid" | "list" = "list") => {
  return useMemo(
    () => ({
      role: listType === "grid" ? "grid" : "list",
      "aria-label": `${totalItems}件の物件リスト`,
    }),
    [totalItems, listType]
  );
};

// 検索結果用のアクセシビリティ属性
export const useSearchResultsAccessibility = (
  resultsCount: number,
  isLoading = false,
  query?: string
) => {
  const ariaLabel = useMemo(() => {
    if (isLoading) {
      return "検索結果を読み込んでいます";
    }
    if (query) {
      return `"${query}"の検索結果: ${resultsCount}件`;
    }
    return `検索結果: ${resultsCount}件`;
  }, [resultsCount, isLoading, query]);

  return useMemo(
    () => ({
      role: "region",
      "aria-label": ariaLabel,
      "aria-live": "polite",
      "aria-atomic": true,
    }),
    [ariaLabel]
  );
};

// お気に入りボタン用のアクセシビリティ属性
export const useFavoriteButtonAccessibility = (isFavorite: boolean, propertyTitle: string) => {
  const ariaLabel = useMemo(
    () =>
      isFavorite ? `${propertyTitle}をお気に入りから削除` : `${propertyTitle}をお気に入りに追加`,
    [isFavorite, propertyTitle]
  );

  return useMemo(
    () => ({
      "aria-label": ariaLabel,
      "aria-pressed": isFavorite,
      role: "button",
      tabIndex: 0,
    }),
    [ariaLabel, isFavorite]
  );
};

// ページネーション用のアクセシビリティ属性
export const usePaginationAccessibility = (currentPage: number, totalPages: number) => {
  return useMemo(
    () => ({
      role: "navigation",
      "aria-label": `ページネーション、現在のページ: ${currentPage} / ${totalPages}`,
    }),
    [currentPage, totalPages]
  );
};

// ドロップダウン用のアクセシビリティ属性
export const useDropdownAccessibility = (isOpen: boolean, triggerId: string, listId: string) => {
  return useMemo(
    () => ({
      trigger: {
        "aria-expanded": isOpen,
        "aria-haspopup": true,
        "aria-controls": listId,
        id: triggerId,
      },
      list: {
        role: "listbox",
        id: listId,
        "aria-labelledby": triggerId,
        "aria-hidden": !isOpen,
      },
    }),
    [isOpen, triggerId, listId]
  );
};

// フォーカストラップのヘルパー
export const useFocusTrap = (isActive: boolean) => {
  const trapFocus = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isActive || event.key !== "Tab") return;

      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0] as HTMLElement;
      const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable.focus();
        }
      }
    },
    [isActive]
  );

  return { onKeyDown: trapFocus };
};

// スクリーンリーダー用のライブリージョン
export const useLiveRegion = (message: string, priority: "polite" | "assertive" = "polite") => {
  return useMemo(
    () => ({
      "aria-live": priority,
      "aria-atomic": true,
      role: "status",
      className: "sr-only", // スクリーンリーダー専用（視覚的に非表示）
      children: message,
    }),
    [message, priority]
  );
};

// 色彩コントラストのチェック（開発時のヘルパー）
export const useContrastChecker = () => {
  const checkContrast = useCallback((foreground: string, background: string) => {
    // 実際のプロダクションでは、より高度なコントラスト計算ライブラリを使用
    console.warn("色彩コントラストの確認が必要です:", {
      foreground,
      background,
    });
    // TODO: 実際のコントラスト比計算を実装
  }, []);

  return { checkContrast };
};

// まとめて提供するメインフック
export const useAccessibility = () => {
  return {
    propertyCard: usePropertyCardAccessibility,
    button: useButtonAccessibility,
    formField: useFormFieldAccessibility,
    navigation: useNavigationAccessibility,
    modal: useModalAccessibility,
    list: useListAccessibility,
    searchResults: useSearchResultsAccessibility,
    favoriteButton: useFavoriteButtonAccessibility,
    pagination: usePaginationAccessibility,
    dropdown: useDropdownAccessibility,
    focusTrap: useFocusTrap,
    liveRegion: useLiveRegion,
    contrastChecker: useContrastChecker,
  };
};
