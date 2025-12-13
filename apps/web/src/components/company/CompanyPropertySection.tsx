import { PropertySliderSection } from "@/components/marketing/PropertySliderSection";
import type { MockProperty } from "@/data/mockProperties";
import type React from "react";

interface CompanyPropertySectionProps {
  properties: MockProperty[];
}

export const CompanyPropertySection: React.FC<CompanyPropertySectionProps> = ({ properties }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
      <PropertySliderSection title="取り扱い物件" properties={properties} />
    </div>
  );
};
