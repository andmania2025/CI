import type { RealtorAnswer, RealtorAnswerFormData } from "../types";

// 初期フォームデータ
export const INITIAL_FORM_DATA: RealtorAnswerFormData = {
  freeword: "",
  realEstateCompany: "",
  questionType: "",
  questionCategory: "",
  questionCategoryGeneral: "",
  publicStatus: {
    public: false,
    nonPublic: false,
  },
  answerDateFrom: "",
  answerDateTo: "",
  displayCount: "20",
};

// サンプル不動産業者回答データ
export const SAMPLE_ANSWERS: RealtorAnswer[] = [
  {
    id: "ra001",
    answerDate: "2025/05/24 11:32:26",
    company: "富士土地開発株式会社",
    representative: "鈴木 太人",
    questionTitle: "4号地2階の洗い場に関する質問です。土地の価格について（神奈川県横浜市港南区）",
  },
  {
    id: "ra002",
    answerDate: "2025/04/12 00:39:24",
    company: "丸一不動産 株式会社",
    representative: "太田・新本・内海 合",
    questionTitle: "営業の実情について（大阪府豊中市北条）",
  },
  {
    id: "ra003",
    answerDate: "2025/04/12 00:33:36",
    company: "丸一不動産 株式会社",
    representative: "太田・新本・内海 合",
    questionTitle: "営業、山林の売却（三重県伊勢市朝熊町）",
  },
  {
    id: "ra004",
    answerDate: "2025/04/08 22:31:32",
    company: "合同会社富山興産",
    representative: "FP・鑑定・不動産 富山哲也",
    questionTitle: "営業、山林の売却（三重県伊勢市朝熊町）",
  },
  {
    id: "ra005",
    answerDate: "2025/04/08 22:27:02",
    company: "株式会社エステ",
    representative: "立花 雅彦",
    questionTitle: "営業、山林の売却（三重県伊勢市朝熊町）",
  },
  {
    id: "ra006",
    answerDate: "2025/03/26 17:28:04",
    company: "株式会社インフィニクス",
    representative: "古橋 英",
    questionTitle:
      "ショップハウス（企業物件投資に関する質問をお寄せいただきありがとうございます（宮城県仙台市青葉区）",
  },
  {
    id: "ra007",
    answerDate: "2025/03/13 16:36:40",
    company: "立興株式会社",
    representative: "渡辺 幸和",
    questionTitle: "田舎の山の売却について（神奈川県横浜市港南区）",
  },
  {
    id: "ra008",
    answerDate: "2025/03/04 17:26:53",
    company: "株式会社ハウスオーション",
    representative: "石橋",
    questionTitle: "営業の実情について（大阪府豊中市北条）",
  },
  {
    id: "ra009",
    answerDate: "2025/03/04 06:39:56",
    company: "合同会社富山興産",
    representative: "FP・鑑定・不動産 富山哲也",
    questionTitle: "営業の実情について（大阪府豊中市北条）",
  },
];
