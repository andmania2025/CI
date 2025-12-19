import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  description?: string;
  onRetry?: () => void;
  retryText?: string;
  className?: string;
}

export const ErrorDisplay = ({
  title = "エラー",
  message = "エラーが発生しました",
  description = "時間をおいて再度お試しください。",
  onRetry,
  retryText = "再読み込み",
  className = "",
}: ErrorDisplayProps) => {
  return (
    <div className={`min-h-screen flex items-center justify-center bg-slate-50 ${className}`}>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">{title}</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">{message}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        {onRetry && (
          <Button onClick={onRetry} className="hover:bg-blue-700 transition-colors">
            {retryText}
          </Button>
        )}
      </div>
    </div>
  );
};
