"use client";

import type { ReactNode } from "react";

import { TRPCReactProvider } from "@/components/providers/TRPCProvider";

export function Providers({ children }: { children: ReactNode }) {
  return <TRPCReactProvider>{children}</TRPCReactProvider>;
}
