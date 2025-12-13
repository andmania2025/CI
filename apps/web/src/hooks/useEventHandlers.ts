import { useCallback, useMemo } from "react";

// 基本的なイベントハンドラーの型定義
export type EventHandler<T = void> = (params?: T) => void;
export type AsyncEventHandler<T = void> = (params?: T) => Promise<void>;

// プロパティクリック用のイベントハンドラー
export interface PropertyClickHandlers {
  onPropertyClick: (propertyId: string) => void;
  onFavoriteClick: (propertyId: string, type: "sale" | "rental") => void;
  onShareClick: (propertyId: string) => void;
  onContactClick: (propertyId: string) => void;
}

// 検索関連のイベントハンドラー
export interface SearchEventHandlers {
  onSearchSubmit: (searchData: Record<string, unknown>) => void;
  onFilterChange: (filters: Record<string, unknown>) => void;
  onSortChange: (sortBy: string) => void;
  onPageChange: (page: number) => void;
}

// お気に入り関連のイベントハンドラー
export interface FavoriteEventHandlers {
  onAddFavorite: (item: Record<string, unknown>) => Promise<void>;
  onRemoveFavorite: (id: string, type: "sale" | "rental") => Promise<void>;
  onClearAllFavorites: () => Promise<void>;
  onFilterFavorites: (filter: string) => void;
}

// 基本的なUIイベントハンドラー
export interface UIEventHandlers {
  onModalOpen: (content: React.ReactNode, title?: string) => void;
  onModalClose: () => void;
  onToastAdd: (message: string, type?: "success" | "error" | "warning" | "info") => void;
  onNavigate: (path: string) => void;
}

// プロパティクリックハンドラーのカスタムフック
export const usePropertyHandlers = (): PropertyClickHandlers => {
  const onPropertyClick = useCallback((propertyId: string) => {
    // TODO: プロパティ詳細ページへのナビゲーション
    console.log("Navigate to property:", propertyId);
  }, []);

  const onFavoriteClick = useCallback((propertyId: string, type: "sale" | "rental") => {
    // TODO: お気に入りの追加/削除ロジック
    console.log("Toggle favorite:", propertyId, type);
  }, []);

  const onShareClick = useCallback((propertyId: string) => {
    // TODO: 物件の共有機能
    if (navigator.share) {
      navigator.share({
        title: "物件を共有",
        url: `${window.location.origin}/property/${propertyId}`,
      });
    } else {
      // フォールバック: クリップボードにコピー
      navigator.clipboard.writeText(`${window.location.origin}/property/${propertyId}`);
    }
  }, []);

  const onContactClick = useCallback((propertyId: string) => {
    // TODO: お問い合わせフォームの表示
    console.log("Open contact form for property:", propertyId);
  }, []);

  return useMemo(
    () => ({
      onPropertyClick,
      onFavoriteClick,
      onShareClick,
      onContactClick,
    }),
    [onPropertyClick, onFavoriteClick, onShareClick, onContactClick]
  );
};

// 検索ハンドラーのカスタムフック
export const useSearchHandlers = (): SearchEventHandlers => {
  const onSearchSubmit = useCallback((searchData: Record<string, unknown>) => {
    // TODO: 検索処理の実行
    console.log("Execute search:", searchData);
  }, []);

  const onFilterChange = useCallback((filters: Record<string, unknown>) => {
    // TODO: フィルター変更の処理
    console.log("Update filters:", filters);
  }, []);

  const onSortChange = useCallback((sortBy: string) => {
    // TODO: ソート変更の処理
    console.log("Update sort:", sortBy);
  }, []);

  const onPageChange = useCallback((page: number) => {
    // TODO: ページ変更の処理
    console.log("Change page:", page);
  }, []);

  return useMemo(
    () => ({
      onSearchSubmit,
      onFilterChange,
      onSortChange,
      onPageChange,
    }),
    [onSearchSubmit, onFilterChange, onSortChange, onPageChange]
  );
};

