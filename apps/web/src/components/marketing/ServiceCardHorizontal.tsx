import Image from "next/image";
import React from "react";

interface ServiceCardHorizontalProps {
  iconSrc: string;
  title: string;
  description: string;
  alt: string;
}

export const ServiceCardHorizontal = ({
  iconSrc,
  title,
  description,
  alt,
}: ServiceCardHorizontalProps) => {
  return (
    <div className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:bg-[#093893]/5 w-full text-center md:text-left h-52 md:h-48 shadow-md">
      <div className="p-2 md:p-4 h-full flex items-center">
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-4 space-y-1 md:space-y-0 w-full">
          <div className="w-32 h-32 md:w-44 md:h-44 flex-shrink-0 -mt-4 md:mt-0 mb-0 md:mb-0">
            <Image
              src={iconSrc}
              alt={alt}
              width={350}
              height={350}
              className="w-full h-full object-contain"
              unoptimized={true}
            />
          </div>
          <div className="flex-1 -mt-3 md:mt-0">
            <h3 className="text-base md:text-lg font-bold text-[#093893] mb-1 md:mb-2">{title}</h3>
            <p className="text-xs md:text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
