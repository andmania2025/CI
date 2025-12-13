export interface SearchResult {
  id: string;
  title: string;
  type: "sale" | "rental";
  price: string;
  location: string;
  image: string;
  details: {
    area: string;
    year: string;
    access: string;
  };
}

export const mockSearchResults: SearchResult[] = [
  {
    id: "1",
    title: "検索結果テスト物件",
    type: "sale",
    price: "3,500万円",
    location: "東京都渋谷区",
    image: "/section/matt-jones-9CPAjGVB378-unsplash.jpg",
    details: {
      area: "70㎡",
      year: "2020年",
      access: "渋谷駅徒歩5分",
    },
  },
  {
    id: "2",
    title: "新宿区のマンション",
    type: "sale",
    price: "4,200万円",
    location: "東京都新宿区",
    image: "/section/henry-chen-x7clQSWhlfE-unsplash.jpg",
    details: {
      area: "85㎡",
      year: "2018年",
      access: "新宿駅徒歩8分",
    },
  },
  {
    id: "3",
    title: "港区の高級マンション",
    type: "sale",
    price: "8,500万円",
    location: "東京都港区",
    image: "/section/bailey-anselme-Bkp3gLygyeA-unsplash.jpg",
    details: {
      area: "120㎡",
      year: "2021年",
      access: "六本木駅徒歩3分",
    },
  },
  {
    id: "4",
    title: "世田谷区の一戸建て",
    type: "sale",
    price: "6,800万円",
    location: "東京都世田谷区",
    image: "/section/chuttersnap-awL_YCtPGv4-unsplash.jpg",
    details: {
      area: "150㎡",
      year: "2019年",
      access: "下北沢駅徒歩10分",
    },
  },
  {
    id: "5",
    title: "目黒区の賃貸マンション",
    type: "rental",
    price: "月額18万円",
    location: "東京都目黒区",
    image: "/section/cosmin-georgian-2T9h1sxR5So-unsplash.jpg",
    details: {
      area: "65㎡",
      year: "2020年",
      access: "目黒駅徒歩7分",
    },
  },
];
