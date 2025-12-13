"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      closeButton
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "hsl(142.1 76.2% 36.3%)",
          "--success-text": "hsl(142.1 84.5% 96.5%)",
          "--success-border": "hsl(142.1 76.2% 36.3%)",
          "--error-bg": "hsl(0 84.2% 60.2%)",
          "--error-text": "hsl(0 0% 100%)",
          "--error-border": "hsl(0 84.2% 60.2%)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
