"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { QuestionPost } from "@/data/mockQuestionPosts";
import { cn } from "@/lib/utils";
import { Clock, MessageCircle } from "lucide-react";
import type React from "react";

interface QuestionCardProps {
  question: QuestionPost;
  onClick: (questionId: string) => void;
  className?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onClick, className }) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200 text-left w-full h-auto block hover:bg-white",
        className
      )}
      onClick={() => onClick(question.id)}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-3">
          <Badge
            variant="outline"
            className="bg-[#093893] text-white border-[#093893] hover:bg-[#093893] hover:text-white"
          >
            {question.category}
          </Badge>
          <div className="flex items-center text-gray-500 text-sm gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {question.postedAt}
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-[#093893] transition-colors line-clamp-2 whitespace-normal">
          {question.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-2 whitespace-normal font-normal">
          {question.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{question.replies}件の回答</span>
          </div>
          <div className="text-gray-400">{question.views}回閲覧</div>
        </div>
      </div>
    </Button>
  );
};
