export interface ServiceCardData {
  iconSrc: string;
  title: string;
  description: string;
  alt: string;
}

export const serviceCards: ServiceCardData[] = [
  {
    iconSrc: "/top/icon/buy_real_estate.svg",
    title: "不動産を購入する",
    description: "ご希望の不動産エリアや地図から検索可能です",
    alt: "不動産を購入する",
  },
  {
    iconSrc: "/top/icon/rent_real_estate.svg",
    title: "不動産を借りる",
    description: "ご希望の不動産エリアや地図から検索可能です",
    alt: "不動産を借りる",
  },
  {
    iconSrc: "/top/icon/consult_real_estate.svg",
    title: "不動産の相談をする",
    description: "お悩みの不動産について相談する",
    alt: "不動産の相談をする",
  },
  {
    iconSrc: "/top/icon/appraise_real_estate.svg",
    title: "不動産の査定をする",
    description: "買取査定、売出し価格の査定が可能です",
    alt: "不動産の査定をする",
  },
];

export const horizontalCards: ServiceCardData[] = [
  {
    iconSrc: "/top/icon/find_real_estate_agent.svg",
    title: "不動産屋を探す",
    description: "得意分野に応じた不動産業者を探せます。",
    alt: "不動産屋を探す",
  },
  {
    iconSrc: "/top/icon/register_real_estate_agent.svg",
    title: "不動産業者の登録をする",
    description: "不動産業者様が無料で物件登録可能です",
    alt: "不動産業者の登録をする",
  },
];
