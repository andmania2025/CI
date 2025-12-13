/**
 * 物件カードで使用される汎用データ型
 */
export type ProductData = {
  title: string;
  excerpt: string;
  createdAt: string;
  domain: string;
  slug: string;
  alt: string[];
  techStack: string[];
  thumbnail: string[];
  actionLabel?: string;
  address?: string;
  price?: string;
  station?: string;
  id?: string;
  isRental?: boolean;
  mockProperty?: {
    propertyType: string;
    floor: string;
    layout: string;
    area: string;
    builtYear: string;
    landArea?: string;
    buildingArea?: string;
    structure?: string;
    yieldRate?: string;
  };
};
