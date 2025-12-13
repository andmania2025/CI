import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  trend: "up" | "down";
  trendLabel: string;
  description: string;
  gradientStyle?: React.CSSProperties;
  hoverClass?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  icon,
  trend,
  trendLabel,
  description,
  gradientStyle,
  hoverClass = "",
}) => {
  const TrendIcon = trend === "up" ? IconTrendingUp : IconTrendingDown;

  return (
    <Card
      className={`@container/card transition-all duration-300 ease-in-out ${hoverClass}`}
      style={gradientStyle}
    >
      <CardHeader className="pb-2 pt-2 sm:pt-3">
        <CardDescription className="text-xs sm:text-sm mb-1 sm:mb-2">
          {String(title)}
        </CardDescription>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-semibold tabular-nums @[250px]/card:text-2xl">
            {String(value)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {icon}
              {String(unit)}
            </Badge>
          </CardAction>
        </div>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-xs pt-1 sm:pt-2 pb-2 sm:pb-3">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {String(trendLabel)} <TrendIcon className="size-3" />
        </div>
        <div className="text-muted-foreground line-clamp-2">{String(description)}</div>
      </CardFooter>
    </Card>
  );
};
