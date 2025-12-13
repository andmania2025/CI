import Image from "next/image";

export const realEstateFeatures = [
  {
    Icon: () => null, // アイコンを削除
    name: "不動産業者の登録をする",
    description: "不動産業者様が無料で物件登録可能です",
    href: "/register-agent",
    cta: "詳細を見る",
    background: (
      <Image
        src="/top/icon/register_real_estate_agent.svg"
        alt="不動産業者登録"
        width={200}
        height={200}
        className="absolute right-4 top-4 opacity-60 object-contain"
      />
    ),
    className: "lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-2",
    hoverColor: "#2563eb", // blue-600
  },
  {
    Icon: () => null, // アイコンを削除
    name: "不動産を購入する",
    description: "ご希望の不動産エリアや地図から検索可能です",
    href: "/mansion-search",
    cta: "詳細を見る",
    background: (
      <Image
        src="/top/icon/buy_real_estate.svg"
        alt="不動産を購入"
        width={200}
        height={200}
        className="absolute right-4 top-4 opacity-60 object-contain"
      />
    ),
    className: "lg:row-start-1 lg:row-end-3 lg:col-start-2 lg:col-end-3",
    hoverColor: "#059669", // emerald-600
  },
  {
    Icon: () => null, // アイコンを削除
    name: "不動産を借りる",
    description: "ご希望の不動産エリアや地図から検索可能です",
    href: "/apartment-rental-search",
    cta: "詳細を見る",
    background: (
      <Image
        src="/top/icon/rent_real_estate.svg"
        alt="不動産を借りる"
        width={200}
        height={200}
        className="absolute right-4 top-4 opacity-60 object-contain"
      />
    ),
    className: "lg:row-start-1 lg:row-end-2 lg:col-start-3 lg:col-end-4",
    hoverColor: "#d97706", // amber-600
  },
  {
    Icon: () => null, // アイコンを削除
    name: "不動産の相談をする",
    description: "お悩みの不動産について相談する",
    href: "/real-estate-consultation",
    cta: "詳細を見る",
    background: (
      <Image
        src="/top/icon/consult_real_estate.svg"
        alt="不動産の相談"
        width={200}
        height={200}
        className="absolute right-4 top-4 opacity-60 object-contain"
      />
    ),
    className: "lg:row-start-2 lg:row-end-3 lg:col-start-1 lg:col-end-2",
    hoverColor: "#db2777", // pink-600
  },
  {
    Icon: () => null, // アイコンを削除
    name: "不動産の査定をする",
    description: "買取査定、売出し価格の査定が可能です",
    href: "/appraisal",
    cta: "詳細を見る",
    background: (
      <Image
        src="/top/icon/appraise_real_estate.svg"
        alt="不動産の査定"
        width={200}
        height={200}
        className="absolute right-4 top-4 opacity-60 object-contain"
      />
    ),
    className: "lg:row-start-2 lg:row-end-4 lg:col-start-3 lg:col-end-4",
    hoverColor: "#7c3aed", // violet-600
  },
  {
    Icon: () => null, // アイコンを削除
    name: "不動産屋を探す",
    description: "得意分野に応じた不動産業者を探せます。",
    href: "/find-agent",
    cta: "詳細を見る",
    background: (
      <Image
        src="/top/icon/find_real_estate_agent.svg"
        alt="不動産屋を探す"
        width={200}
        height={200}
        className="absolute right-4 top-4 opacity-60 object-contain"
      />
    ),
    className: "lg:row-start-3 lg:row-end-4 lg:col-start-1 lg:col-end-3",
    hoverColor: "#dc2626", // red-600
  },
];
