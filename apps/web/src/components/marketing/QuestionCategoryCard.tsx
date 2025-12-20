"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface CategoryButtonProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const CategoryButton = ({
  label,
  isActive = false,
  onClick,
}: CategoryButtonProps) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn(
        "px-2.5 text-sm border rounded-md transition-colors h-10 inline-flex items-center justify-center whitespace-nowrap",
        isActive
          ? "bg-[#093893] text-white border-[#093893]"
          : "bg-white text-[#093893] border-[#093893] hover:text-white hover:bg-[#093893]",
      )}
    >
      {label}
    </Button>
  );
};

interface QuestionCategoryCardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  categories: string[];
  activeCategory?: string;
}

export const QuestionCategoryCard = ({
  title,
  imageSrc,
  imageAlt,
  categories,
  activeCategory,
}: QuestionCategoryCardProps) => {
  const router = useRouter();

  // タイトルを分割
  const titleParts = title.split("の質問カテゴリー");
  const mainTitle = titleParts[0];
  const suffix = titleParts.length > 1 ? "の質問カテゴリー" : "";

  // カテゴリクリック時の処理
  const handleCategoryClick = (category: string) => {
    const encodedCategory = encodeURIComponent(category);
    router.push(`/question-submission?category=${encodedCategory}`);
  };

  return (
    <div>
      <div className="pl-0 pr-6 pb-6">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-1/3">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={400}
              height={300}
              className="w-full h-auto rounded-lg"
              priority={false}
              unoptimized={false}
            />
          </div>
          <div className="w-full md:w-2/3">
            <h3 className="text-xl md:text-2xl font-bold mb-6">
              <span className="text-[#093893]">{mainTitle}&nbsp;</span>
              <span className="text-gray-800 text-md md:text-lg">{suffix}</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <CategoryButton
                  key={category}
                  label={category}
                  isActive={category === activeCategory}
                  onClick={() => handleCategoryClick(category)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
