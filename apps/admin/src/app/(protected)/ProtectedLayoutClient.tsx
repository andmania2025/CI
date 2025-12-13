"use client";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { PageTitleProvider } from "@/contexts/PageTitleContext";
import type { ReactNode } from "react";

export function ProtectedLayoutClient({ children }: { children: ReactNode }) {
  return (
    <PageTitleProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex flex-col h-screen">
          <SiteHeader />
          <div className="flex-1 min-w-0 overflow-auto">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </PageTitleProvider>
  );
}
