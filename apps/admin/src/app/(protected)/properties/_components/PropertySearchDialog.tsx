import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { api } from "@/utils/api";
import { Search } from "lucide-react";
import type React from "react";
import { BasicSearchSection } from "./search-sections/BasicSearchSection";
import { LocationSearchSection } from "./search-sections/LocationSearchSection";
import { PropertyDetailsSection } from "./search-sections/PropertyDetailsSection";
import { PublicationStatusSection } from "./search-sections/PublicationStatusSection";
import { StatusSection } from "./search-sections/StatusSection";
import type { PropertySearchDialogProps } from "./types";

export const PropertySearchDialog: React.FC<PropertySearchDialogProps> = ({
  isOpen,
  onOpenChange,
  formData,
  onFormDataChange,
  onCheckboxChange,
  onSearch,
  onReset,
}) => {
  // tRPC hooks
  const { data: areas = [] } = api.search.getAreas.useQuery();
  const { data: prefectures = [] } = api.search.getPrefectures.useQuery();
  const { data: cities = [] } = api.search.getCities.useQuery(
    { prefecture: formData.prefecture },
    { enabled: !!formData.prefecture }
  );
  const { data: routes = [] } = api.search.getRoutes.useQuery();
  const { data: stations = [] } = api.search.getStations.useQuery({});
  const { data: floorPlans = [] } = api.search.getFloorPlans.useQuery();
  const { data: propertyTypes = [] } = api.search.getPropertyTypes.useQuery();
  const { data: realEstateCompanies = [] } = api.search.getRealEstateCompanies.useQuery();

  // Combine into searchOptions object to match existing prop passing structure if needed,
  // or just pass directly.
  const searchOptions = {
    areas,
    prefectures,
    cities,
    routes,
    stations,
    floorPlans,
    propertyTypes,
    realEstateCompanies,
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[60vw] !w-[60vw] max-h-[90vh] h-[90vh] overflow-hidden sm:!max-w-[60vw] md:!max-w-[60vw] lg:!max-w-[60vw] xl:!max-w-[60vw] 2xl:!max-w-[60vw]">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg font-semibold">検索条件</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 px-2">
          <div className="space-y-8">
            {/* 基本検索条件 - 3カラム */}
            <BasicSearchSection
              freeword={formData.freeword}
              onFreewordChange={(value) => onFormDataChange("freeword", value)}
              realEstateCompanies={searchOptions.realEstateCompanies}
              areas={searchOptions.areas}
              area={formData.area}
              onAreaChange={(value) => onFormDataChange("area", value)}
            />

            {/* 地域検索条件 - 3カラム */}
            <LocationSearchSection
              prefectures={searchOptions.prefectures}
              prefecture={formData.prefecture}
              onPrefectureChange={(value) => onFormDataChange("prefecture", value)}
              cities={searchOptions.cities}
              city={formData.city}
              onCityChange={(value) => onFormDataChange("city", value)}
              routes={searchOptions.routes}
              route={formData.route}
              onRouteChange={(value) => onFormDataChange("route", value)}
            />

            {/* 物件詳細条件 - 3カラム */}
            <PropertyDetailsSection
              stations={searchOptions.stations}
              station={formData.station}
              onStationChange={(value) => onFormDataChange("station", value)}
              floorPlans={searchOptions.floorPlans}
              floorPlan={formData.floorPlan}
              onFloorPlanChange={(value) => onFormDataChange("floorPlan", value)}
              propertyTypes={searchOptions.propertyTypes}
            />

            {/* 売買・賃貸、注目設定、公開範囲 - 3カラム */}
            <StatusSection
              completionSale={formData.completionSale}
              registrationStatus={formData.registrationStatus}
              publicationStatus={formData.publicationStatus}
              onCheckboxChange={onCheckboxChange}
            />

            {/* 掲載状況、公開設定、次回更新予定日 - 3カラム */}
            <PublicationStatusSection
              buildingStatus={formData.buildingStatus}
              publicationSettings={formData.publicationSettings}
              nextUpdateDate={formData.nextUpdateDate}
              onCheckboxChange={onCheckboxChange}
              onFormDataChange={(field, value) => onFormDataChange(field, value as string)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4 flex-shrink-0">
          <Button variant="outline" onClick={onReset}>
            クリア
          </Button>
          <Button
            onClick={onSearch}
            className="flex items-center gap-2 bg-black text-white hover:bg-black/90"
          >
            <Search className="w-4 h-4" />
            検索
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
