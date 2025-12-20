import { Separator } from "@/components/ui/separator";
import {
  generalCategories,
  propertyFeatureCategories,
  propertyTypeCategories,
} from "@/data/mockQuestionCategories";
import { QuestionCategoryCard } from "./QuestionCategoryCard";

export const QuestionCategoriesGrid = () => {
  return (
    <>
      <h2 className="text-xl md:text-2xl font-bold text-left mb-12 text-gray-800">
        不動産の質問を見る
      </h2>

      {/* 不動産種別の質問カテゴリー */}
      <div className="mb-20">
        <QuestionCategoryCard
          title="不動産種別の質問カテゴリー"
          imageSrc="/property_features.png"
          imageAlt="不動産種別"
          categories={propertyTypeCategories}
        />
      </div>

      {/* 罫線 */}
      <div className="mb-20">
        <Separator className="bg-gray-200" />
      </div>

      {/* 物件特徴の質問カテゴリー */}
      <div className="mb-20">
        <QuestionCategoryCard
          title="物件特徴の質問カテゴリー"
          imageSrc="/real_estate_type.png"
          imageAlt="物件特徴"
          categories={propertyFeatureCategories}
        />
      </div>

      {/* 罫線 */}
      <div className="mb-20">
        <Separator className="bg-gray-200" />
      </div>

      {/* 不動産全般の質問カテゴリー */}
      <div className="mb-20">
        <QuestionCategoryCard
          title="不動産全般の質問カテゴリー"
          imageSrc="/real-estate-general.jpg"
          imageAlt="不動産全般"
          categories={generalCategories}
        />
      </div>
    </>
  );
};
