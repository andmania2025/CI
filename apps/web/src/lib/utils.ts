import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ドロップダウン用の共通スタイル
export const dropdownStyles = {
  trigger: {
    backgroundColor: "#003992",
    outline: "none",
    boxShadow: "none",
    border: "none",
  } as React.CSSProperties,

  handleFocusBlur: (e: React.FocusEvent<HTMLElement>) => {
    e.currentTarget.style.outline = "none";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.border = "none";
  },
};

export const toastStyles = {
  style: {
    backgroundColor: "#003992",
    color: "white",
    border: "1px solid #e0e0e0",
  },
};
