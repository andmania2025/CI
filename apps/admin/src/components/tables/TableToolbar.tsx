"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export interface TableToolbarProps {
  placeholder?: string;
  onSearch?: (q: string) => void;
  onRefresh?: () => void;
  primaryAction?: { label: string; onClick: () => void };
}

export const TableToolbar = ({
  placeholder = "検索...",
  onSearch,
  onRefresh,
  primaryAction,
}: TableToolbarProps) => {
  const [q, setQ] = useState("");

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-3 flex items-center gap-2">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch?.(q);
          }}
          placeholder={placeholder}
          className="max-w-xs"
        />
        <Button variant="secondary" onClick={() => onSearch?.(q)}>
          検索
        </Button>
        <Separator orientation="vertical" className="mx-2" />
        {onRefresh && (
          <Button variant="outline" onClick={onRefresh}>
            更新
          </Button>
        )}
        <div className="ml-auto" />
        {primaryAction && <Button onClick={primaryAction.onClick}>{primaryAction.label}</Button>}
      </div>
    </div>
  );
};
