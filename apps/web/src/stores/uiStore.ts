import { create } from "zustand";
import { persist } from "zustand/middleware";

// UI状態の型定義
interface ModalState {
  isOpen: boolean;
  content: React.ReactNode | null;
  title?: string;
}

interface DrawerState {
  isOpen: boolean;
  content: React.ReactNode | null;
  title?: string;
}

interface ToastState {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
}

interface UiState {
  // テーマ
  theme: "light" | "dark" | "system";

  // モーダル状態
  modal: ModalState;

  // ドロワー状態（モバイルナビゲーションなど）
  drawer: DrawerState;

  // トースト通知
  toasts: ToastState[];

  // ローディング状態
  globalLoading: boolean;

  // サイドバー（デスクトップ）
  sidebarCollapsed: boolean;

  // モバイル検索バー
  mobileSearchVisible: boolean;

  // アクション
  setTheme: (theme: "light" | "dark" | "system") => void;

  // モーダル操作
  openModal: (content: React.ReactNode, title?: string) => void;
  closeModal: () => void;

  // ドロワー操作
  openDrawer: (content: React.ReactNode, title?: string) => void;
  closeDrawer: () => void;

  // トースト操作
  addToast: (message: string, type?: ToastState["type"], duration?: number) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;

  // ローディング操作
  setGlobalLoading: (loading: boolean) => void;

  // サイドバー操作
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // モバイル検索操作
  toggleMobileSearch: () => void;
  setMobileSearchVisible: (visible: boolean) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      // 初期状態
      theme: "system",
      modal: {
        isOpen: false,
        content: null,
        title: undefined,
      },
      drawer: {
        isOpen: false,
        content: null,
        title: undefined,
      },
      toasts: [],
      globalLoading: false,
      sidebarCollapsed: false,
      mobileSearchVisible: false,

      // テーマ操作
      setTheme: (theme) => {
        set({ theme });
      },

      // モーダル操作
      openModal: (content, title) => {
        set({
          modal: {
            isOpen: true,
            content,
            title,
          },
        });
      },

      closeModal: () => {
        set({
          modal: {
            isOpen: false,
            content: null,
            title: undefined,
          },
        });
      },

      // ドロワー操作
      openDrawer: (content, title) => {
        set({
          drawer: {
            isOpen: true,
            content,
            title,
          },
        });
      },

      closeDrawer: () => {
        set({
          drawer: {
            isOpen: false,
            content: null,
            title: undefined,
          },
        });
      },

      // トースト操作
      addToast: (message, type = "info", duration = 5000) => {
        const id = Date.now().toString();
        const toast: ToastState = {
          id,
          message,
          type,
          duration,
        };

        set((state) => ({
          toasts: [...state.toasts, toast],
        }));

        // 自動削除
        if (duration > 0) {
          setTimeout(() => {
            get().removeToast(id);
          }, duration);
        }
      },

      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
      },

      clearToasts: () => {
        set({ toasts: [] });
      },

      // ローディング操作
      setGlobalLoading: (loading) => {
        set({ globalLoading: loading });
      },

      // サイドバー操作
      toggleSidebar: () => {
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        }));
      },

      setSidebarCollapsed: (collapsed) => {
        set({ sidebarCollapsed: collapsed });
      },

      // モバイル検索操作
      toggleMobileSearch: () => {
        set((state) => ({
          mobileSearchVisible: !state.mobileSearchVisible,
        }));
      },

      setMobileSearchVisible: (visible) => {
        set({ mobileSearchVisible: visible });
      },
    }),
    {
      name: "ui-storage",
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
        // モーダル、ドロワー、トーストは一時的な状態なので永続化しない
      }),
    }
  )
);
