"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockQuestionPosts } from "@/data";
import { Clock, MessageCircle, User } from "lucide-react";
import Link from "next/link";

// モックデータ（分離済み）
const mockQuestions = mockQuestionPosts;

export const PostedQuestionsSection = () => {
  return (
    <section className="pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-md md:text-xl font-bold text-gray-800">
            投稿質問をみる
          </h2>
        </div>

        <div className="space-y-6">
          {mockQuestions.map((question) => (
            <Link
              key={question.id}
              href={`/question-detail?id=${question.id}`}
              className="block bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-[#093893] text-white border-[#093893] hover:bg-white hover:text-[#093893] transition-colors cursor-pointer">
                      {question.category}
                    </Badge>
                    <div className="flex items-center text-gray-500 text-sm gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {question.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {question.postedAt}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-[#093893] transition-colors">
                    {question.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {question.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{question.replies}件の回答</span>
                  </div>
                  <div className="text-gray-400">{question.views}回閲覧</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button className="px-8 py-3 text-lg bg-[#093893] text-white border border-[#093893] hover:bg-white hover:text-[#093893] transition-colors rounded-md h-auto">
            質問一覧
          </Button>
        </div>
      </div>
    </section>
  );
};
