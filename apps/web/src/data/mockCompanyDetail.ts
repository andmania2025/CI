// 会社詳細用のモックデータ
export interface CompanyDetail {
  id: string;
  name: string;
  phone: string;
  address: string;
  access: string;
  parking: string;
  businessHours: string;
  holidays: string;
  fax: string;
  licenseNumber: string;
  association: string;
  website: string;
  goodCount: number;
  message: string;
  features: {
    title: string;
    description: string;
  }[];
  serviceAreas: string;
  propertyTypes: {
    sales: string[];
    realEstate: string[];
    features: string[];
  };
}

export const mockCompanyDetail: CompanyDetail = {
  id: "1",
  name: "朝日土地建物株式会社",
  phone: "046-264-4311",
  address: "神奈川県大和市大和南2-2-6",
  access: "小田急線・相鉄線「大和」駅から徒歩3分",
  parking:
    "店舗前に駐車スペースを3台分ご用意しております。埋まっている場合は提携駐車場 (セントラルパーク、ナビパーク大和等)をご利用ください。",
  businessHours: "10:00~20:00",
  holidays: "火曜・水曜定休",
  fax: "046 264 3344",
  licenseNumber: "国土交通大臣免許(9) 第3744号",
  association: "全国宅地建物取引業保証協会",
  website: "https://www.astymt.jp/",
  goodCount: 28,
  message:
    "朝日土地建物 大和支店では、小田急江ノ島線・小田急線・相鉄線・JR相模線・その他、大和市・座間市・綾瀬市・横浜市瀬谷区を中心とした不動産物件をご紹介させていただいております。バザール会場(店舗)は小田急江ノ島線・相鉄線「大和」駅から徒歩3分。Web未公開の物件も多数ございます。お客様のご希望に沿った物件をお探し致しますので、お気軽にお立ち寄り下さい。ご来場を社員一同、心よりお待ちしております。",
  features: [
    {
      title: "大和駅から徒歩3分",
      description:
        "駅からアクセスしやすい店舗。休日はもちろんのこと、お仕事帰りにもお立ち寄りいただけます。",
    },
    {
      title: "WEBサイトにない物件",
      description:
        "店内には広告未公開物件(webサイト・チラシ等での広告をしない物件)も多数取り揃えています。",
    },
    {
      title: "迅速丁寧なスタッフ",
      description:
        "地元、大和市を愛してやまない経験豊富なスタッフが協力し、スピーディーな対応をいたします。",
    },
    {
      title: "小さなお子様もご一緒に",
      description:
        "キッズスペース・ベビーベッドも完備。小さなお子様連れのお客様もお気軽にご来店ください。",
    },
  ],
  serviceAreas:
    "神奈川県大和市を中心とし神奈川エリアはもちろんですが、東京、千葉、埼玉、栃木などで成約実績多数、全国規模でお任せください！",
  propertyTypes: {
    sales: ["売買不動産", "その他"],
    realEstate: ["一戸建て", "マンション", "土地", "アパート", "底地・借地", "その他"],
    features: [
      "一般物件",
      "底地・借地",
      "市街地調整区域・農地",
      "傾斜地・擁壁",
      "告知事項",
      "山林",
      "私道",
      "再建築不可",
      "共有持分",
      "競売・任意売却",
    ],
  },
};
