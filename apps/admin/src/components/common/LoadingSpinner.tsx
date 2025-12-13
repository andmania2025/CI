interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner = ({
  message = "読み込み中...",
  size = "md",
  className = "",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-slate-50 ${className}`}>
      <div className="text-center">
        <div
          className={`animate-spin rounded-full border-b-2 border-blue-600 mx-auto mb-4 ${sizeClasses[size]}`}
        />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};
