"use client";

import type { MansionProperty } from "../types/property.types";
import { MansionPropertyCard } from "./MansionPropertyCard";

interface PropertyGridProps {
  properties: MansionProperty[];
}

export const PropertyGrid = ({ properties }: PropertyGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mb-8">
      {properties.map((property) => (
        <MansionPropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};
