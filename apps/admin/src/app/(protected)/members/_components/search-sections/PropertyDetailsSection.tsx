import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SearchOption } from "../../_data/types";

interface PropertyDetailsSectionProps {
  stations: SearchOption[];
  station: string;
  onStationChange: (value: string) => void;
  floorPlans: SearchOption[];
  floorPlan: string;
  onFloorPlanChange: (value: string) => void;
  propertyTypes: SearchOption[];
}

export const PropertyDetailsSection = ({
  stations,
  station,
  onStationChange,
  floorPlans,
  floorPlan,
  onFloorPlanChange,
  propertyTypes,
}: PropertyDetailsSectionProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* 駅 */}
      <div className="space-y-8">
        <Label htmlFor="station" className="text-sm font-medium mb-6">
          駅
        </Label>
        <div className="mt-2">
          <Select value={station} onValueChange={onStationChange}>
            <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:border-gray-300">
              <SelectValue placeholder="路線を選択してください" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              side="bottom"
              align="start"
              className="max-h-[300px] overflow-y-auto"
            >
              <SelectItem value="none">路線を選択してください</SelectItem>
              {stations.map((station) => (
                <SelectItem key={station.value} value={station.value}>
                  {station.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 間取り */}
      <div className="space-y-8">
        <Label htmlFor="floorPlan" className="text-sm font-medium mb-6">
          間取り
        </Label>
        <div className="mt-2">
          <Select value={floorPlan} onValueChange={onFloorPlanChange}>
            <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:border-gray-300">
              <SelectValue placeholder="間取りを選択" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              side="bottom"
              align="start"
              className="max-h-[200px] overflow-y-auto"
            >
              {floorPlans.map((floorPlan) => (
                <SelectItem key={floorPlan.value} value={floorPlan.value}>
                  {floorPlan.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 物件種別 */}
      <div className="space-y-8">
        <Label htmlFor="propertyType" className="text-sm font-medium mb-6">
          物件種別
        </Label>
        <div className="mt-2">
          <Select>
            <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:border-gray-300">
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              side="bottom"
              align="start"
              className="max-h-[200px] overflow-y-auto"
            >
              <SelectItem value="none">選択してください</SelectItem>
              {propertyTypes.map((propertyType) => (
                <SelectItem key={propertyType.value} value={propertyType.value}>
                  {propertyType.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
