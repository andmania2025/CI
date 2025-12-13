"use client";

import { LoginFormDialog } from "@/components/auth/dialogs/auth-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";

export const HeaderActions = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="flex items-center space-x-4 flex-shrink-0">
      {/* ハートアイコン - お気に入り一覧ページへのリンク */}
      <Link href="/favorites" className="block">
        <CiHeart className="w-6 h-6 text-gray-600 hover:text-[#093893] transition-colors cursor-pointer" />
      </Link>

      {/* ログインボタン */}
      <LoginFormDialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <Button
          variant="outline"
          className="bg-[#093893] text-white border-[#093893] hover:bg-white hover:text-[#093893] px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          ログイン
        </Button>
      </LoginFormDialog>
    </div>
  );
};
