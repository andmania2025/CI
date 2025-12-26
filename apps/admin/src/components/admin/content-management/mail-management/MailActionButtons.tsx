import { Button } from "@/components/ui/button";
import { memo } from "react";

interface MailActionButtonsProps {
  stoppedCount: number;
  deliveryCount: number;
  onChangeToDelivery: () => void;
  onChangeToStop: () => void;
}

/**
 * 一括操作ボタンコンポーネント
 * memo化により不要な再レンダリングを防止
 */
export const MailActionButtons = memo(function MailActionButtons({
  stoppedCount,
  deliveryCount,
  onChangeToDelivery,
  onChangeToStop,
}: MailActionButtonsProps) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <Button
        variant="outline"
        size="sm"
        className={`h-8 ${
          stoppedCount > 0
            ? "bg-blue-800 text-white border-blue-800 hover:bg-blue-900 hover:text-white"
            : ""
        }`}
        onClick={onChangeToDelivery}
        disabled={stoppedCount === 0}
      >
        選択リストの配信設定を「配信」に変更
        {stoppedCount > 0 && `（${stoppedCount}件）`}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={`h-8 ${
          deliveryCount > 0
            ? "bg-blue-800 text-white border-blue-800 hover:bg-blue-900 hover:text-white"
            : ""
        }`}
        onClick={onChangeToStop}
        disabled={deliveryCount === 0}
      >
        選択リストの配信設定を「停止」に変更
        {deliveryCount > 0 && `（${deliveryCount}件）`}
      </Button>
    </div>
  );
});
