import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  generalCategories,
  propertyFeatureCategories,
  propertyTypeCategories,
} from "@/data/mockQuestionCategories";
import Link from "next/link";
import { QuestionCategoryCard } from "./QuestionCategoryCard";

export const ConsultationCategoriesSection = () => {
  return (
    <section className="bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-md md:text-xl font-bold text-left mb-12 text-gray-800">
          カテゴリーを選んで質問する
        </h2>

        {/* 不動産種別の質問カテゴリー */}
        <div className="mb-16">
          <QuestionCategoryCard
            title="不動産種別の質問カテゴリー"
            imageSrc="/property_features.png"
            imageAlt="不動産種別"
            categories={propertyTypeCategories}
          />
        </div>

        {/* 罫線 */}
        <div className="mb-16">
          <Separator className="bg-gray-200" />
        </div>

        {/* 物件特徴の質問カテゴリー */}
        <div className="mb-16">
          <QuestionCategoryCard
            title="物件特徴の質問カテゴリー"
            imageSrc="/real_estate_type.png"
            imageAlt="物件特徴"
            categories={propertyFeatureCategories}
          />
        </div>

        {/* 罫線 */}
        <div className="mb-16">
          <Separator className="bg-gray-200" />
        </div>

        {/* 不動産全般の質問カテゴリー */}
        <div className="mb-16">
          <QuestionCategoryCard
            title="不動産全般の質問カテゴリー"
            imageSrc="/real-estate-general.jpg"
            imageAlt="不動産全般"
            categories={generalCategories}
          />
        </div>

        {/* 質問をするボタン */}
        <div className="text-center mt-10">
          <Button
            asChild
            size="lg"
            className="px-8 py-6 text-lg bg-white hover:bg-[#093893] hover:text-white border border-[#093893] transition-colors"
          >
            <Link href="/question-submission">質問をする</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
