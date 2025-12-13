import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type CheckboxCheckedState = boolean | "indeterminate";
interface StatusSectionProps {
  completionSale: {
    completion: boolean;
    sale: boolean;
  };
  registrationStatus: {
    registered: boolean;
    underReview: boolean;
  };
  publicationStatus: {
    public: boolean;
    private: boolean;
  };
  onCheckboxChange: (parentField: string, childField: string, checked: boolean) => void;
}

export const StatusSection = ({
  completionSale,
  registrationStatus,
  publicationStatus,
  onCheckboxChange,
}: StatusSectionProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* 売買・賃貸 */}
      <div className="space-y-8">
        <Label className="text-sm font-medium mb-6">売買・賃貸</Label>
        <div className="mt-2">
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sale"
                checked={completionSale.sale}
                onCheckedChange={(checked: CheckboxCheckedState) =>
                  onCheckboxChange("completionSale", "sale", checked === true)
                }
              />
              <Label htmlFor="sale" className="text-sm">
                売買
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rent"
                checked={completionSale.completion}
                onCheckedChange={(checked: CheckboxCheckedState) =>
                  onCheckboxChange("completionSale", "completion", checked === true)
                }
              />
              <Label htmlFor="rent" className="text-sm">
                賃貸
              </Label>
            </div>
          </div>
        </div>
      </div>

      {/* 注目設定 */}
      <div className="space-y-8">
        <Label className="text-sm font-medium mb-6">注目設定</Label>
        <div className="mt-2">
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={registrationStatus.registered}
                onCheckedChange={(checked: CheckboxCheckedState) =>
                  onCheckboxChange("registrationStatus", "registered", checked === true)
                }
              />
              <Label htmlFor="featured" className="text-sm">
                注目
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="normal"
                checked={registrationStatus.underReview}
                onCheckedChange={(checked: CheckboxCheckedState) =>
                  onCheckboxChange("registrationStatus", "underReview", checked === true)
                }
              />
              <Label htmlFor="normal" className="text-sm">
                通常
              </Label>
            </div>
          </div>
        </div>
      </div>

      {/* 公開範囲 */}
      <div className="space-y-8">
        <Label className="text-sm font-medium mb-6">公開範囲</Label>
        <div className="mt-2">
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="public"
                checked={publicationStatus.public}
                onCheckedChange={(checked: CheckboxCheckedState) =>
                  onCheckboxChange("publicationStatus", "public", checked === true)
                }
              />
              <Label htmlFor="public" className="text-sm">
                公開
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="private"
                checked={publicationStatus.private}
                onCheckedChange={(checked: CheckboxCheckedState) =>
                  onCheckboxChange("publicationStatus", "private", checked === true)
                }
              />
              <Label htmlFor="private" className="text-sm">
                非公開
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
