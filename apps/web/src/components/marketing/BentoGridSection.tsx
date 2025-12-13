import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { realEstateFeatures } from "@/data/bento-grid-data";
import { RealEstateKnowledgeAccordion } from "./RealEstateKnowledgeAccordion";

export const BentoGridSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-7xl">
            <BentoGrid className="lg:grid-rows-3 lg:grid-cols-3">
              {realEstateFeatures.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>

            {/* アコーディオンセクション */}
            <RealEstateKnowledgeAccordion />
          </div>
        </div>
      </div>
    </section>
  );
};
