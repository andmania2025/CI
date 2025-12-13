import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { QuestionFormData } from "@/hooks/useQuestionForm";
import { PREFECTURE_MAP } from "@/lib/constants/prefectureMap";
import { useCitiesQuery } from "@/lib/tanstack-query/queries/cities";
import type React from "react";

interface BasicInfoSectionProps {
  formData: QuestionFormData;
  errors: Record<string, string>;
  onInputChange: (field: keyof QuestionFormData, value: string | boolean) => void;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  formData,
  errors,
  onInputChange,
}) => {
  // 都道府県キーから都道府県名を取得
  const prefectureName = formData.prefecture ? PREFECTURE_MAP[formData.prefecture] : undefined;

  // TanStack Queryを使用して市区町村データを取得
  const {
    data: cityOptions = [],
    isLoading: isLoadingCities,
    error: citiesError,
  } = useCitiesQuery(prefectureName, !!formData.prefecture);

  // エラーが発生した場合はコンソールに出力（admin統合時に確認）
  if (citiesError) {
    console.error("市区町村取得エラー:", citiesError);
  }

  // 旧実装（admin統合時に確認のためコメントアウトで残す）
  // const [cityOptions, setCityOptions] = useState<CityOption[]>([]);
  // const [isLoadingCities, setIsLoadingCities] = useState(false);
  //
  // // 都道府県から市区町村を取得する関数
  // const fetchCitiesFromPrefecture = async (prefectureKey: string) => {
  //   const prefectureName = PREFECTURE_MAP[prefectureKey];
  //   if (!prefectureName) return;
  //
  //   setIsLoadingCities(true);
  //   try {
  //     const response = await fetch(`/api/cities?prefecture=${encodeURIComponent(prefectureName)}`);
  //     const result = await response.json();
  //
  //     if (result.success && result.data) {
  //       setCityOptions(result.data);
  //     } else {
  //       console.error("市区町村取得エラー:", result.error);
  //       setCityOptions([]);
  //     }
  //   } catch (error) {
  //     console.error("市区町村取得エラー:", error);
  //     setCityOptions([]);
  //   } finally {
  //     setIsLoadingCities(false);
  //   }
  // };
  //
  // // 都道府県が変更された時に市区町村を取得
  // useEffect(() => {
  //   if (formData.prefecture) {
  //     fetchCitiesFromPrefecture(formData.prefecture);
  //   } else {
  //     setCityOptions([]);
  //   }
  // }, [formData.prefecture]);
  return (
    <section>
      <div className="space-y-4">
        {/* タイトル */}
        <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-4">
          <Label
            htmlFor="title"
            className="text-foreground text-base font-medium shrink-0 flex items-center justify-between pr-2"
          >
            タイトル
            <Badge variant="destructive" className="ml-2">
              必須
            </Badge>
          </Label>
          <div className="w-full max-w-[720px]">
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => onInputChange("title", e.target.value)}
              placeholder="例）中古マンションの購入時の期について"
              required
              aria-invalid={!!errors.title}
              className={cn("w-full", errors.title && "border-red-500")}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
        </div>

        {/* 都道府県 */}
        <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-4">
          <Label className="text-foreground text-base font-medium shrink-0 flex items-center justify-between pr-2">
            都道府県
            <Badge variant="destructive" className="ml-2">
              必須
            </Badge>
          </Label>
          <div className="w-full max-w-[720px]">
            <Select
              value={
                formData.prefecture
                  ? PREFECTURE_MAP[formData.prefecture] || formData.prefecture
                  : ""
              }
              onValueChange={(value) => {
                // 日本語名から英語キーに変換
                const englishKey =
                  Object.entries(PREFECTURE_MAP).find(([_key, name]) => name === value)?.[0] ||
                  value;
                onInputChange("prefecture", englishKey);
                onInputChange("city", "");
              }}
            >
              <SelectTrigger className={cn("h-10", errors.prefecture && "border-red-500")}>
                <SelectValue placeholder="都道府県を選択してください" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PREFECTURE_MAP).map(([key, name]) => (
                  <SelectItem key={key} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.prefecture && <p className="text-red-500 text-sm mt-1">{errors.prefecture}</p>}
          </div>
        </div>

        {/* 市区町村 */}
        <div className="grid grid-cols-[3fr_7fr] items-center gap-x-6 gap-y-4">
          <Label className="text-foreground text-base font-medium shrink-0 flex items-center justify-between pr-2">
            市区町村
            <Badge variant="destructive" className="ml-2">
              必須
            </Badge>
          </Label>
          <div className="w-full max-w-[720px]">
            <Select value={formData.city} onValueChange={(value) => onInputChange("city", value)}>
              <SelectTrigger
                className={cn("h-10", errors.city && "border-red-500")}
                disabled={!formData.prefecture || isLoadingCities}
              >
                <SelectValue
                  placeholder={
                    isLoadingCities
                      ? "市区町村を取得中..."
                      : !formData.prefecture
                        ? "都道府県を先に選択"
                        : "市区町村を選択してください"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {cityOptions.map((option) => (
                  <SelectItem key={`${option.city}-${option.suburb}`} value={option.city}>
                    {option.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};
