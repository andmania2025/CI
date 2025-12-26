import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Calendar as CalendarIcon, Download, Search } from "lucide-react";
import type React from "react";

interface PropertyInquirySearchFormProps {
  formData: {
    freeword: string;
    realEstateCompany: string;
    inquirerName: string;
    gender: {
      male: boolean;
      female: boolean;
    };
    actualGender: {
      male: boolean;
      female: boolean;
    };
    inquiryType: {
      wantToSee: boolean;
      wantToKnow: boolean;
      wantToConsult: boolean;
      wantToVisit: boolean;
      wantToContact: boolean;
      wantToInquire: boolean;
      wantToRequest: boolean;
      wantToAsk: boolean;
      wantToCheck: boolean;
    };
    selectedInquiryType: string;
    inquiryDateFrom: string;
    inquiryDateTo: string;
  };
  isDetailSearchOpen: boolean;
  onInputChange: (field: string, value: string) => void;
  onDetailSearchOpenChange: (open: boolean) => void;
  onDetailSearch: () => void;
  onReset: () => void;
}

export const PropertyInquirySearchForm: React.FC<PropertyInquirySearchFormProps> = ({
  formData,
  isDetailSearchOpen,
  onInputChange,
  onDetailSearchOpenChange,
  onDetailSearch,
  onReset,
}) => {
  return (
    <div className="flex justify-between items-baseline mb-1">
      <h3 className="text-lg font-medium leading-none">物件問い合わせ</h3>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          CSV ダウンロード
        </Button>
        <Dialog open={isDetailSearchOpen} onOpenChange={onDetailSearchOpenChange}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              検索
            </Button>
          </DialogTrigger>
          <DialogContent
            className="max-w-4xl max-h-[85vh] rounded-3xl shadow-2xl border-neutral-200 bg-white p-0"
            showCloseButton={false}
          >
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center shrink-0">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <DialogTitle className="text-lg font-semibold mb-2 text-neutral-900">
                    検索
                  </DialogTitle>
                  <DialogDescription className="text-neutral-600 text-sm leading-relaxed">
                    詳細な条件で問い合わせを検索できます。
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="px-6 pb-6">
              <div className="grid grid-cols-2 gap-6">
                {/* 左列 */}
                <div className="space-y-4">
                  {/* 不動産業者名 */}
                  <div>
                    <Label className="block text-sm font-medium mb-2 text-neutral-900">
                      不動産業者名
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="realEstateCompany"
                        type="text"
                        value={formData.realEstateCompany}
                        onChange={(e) => onInputChange("realEstateCompany", e.target.value)}
                        placeholder="不動産業者名を検索"
                        className="w-full pl-10 h-10 rounded-lg border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                      />
                    </div>
                  </div>

                  {/* 問い合わせ者名 */}
                  <div>
                    <Label className="block text-sm font-medium mb-2 text-neutral-900">
                      問い合わせ者
                    </Label>
                    <Input
                      id="inquirerName"
                      type="text"
                      value={formData.inquirerName}
                      onChange={(e) => onInputChange("inquirerName", e.target.value)}
                      placeholder="問い合わせ者名を入力"
                      className="w-full h-10 rounded-lg border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                    />
                  </div>

                  {/* 問い合わせ種別 */}
                  <div>
                    <Label className="block text-sm font-medium mb-2 text-neutral-900">
                      問い合わせ種別
                    </Label>
                    <Select
                      value={formData.selectedInquiryType}
                      onValueChange={(value) => {
                        console.log("問い合わせ種別選択:", value);
                        onInputChange("selectedInquiryType", value);
                      }}
                    >
                      <SelectTrigger
                        className="w-full h-10 rounded-lg border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                        onClick={() => console.log("問い合わせ種別SelectTriggerクリック")}
                      >
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wantToSee">物件を見たい</SelectItem>
                        <SelectItem value="wantToKnow">入居について知りたい</SelectItem>
                        <SelectItem value="wantToConsult">写真や間取り図を見たい</SelectItem>
                        <SelectItem value="wantToVisit">資料を送ってもらいたい</SelectItem>
                        <SelectItem value="wantToContact">物件について詳しく知りたい</SelectItem>
                        <SelectItem value="wantToInquire">現地の周辺環境を教えてほしい</SelectItem>
                        <SelectItem value="wantToRequest">その他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* 右列 */}
                <div className="space-y-4">
                  {/* 一般/会員 */}
                  <div>
                    <Label className="block text-sm font-medium mb-2 text-neutral-900">
                      一般/会員
                    </Label>
                    <Select
                      value={
                        formData.gender.male ? "general" : formData.gender.female ? "member" : ""
                      }
                      onValueChange={(value) => {
                        onInputChange(
                          "gender",
                          JSON.stringify({
                            male: value === "general",
                            female: value === "member",
                          })
                        );
                      }}
                    >
                      <SelectTrigger className="w-full h-10 rounded-lg border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">一般</SelectItem>
                        <SelectItem value="member">会員</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* 性別 */}
                  <div>
                    <Label className="block text-sm font-medium mb-2 text-neutral-900">性別</Label>
                    <Select
                      value={
                        formData.actualGender.male
                          ? "male"
                          : formData.actualGender.female
                            ? "female"
                            : ""
                      }
                      onValueChange={(value) => {
                        onInputChange(
                          "actualGender",
                          JSON.stringify({
                            male: value === "male",
                            female: value === "female",
                          })
                        );
                      }}
                    >
                      <SelectTrigger className="w-full h-10 rounded-lg border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">男性</SelectItem>
                        <SelectItem value="female">女性</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* 問い合わせ日 */}
                  <div>
                    <Label className="block text-sm font-medium mb-2 text-neutral-900">
                      問い合わせ日
                    </Label>
                    <div className="space-y-2">
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <div className="w-full cursor-pointer">
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full h-10 justify-start text-left font-normal rounded-lg border-gray-300 hover:border-gray-400",
                                  !formData.inquiryDateFrom && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formData.inquiryDateFrom
                                  ? format(new Date(formData.inquiryDateFrom), "yyyy/MM/dd", {
                                      locale: ja,
                                    })
                                  : "開始日を選択"}
                              </Button>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={
                                formData.inquiryDateFrom
                                  ? new Date(formData.inquiryDateFrom)
                                  : undefined
                              }
                              onSelect={(date) => {
                                console.log("開始日選択:", date);
                                onInputChange(
                                  "inquiryDateFrom",
                                  date ? format(date, "yyyy-MM-dd") : ""
                                );
                              }}
                              locale={ja}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <div className="w-full cursor-pointer">
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full h-10 justify-start text-left font-normal rounded-lg border-gray-300 hover:border-gray-400",
                                  !formData.inquiryDateTo && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formData.inquiryDateTo
                                  ? format(new Date(formData.inquiryDateTo), "yyyy/MM/dd", {
                                      locale: ja,
                                    })
                                  : "終了日を選択"}
                              </Button>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="end" side="bottom">
                            <Calendar
                              mode="single"
                              selected={
                                formData.inquiryDateTo
                                  ? new Date(formData.inquiryDateTo)
                                  : undefined
                              }
                              onSelect={(date) => {
                                console.log("終了日選択:", date);
                                onInputChange(
                                  "inquiryDateTo",
                                  date ? format(date, "yyyy-MM-dd") : ""
                                );
                              }}
                              locale={ja}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-end gap-3 px-6 py-4 border-t border-neutral-200">
              <Button
                variant="outline"
                onClick={() => onDetailSearchOpenChange(false)}
                className="rounded-lg px-6 h-10 border-neutral-300 bg-transparent text-sm"
              >
                キャンセル
              </Button>
              <Button
                variant="outline"
                onClick={onReset}
                className="rounded-lg px-6 h-10 border-neutral-300 bg-transparent text-sm"
              >
                条件をリセット
              </Button>
              <Button
                onClick={onDetailSearch}
                className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg px-8 h-10 font-medium"
              >
                検索
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
