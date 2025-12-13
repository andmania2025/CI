import { Building2, Users } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { StatCard } from "./StatCard";

// アイコンマッピング
const iconMap = {
  Building2: <Building2 className="w-3 h-3" />,
  Users: <Users className="w-3 h-3" />,
};

// カードデータの型定義
interface CardData {
  title: string;
  value: string;
  unit: string;
  iconType: keyof typeof iconMap;
  trend: "up" | "down";
  trendLabel: string;
  description: string;
  gradientStyle?: {
    background: string;
  };
  hoverClass?: string;
}

export const DashboardCards: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCardsData = async () => {
      try {
        setLoading(true);
        const data = await import("../_data/cards-data.json");
        setCards(data.default as CardData[]);
      } catch (error) {
        console.error("カードデータの読み込みに失敗:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCardsData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-2 sm:gap-3 px-2 sm:px-3 lg:px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 5 }, (_, index) => `skeleton-${index}`).map((key) => (
          <div key={key} className="animate-pulse">
            <div className="h-20 sm:h-24 bg-gray-200 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:gap-3 px-2 sm:px-3 lg:px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cards.map((card) => (
        <StatCard key={card.title} {...card} icon={iconMap[card.iconType]} />
      ))}
    </div>
  );
};
