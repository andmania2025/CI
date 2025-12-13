export interface Property {
  id: number;
  image: string;
  rent?: string;
  price?: string;
  title: string;
  description: string;
  type: "sale" | "rental";
  details: {
    location: string;
    access: string;
    buildingType: string;
    floor: string;
    rooms: string;
    area: string;
    year: string;
    deposit?: string;
    keyMoney?: string;
  };
}

// アパート・マンション賃貸物件データ
export const apartmentRentalProperties: Property[] = [
  {
    id: 1,
    image: "/image-12.png",
    rent: "5.5万円",
    title: "日栄住宅加美北 204号室",
    description: "大阪府大阪市平野区の賃貸アパート。おおさか東線の衣摺加美北駅から徒歩6分。",
    type: "rental",
    details: {
      location: "大阪府大阪市平野区加美北9-10-25",
      access: "おおさか東線 衣摺加美北駅 徒歩6分",
      buildingType: "賃貸アパート",
      floor: "2階建て 2階",
      rooms: "1K",
      area: "20.5㎡",
      year: "1995年3月",
      deposit: "敷金1ヶ月",
      keyMoney: "礼金1ヶ月",
    },
  },
  {
    id: 2,
    image: "/image-13.png",
    rent: "6.8万円",
    title: "魚住町貸家",
    description: "兵庫県明石市の賃貸一戸建て。JR神戸線の魚住駅から徒歩6分の好立地。",
    type: "rental",
    details: {
      location: "兵庫県明石市魚住町清水137-26",
      access: "JR神戸線(神戸～姫路) 魚住駅 徒歩6分",
      buildingType: "賃貸一戸建て",
      floor: "2階建て",
      rooms: "3DK",
      area: "65.2㎡",
      year: "1988年7月",
      deposit: "敷金2ヶ月",
      keyMoney: "礼金1ヶ月",
    },
  },
  {
    id: 3,
    image: "/image-14.png",
    rent: "7.2万円",
    title: "サンテプロダクトビル4A",
    description:
      "愛知県名古屋市西区の賃貸マンション。名古屋市営地下鉄鶴舞線の浅間町駅から徒歩7分。",
    type: "rental",
    details: {
      location: "愛知県名古屋市西区押切1-3-1",
      access: "名古屋市営地下鉄鶴舞線 浅間町駅 徒歩7分",
      buildingType: "賃貸マンション",
      floor: "4階建て 4階",
      rooms: "1LDK",
      area: "42.8㎡",
      year: "1992年11月",
      deposit: "敷金1ヶ月",
      keyMoney: "礼金1ヶ月",
    },
  },
  {
    id: 4,
    image: "/image-15.png",
    rent: "4.5万円",
    title: "リブステージ富加106",
    description: "岐阜県加茂郡富加町の賃貸アパート。長良川鉄道越美南線の富加駅から車7分。",
    type: "rental",
    details: {
      location: "岐阜県加茂郡富加町大平賀字大坪1398番15",
      access: "長良川鉄道越美南線 富加駅 車7分(3600m)",
      buildingType: "賃貸アパート",
      floor: "2階建て 1階",
      rooms: "2DK",
      area: "45.6㎡",
      year: "1998年4月",
      deposit: "敷金1ヶ月",
      keyMoney: "礼金なし",
    },
  },
  {
    id: 5,
    image: "/image-16.png",
    rent: "8.5万円",
    title: "グランメゾン新大阪",
    description: "大阪府大阪市淀川区の賃貸マンション。JR東海道本線の新大阪駅から徒歩8分。",
    type: "rental",
    details: {
      location: "大阪府大阪市淀川区",
      access: "JR東海道本線 新大阪駅 徒歩8分",
      buildingType: "賃貸マンション",
      floor: "10階建て 5階",
      rooms: "2LDK",
      area: "58.4㎡",
      year: "2005年3月",
      deposit: "敷金2ヶ月",
      keyMoney: "礼金1ヶ月",
    },
  },
  {
    id: 6,
    image: "/image-17.png",
    rent: "9.2万円",
    title: "パークサイド京都",
    description: "京都府京都市の賃貸マンション。京阪本線の祇園四条駅から徒歩12分。",
    type: "rental",
    details: {
      location: "京都府京都市",
      access: "京阪本線 祇園四条駅 徒歩12分",
      buildingType: "賃貸マンション",
      floor: "8階建て 6階",
      rooms: "1LDK",
      area: "48.2㎡",
      year: "2008年9月",
      deposit: "敷金2ヶ月",
      keyMoney: "礼金2ヶ月",
    },
  },
  {
    id: 7,
    image: "/image-18.png",
    rent: "6.0万円",
    title: "ハイツ神戸西",
    description: "兵庫県神戸市の賃貸アパート。JR神戸線の兵庫駅から徒歩15分。",
    type: "rental",
    details: {
      location: "兵庫県神戸市",
      access: "JR神戸線 兵庫駅 徒歩15分",
      buildingType: "賃貸アパート",
      floor: "3階建て 2階",
      rooms: "2DK",
      area: "38.5㎡",
      year: "1990年6月",
      deposit: "敷金1ヶ月",
      keyMoney: "礼金1ヶ月",
    },
  },
  {
    id: 8,
    image: "/image-19.png",
    rent: "10.5万円",
    title: "レジデンス梅田",
    description: "大阪府大阪市北区の賃貸マンション。JR東海道本線の大阪駅から徒歩10分。",
    type: "rental",
    details: {
      location: "大阪府大阪市北区",
      access: "JR東海道本線 大阪駅 徒歩10分",
      buildingType: "賃貸マンション",
      floor: "12階建て 8階",
      rooms: "2LDK",
      area: "62.8㎡",
      year: "2010年2月",
      deposit: "敷金2ヶ月",
      keyMoney: "礼金2ヶ月",
    },
  },
];
