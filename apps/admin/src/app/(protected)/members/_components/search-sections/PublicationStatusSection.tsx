import type { CheckedState } from "@radix-ui/react-checkbox";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { JSX } from "react";

interface PublicationStatusSectionProps {
  buildingStatus: {
    existing: boolean;
    underConstruction: boolean;
  };
  publicationSettings: {
    notPublished: boolean;
    public: boolean;
    private: boolean;
  };
  nextUpdateDate: boolean;
  onCheckboxChange: (parentField: string, childField: string, checked: boolean) => void;
  onFormDataChange: (field: string, value: string | boolean) => void;
}

export const PublicationStatusSection = ({
  buildingStatus,
  publicationSettings,
  nextUpdateDate,
  onCheckboxChange,
  onFormDataChange,
}: PublicationStatusSectionProps): JSX.Element => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* 掲載状況 */}
      <div className="space-y-8">
        <Label className="text-sm font-medium mb-6">掲載状況</Label>
        <div className="mt-2">
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="published"
                checked={buildingStatus.existing}
                onCheckedChange={(checked: CheckedState) =>
                  onCheckboxChange("buildingStatus", "existing", checked === true)
                }
              />
              <Label htmlFor="published" className="text-sm">
                掲載中
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="unpublished"
                checked={buildingStatus.underConstruction}
                onCheckedChange={(checked: CheckedState) =>
                  onCheckboxChange("buildingStatus", "underConstruction", checked === true)
                }
              />
              <Label htmlFor="unpublished" className="text-sm">
                非掲載
              </Label>
            </div>
          </div>
        </div>
      </div>

      {/* 公開設定 */}
      <div className="space-y-8">
        <Label className="text-sm font-medium mb-6">公開設定</Label>
        <div className="mt-2">
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="draft"
                checked={publicationSettings.notPublished}
                onCheckedChange={(checked: CheckedState) =>
                  onCheckboxChange("publicationSettings", "notPublished", checked === true)
                }
              />
              <Label htmlFor="draft" className="text-sm">
                下書き
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="publicSettings"
                checked={publicationSettings.public}
                onCheckedChange={(checked: CheckedState) =>
                  onCheckboxChange("publicationSettings", "public", checked === true)
                }
              />
              <Label htmlFor="publicSettings" className="text-sm">
                公開
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="privateSettings"
                checked={publicationSettings.private}
                onCheckedChange={(checked: CheckedState) =>
                  onCheckboxChange("publicationSettings", "private", checked === true)
                }
              />
              <Label htmlFor="privateSettings" className="text-sm">
                非公開
              </Label>
            </div>
          </div>
        </div>
      </div>

      {/* 次回更新予定日 */}
      <div className="space-y-8">
        <Label className="text-sm font-medium mb-6">次回更新予定日</Label>
        <div className="mt-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="nextUpdateDate"
              checked={nextUpdateDate}
              onCheckedChange={(checked: CheckedState) =>
                onFormDataChange("nextUpdateDate", checked === true)
              }
            />
            <Label htmlFor="nextUpdateDate" className="text-sm">
              次回更新予定日が過ぎている物件
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};
