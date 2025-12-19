import { PropertyImageSlider } from "@/components/property-details/PropertyImageSlider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { searchDataService } from "@/services/searchDataService";
import type { PropertyImage } from "@/types/models";
import type { SearchOption } from "@/types/search";
import type React from "react";
import { useEffect, useState } from "react";
import type { RealtorDetailTabsProps } from "../types";

// 物件管理タブ（掲載設定タブの内容をコピー）
export const PropertiesTab: React.FC<RealtorDetailTabsProps> = ({
  realtor,
  isEditMode = false,
}) => {
  const [publicationStartDate, setPublicationStartDate] = useState<Date | undefined>(
    new Date("2024-01-01")
  );
  const [publicationEndDate, setPublicationEndDate] = useState<Date | undefined>(undefined);
  const [publicScope, setPublicScope] = useState<string>("一般公開");
  const [priorityDisplay, setPriorityDisplay] = useState<string>("なし");
  const [category, setCategory] = useState<string>("賃貸");
  const [contractValidityPeriod, setContractValidityPeriod] = useState<Date | undefined>(undefined);

  // 住所・緯度経度の状態
  const [prefecture, setPrefecture] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [latitude, _setLatitude] = useState<string>("");
  const [longitude, _setLongitude] = useState<string>("");

  // 都道府県と市区町村のオプション
  const [prefectures, setPrefectures] = useState<SearchOption[]>([]);
  const [cities, setCities] = useState<SearchOption[]>([]);

  // 画像管理の状態
  const sampleImages: PropertyImage[] = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      imageType: "EXTERIOR",
      caption: "外観写真",
      order: 1,
      isMain: true,
      uploadedAt: "2024-01-15",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      imageType: "INTERIOR",
      caption: "リビングルーム",
      order: 2,
      isMain: false,
      uploadedAt: "2024-01-15",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop",
      imageType: "FLOOR_PLAN",
      caption: "間取り図",
      order: 3,
      isMain: false,
      uploadedAt: "2024-01-15",
    },
  ];

  const [images, setImages] = useState<PropertyImage[]>(() => {
    // TODO: Realtor型にimagesプロパティを追加する
    return realtor.images && realtor.images.length > 0 ? realtor.images : sampleImages;
  });

  // 都道府県と市区町村のデータを読み込み
  useEffect(() => {
    const loadAddressOptions = async () => {
      try {
        const prefecturesData = await searchDataService.getPrefectures();
        setPrefectures(prefecturesData);
      } catch (error) {
        console.error("都道府県データの読み込みに失敗しました:", error);
      }
    };
    loadAddressOptions();
  }, []);

  // 都道府県が変更されたときに市区町村を再取得
  useEffect(() => {
    const loadCities = async () => {
      try {
        const citiesData = await searchDataService.getCities(prefecture);
        setCities(citiesData);
        // 都道府県が変更されたら市区町村をリセット
        if (prefecture) {
          setCity("");
        }
      } catch (error) {
        console.error("市区町村データの読み込みに失敗しました:", error);
      }
    };

    if (prefecture) {
      loadCities();
    } else {
      setCities([]);
      setCity("");
    }
  }, [prefecture]);

  // 日付をYYYY-MM-DD形式でフォーマット
  const formatDateToString = (date: Date | undefined): string => {
    if (!date) return "未設定";
    return date.toISOString().split("T")[0];
  };

  // Google MapsのURLを生成（緯度経度から）
  const getGoogleMapUrl = (): string => {
    if (latitude && longitude) {
      return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${latitude},${longitude}`;
    }
    // 住所から検索する場合のフォールバック
    const address = `${prefecture}${city ? city : ""}${streetAddress ? streetAddress : ""}`;
    if (address.trim()) {
      return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(address)}`;
    }
    return "";
  };

  // 画像アップロードハンドラー
  const handleImageUpload = async (files: FileList) => {
    const fileArray = Array.from(files);
    const timestamp = Date.now();

    const imagePromises = fileArray.map((file, index) => {
      return new Promise<{ file: File; url: string; index: number }>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const url = e.target?.result as string;
          resolve({ file, url, index });
        };

        reader.onerror = () => {
          reject(new Error(`Failed to read file: ${file.name}`));
        };

        reader.readAsDataURL(file);
      });
    });

    try {
      const results = await Promise.all(imagePromises);

      setImages((prev) => {
        const newImages = results.map(({ file, url, index }) => {
          const newImage: PropertyImage = {
            id: `uploaded-${timestamp}-${index}`,
            url: url,
            imageType: "EXTERIOR",
            caption: file.name,
            order: prev.length + index,
            isMain: prev.length === 0 && index === 0,
            uploadedAt: new Date().toISOString(),
          };
          return newImage;
        });
        return [...prev, ...newImages];
      });

      const fileInput = document.getElementById("image-upload") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("画像アップロードエラー:", error);
    }
  };

  // 画像削除ハンドラー
  const handleImageDelete = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  // メイン画像設定ハンドラー
  const handleSetMainImage = (imageId: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isMain: img.id === imageId,
      }))
    );
  };

  // 画像拡大ハンドラー
  const handleImageExpand = (imageId: string) => {
    // 拡大表示は必要に応じて実装
    console.log("画像拡大:", imageId);
  };

  // 画像タイトル変更ハンドラー
  const handleImageTitleChange = (imageId: string, newTitle: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === imageId ? { ...img, title: newTitle } : img))
    );
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="p-6">
          <div className="space-y-6">
            {/* 掲載設定と住所を横2カラムで配置 */}
            <div className="grid grid-cols-2 gap-6">
              {/* 左カラム: 掲載設定 */}
              <Card className="flex flex-col gap-0">
                <CardHeader className="flex-shrink-0 pb-2">
                  <CardTitle className="text-lg">掲載設定</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden px-6 py-0">
                  <div className="space-y-4 pt-2">
                    {/* 掲載カテゴリー */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <label htmlFor="category" className="text-sm font-medium">
                        掲載カテゴリー
                      </label>
                      <div>
                        {isEditMode ? (
                          <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger id="category" className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="賃貸">賃貸</SelectItem>
                              <SelectItem value="売買">売買</SelectItem>
                              <SelectItem value="新築分譲">新築分譲</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="text-sm">{category}</div>
                        )}
                      </div>
                    </div>

                    {/* 掲載開始日 */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <label htmlFor="publicationStartDate" className="text-sm font-medium">掲載開始日</label>
                      <div>
                        {isEditMode ? (
                          <DatePicker
                            id="publicationStartDate"
                            value={publicationStartDate}
                            onChange={setPublicationStartDate}
                            placeholder="掲載開始日を選択"
                            className="w-full"
                          />
                        ) : (
                          <div className="text-sm">
                            {formatDateToString(publicationStartDate) || "未設定"}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 優先表示 */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <label htmlFor="priorityDisplay" className="text-sm font-medium">
                        優先表示
                      </label>
                      <div>
                        {isEditMode ? (
                          <Select value={priorityDisplay} onValueChange={setPriorityDisplay}>
                            <SelectTrigger id="priorityDisplay" className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="なし">なし</SelectItem>
                              <SelectItem value="通常">通常</SelectItem>
                              <SelectItem value="強調">強調</SelectItem>
                              <SelectItem value="最優先">最優先</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="text-sm">{priorityDisplay}</div>
                        )}
                      </div>
                    </div>

                    {/* 公開設定 */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <label htmlFor="publicScope" className="text-sm font-medium">
                        公開設定
                      </label>
                      <div>
                        {isEditMode ? (
                          <Select value={publicScope} onValueChange={setPublicScope}>
                            <SelectTrigger id="publicScope" className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="一般公開">一般公開</SelectItem>
                              <SelectItem value="限定公開">限定公開</SelectItem>
                              <SelectItem value="非公開">非公開</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="text-sm">{publicScope}</div>
                        )}
                      </div>
                    </div>

                    {/* 掲載終了日 */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <label htmlFor="publicationEndDate" className="text-sm font-medium">掲載終了日</label>
                      <div>
                        {isEditMode ? (
                          <DatePicker
                            id="publicationEndDate"
                            value={publicationEndDate}
                            onChange={setPublicationEndDate}
                            placeholder="掲載終了日を選択"
                            className="w-full"
                          />
                        ) : (
                          <div className="text-sm">
                            {formatDateToString(publicationEndDate) || "未設定"}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 取引条件有効期限 */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <label htmlFor="contractValidityPeriod" className="text-sm font-medium">取引条件有効期限</label>
                      <div>
                        {isEditMode ? (
                          <DatePicker
                            id="contractValidityPeriod"
                            value={contractValidityPeriod}
                            onChange={setContractValidityPeriod}
                            placeholder="取引条件有効期限を選択"
                            className="w-full"
                          />
                        ) : (
                          <div className="text-sm">
                            {formatDateToString(contractValidityPeriod) || "未設定"}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 区切り線と画像登録セクション */}
                    <div className="border-t mt-6 -mx-6 px-6">
                      {/* 画像登録セクション */}
                      <div className="pt-6">
                        <h4 className="text-lg font-semibold mb-4">画像登録</h4>
                        <PropertyImageSlider
                          images={images}
                          isEditMode={isEditMode}
                          onImageUpload={handleImageUpload}
                          onImageDelete={handleImageDelete}
                          onSetMainImage={handleSetMainImage}
                          onImageExpand={handleImageExpand}
                          onImageTitleChange={handleImageTitleChange}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 右カラム: 住所 */}
              <Card className="flex flex-col gap-0">
                <CardHeader className="flex-shrink-0 pb-2">
                  <CardTitle className="text-lg">住所</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden px-6 py-0">
                  <div className="pt-2 pb-6">
                    {/* 住所入力セクション */}
                    <div className="space-y-4 mb-6">
                      {/* 都道府県 */}
                      <div className="grid grid-cols-2 gap-4 items-center">
                        <label htmlFor="prefecture" className="text-sm font-medium">
                          都道府県
                        </label>
                        <div>
                          {isEditMode ? (
                            <Select value={prefecture} onValueChange={setPrefecture}>
                              <SelectTrigger id="prefecture" className="w-full">
                                <SelectValue placeholder="選択してください" />
                              </SelectTrigger>
                              <SelectContent>
                                {prefectures.map((pref) => (
                                  <SelectItem key={pref.value} value={pref.value}>
                                    {pref.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <div className="text-sm">
                              {prefectures.find((p) => p.value === prefecture)?.label || "未設定"}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 市区町村 */}
                      <div className="grid grid-cols-2 gap-4 items-center">
                        <label htmlFor="city" className="text-sm font-medium">
                          市区町村
                        </label>
                        <div>
                          {isEditMode ? (
                            <Select value={city} onValueChange={setCity} disabled={!prefecture}>
                              <SelectTrigger id="city" className="w-full">
                                <SelectValue placeholder="都道府県を選択してください" />
                              </SelectTrigger>
                              <SelectContent>
                                {cities.map((cityOption) => (
                                  <SelectItem key={cityOption.value} value={cityOption.value}>
                                    {cityOption.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <div className="text-sm">
                              {cities.find((c) => c.value === city)?.label || "未設定"}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 町・番地 */}
                      <div className="grid grid-cols-2 gap-4 items-center">
                        <label htmlFor="streetAddress" className="text-sm font-medium">
                          町・番地
                        </label>
                        <div>
                          {isEditMode ? (
                            <Input
                              id="streetAddress"
                              value={streetAddress}
                              onChange={(e) => setStreetAddress(e.target.value)}
                              placeholder="上渡合町浜井場388番地2"
                              className="w-full"
                            />
                          ) : (
                            <div className="text-sm">{streetAddress || "未設定"}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 所在地（地図）セクション */}
                    <div className="border-t pt-6">
                      <h4 className="text-base font-semibold mb-4">所在地（地図）</h4>
                      <div className="w-full h-[400px] border rounded-lg overflow-hidden">
                        {getGoogleMapUrl() ? (
                          <iframe
                            title="物件の地図"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={getGoogleMapUrl()}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                            <p className="text-sm">住所を入力すると地図が表示されます</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
