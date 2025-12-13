import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { privacyPolicyData } from "@/data/privacy-policy";
import { termsOfServiceData } from "@/data/terms-of-service";
import type React from "react";
import { useEffect } from "react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "terms" | "privacy";
}

/**
 * セクションコンテンツをレンダリングするコンポーネント
 */
const SectionContent: React.FC<{
  content: string[];
  list?: string[];
}> = ({ content, list }) => (
  <>
    {content.map((paragraph) => (
      <p key={paragraph.slice(0, 50)}>{paragraph}</p>
    ))}
    {list && (
      <ul className="list-decimal list-inside space-y-2 ml-4">
        {list.map((item) => (
          <li key={item.slice(0, 50)}>{item}</li>
        ))}
      </ul>
    )}
  </>
);

/**
 * 利用規約/プライバシーポリシー表示モーダル
 * コンテンツはデータファイルから読み込み
 */
export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, type }) => {
  // モーダルが開いているときにページ全体のスクロールを無効にする
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const title = type === "terms" ? "ウチカツ登録業者利用規約" : "プライバシーポリシー";

  const data = type === "terms" ? termsOfServiceData : privacyPolicyData;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:max-w-5xl md:max-w-6xl lg:max-w-7xl max-h-[80vh] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm leading-relaxed pb-4">
            {type === "privacy" && (
              <>
                <h2 className="font-bold text-lg mb-4">個人情報保護方針</h2>
                <h3 className="font-semibold text-base mb-3">
                  【ウチカツ】の個人情報の取扱いについて
                </h3>
              </>
            )}
            {data.map((section) => (
              <div key={section.title}>
                {section.title !== "前文" && (
                  <h3 className="font-semibold text-base mt-6 mb-3">{section.title}</h3>
                )}
                <SectionContent content={section.content} list={section.list} />
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose} variant="outline">
            閉じる
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
