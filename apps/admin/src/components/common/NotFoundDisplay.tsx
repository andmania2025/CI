import Link from "next/link";

interface NotFoundDisplayProps {
  title?: string;
  message?: string;
  description?: string;
  homeUrl?: string;
  homeText?: string;
  className?: string;
}

export const NotFoundDisplay = ({
  title = "404",
  message = "ページが見つかりません",
  description = "指定されたページは存在しないか、移動されました。",
  homeUrl = "/",
  homeText = "ホームに戻る",
  className = "",
}: NotFoundDisplayProps) => {
  return (
    <div className={`min-h-screen flex items-center justify-center bg-slate-50 ${className}`}>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">{message}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <Link
          href={homeUrl}
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {homeText}
        </Link>
      </div>
    </div>
  );
};
