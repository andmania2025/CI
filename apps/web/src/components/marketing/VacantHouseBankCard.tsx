import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface VacantHouseBankCardProps {
  title: string;
  subtitle: string;
  cityName: string;
  prefecture: string;
}

export const VacantHouseBankCard = ({
  title,
  subtitle,
  cityName,
  prefecture,
}: VacantHouseBankCardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">{subtitle}</p>
      </div>
      <Card className="bg-linear-to-r from-blue-500 to-green-500">
        <CardContent className="p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="text-2xl">🏠</div>
            <div>
              <div className="font-bold text-lg">{title}</div>
              <div className="text-sm">
                {cityName}({prefecture})
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
