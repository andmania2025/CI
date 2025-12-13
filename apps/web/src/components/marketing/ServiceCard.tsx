import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface ServiceCardProps {
  iconSrc: string;
  title: string;
  description: string;
  alt: string;
}

export const ServiceCard = ({ iconSrc, title, description, alt }: ServiceCardProps) => {
  return (
    <Card
      className={cn(
        "text-center hover:shadow-lg transition-all duration-200 cursor-pointer hover:bg-[#093893]/5 h-52 md:h-64 shadow-md border-0 bg-transparent",
        "rounded-lg overflow-hidden"
      )}
    >
      <CardContent className="p-2 md:p-3 h-full flex flex-col justify-center">
        <div className="w-32 h-32 md:w-44 md:h-44 mx-auto -mt-4 md:-mt-6 mb-0">
          <Image
            src={iconSrc}
            alt={alt}
            width={350}
            height={350}
            className="w-full h-full object-contain"
            unoptimized={true}
          />
        </div>
        <h3 className="text-base md:text-lg font-bold text-[#093893] -mt-3 md:-mt-4 mb-1 md:mb-2">
          {title}
        </h3>
        <p className="text-xs text-gray-600 leading-tight">{description}</p>
      </CardContent>
    </Card>
  );
};