// お気に入りハンドラーのカスタムフック
export const useFavoriteHandlers = (): FavoriteEventHandlers => {
  const onAddFavorite = useCallback(async (item: Record<string, unknown>) => {
    try {
      // TODO: お気に入り追加のAPI呼び出し
      console.log("Add to favorites:", item);
    } catch (error) {
      console.error("Failed to add favorite:", error);
    }
  }, []);

  const onRemoveFavorite = useCallback(async (id: string, type: "sale" | "rental") => {
    try {
      // TODO: お気に入り削除のAPI呼び出し
      console.log("Remove from favorites:", id, type);
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  }, []);

  const onClearAllFavorites = useCallback(async () => {
    try {
      if (window.confirm("すべてのお気に入りを削除しますか？")) {
        // TODO: 全お気に入り削除のAPI呼び出し
        console.log("Clear all favorites");
      }
    } catch (error) {
      console.error("Failed to clear favorites:", error);
    }
  }, []);

  const onFilterFavorites = useCallback((filter: string) => {
    // TODO: お気に入りフィルターの変更
    console.log("Filter favorites:", filter);
  }, []);

  return useMemo(
    () => ({
      onAddFavorite,
      onRemoveFavorite,
      onClearAllFavorites,
      onFilterFavorites,
    }),
    [onAddFavorite, onRemoveFavorite, onClearAllFavorites, onFilterFavorites]
  );
};

// UIハンドラーのカスタムフック
export const useUIHandlers = (): UIEventHandlers => {
  const onModalOpen = useCallback((_content: React.ReactNode, title?: string) => {
    // TODO: モーダル表示の処理（Zustand UIストア使用）
    console.log("Open modal:", title);
  }, []);

  const onModalClose = useCallback(() => {
    // TODO: モーダル閉じる処理
    console.log("Close modal");
  }, []);

  const onToastAdd = useCallback(
    (message: string, type: "success" | "error" | "warning" | "info" = "info") => {
      // TODO: トースト表示の処理（Zustand UIストア使用）
      console.log("Show toast:", message, type);
    },
    []
  );

  const onNavigate = useCallback((path: string) => {
    // TODO: ページナビゲーション
    window.location.href = path;
  }, []);

  return useMemo(
    () => ({
      onModalOpen,
      onModalClose,
      onToastAdd,
      onNavigate,
    }),
    [onModalOpen, onModalClose, onToastAdd, onNavigate]
  );
};

// キーボードイベントのヘルパー
export const useKeyboardHandlers = () => {
  const createKeyboardHandler = useCallback(
    (callback: () => void, keys: string[] = ["Enter", " "]) => {
      return (event: React.KeyboardEvent) => {
        if (keys.includes(event.key)) {
          event.preventDefault();
          callback();
        }
      };
    },
    []
  );

  const createEscapeHandler = useCallback((callback: () => void) => {
    return (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        callback();
      }
    };
  }, []);

  return useMemo(
    () => ({
      createKeyboardHandler,
      createEscapeHandler,
    }),
    [createKeyboardHandler, createEscapeHandler]
  );
};

// フォームイベントのヘルパー
export const useFormHandlers = () => {
  const createSubmitHandler = useCallback(
    (callback: (data: Record<string, FormDataEntryValue>) => void | Promise<void>) => {
      return async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        await callback(data);
      };
    },
    []
  );

  const createInputChangeHandler = useCallback(
    (callback: (value: string, name: string) => void) => {
      return (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
      ) => {
        callback(event.target.value, event.target.name);
      };
    },
    []
  );

  return useMemo(
    () => ({
      createSubmitHandler,
      createInputChangeHandler,
    }),
    [createSubmitHandler, createInputChangeHandler]
  );
};

// 全体的なイベントハンドラーの統合フック
export const useEventHandlers = () => {
  const propertyHandlers = usePropertyHandlers();
  const searchHandlers = useSearchHandlers();
  const favoriteHandlers = useFavoriteHandlers();
  const uiHandlers = useUIHandlers();
  const keyboardHandlers = useKeyboardHandlers();
  const formHandlers = useFormHandlers();

  return useMemo(
    () => ({
      property: propertyHandlers,
      search: searchHandlers,
      favorite: favoriteHandlers,
      ui: uiHandlers,
      keyboard: keyboardHandlers,
      form: formHandlers,
    }),
    [propertyHandlers, searchHandlers, favoriteHandlers, uiHandlers, keyboardHandlers, formHandlers]
  );
};
