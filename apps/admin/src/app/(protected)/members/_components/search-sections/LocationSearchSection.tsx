import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SearchOption } from "../../_data/types";

interface LocationSearchSectionProps {
  prefectures: SearchOption[];
  prefecture: string;
  onPrefectureChange: (value: string) => void;
  cities: SearchOption[];
  city: string;
  onCityChange: (value: string) => void;
  routes: SearchOption[];
  route: string;
  onRouteChange: (value: string) => void;
}

export const LocationSearchSection = ({
  prefectures,
  prefecture,
  onPrefectureChange,
  cities,
  city,
  onCityChange,
  routes,
  route,
  onRouteChange,
}: LocationSearchSectionProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* 都道府県 */}
      <div className="space-y-8">
        <Label htmlFor="prefecture" className="text-sm font-medium mb-6">
          都道府県
        </Label>
        <div className="mt-2">
          <Select value={prefecture} onValueChange={onPrefectureChange}>
            <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:border-gray-300">
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              side="bottom"
              align="start"
              className="max-h-[300px] overflow-y-auto"
            >
              {prefectures.map((prefecture) => (
                <SelectItem key={prefecture.value} value={prefecture.value}>
                  {prefecture.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 市区町村 */}
      <div className="space-y-8">
        <Label htmlFor="city" className="text-sm font-medium mb-6">
          市区町村
        </Label>
        <div className="mt-2">
          <Select value={city} onValueChange={onCityChange}>
            <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:border-gray-300">
              <SelectValue placeholder="都道府県を選択してください" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              side="bottom"
              align="start"
              className="max-h-[300px] overflow-y-auto"
            >
              <SelectItem value="none">都道府県を選択してください</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city.value} value={city.value}>
                  {city.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 路線 */}
      <div className="space-y-8">
        <Label htmlFor="route" className="text-sm font-medium mb-6">
          路線
        </Label>
        <div className="mt-2">
          <Select value={route} onValueChange={onRouteChange}>
            <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:border-gray-300">
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              side="bottom"
              align="start"
              className="max-h-[300px] overflow-y-auto"
            >
              <SelectItem value="none">選択してください</SelectItem>
              {routes.map((route) => (
                <SelectItem key={route.value} value={route.value}>
                  {route.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
