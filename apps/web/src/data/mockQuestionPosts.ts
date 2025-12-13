export interface QuestionPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  postedAt: string;
  replies: number;
  views: number;
}

export const mockQuestionPosts: QuestionPost[] = [
  {
    id: "1",
    title: "中古マンションの購入時に注意すべきポイントを教えてください",
    excerpt:
      "築15年のマンションの購入を検討していますが、管理状況や修繕積立金について不安があります...",
    category: "マンション",
    author: "不動産初心者",
    postedAt: "2024年1月15日",
    replies: 1,
    views: 120,
  },
  {
    id: "2",
    title: "相続した土地の売却について相談があります",
    excerpt: "親から相続した土地がありますが、売却時の税金や手続きについて詳しく知りたいです...",
    category: "相続",
    author: "田中太郎",
    postedAt: "2024年1月14日",
    replies: 2,
    views: 85,
  },
  {
    id: "3",
    title: "住宅ローンの借り換えのタイミングについて",
    excerpt: "現在の金利が高く感じるのですが、借り換えを検討するべきでしょうか...",
    category: "住宅ローン",
    author: "山田花子",
    postedAt: "2024年1月13日",
    replies: 2,
    views: 200,
  },
  {
    id: "4",
    title: "一戸建ての購入で失敗しないためのポイントは？",
    excerpt: "初めての一戸建て購入で、立地や建物の状態、将来の資産価値について教えてください...",
    category: "一戸建て",
    author: "購入検討中",
    postedAt: "2024年1月12日",
    replies: 3,
    views: 150,
  },
  {
    id: "5",
    title: "投資用アパートの利回り計算について",
    excerpt:
      "投資用アパートの購入を検討していますが、表面利回りと実質利回りの違いがよく分かりません...",
    category: "投資用物件",
    author: "投資初心者",
    postedAt: "2024年1月11日",
    replies: 1,
    views: 95,
  },
  {
    id: "6",
    title: "土地の境界線トラブルについて相談",
    excerpt:
      "隣地との境界線でトラブルが発生しています。測量や境界確定の手続きについて教えてください...",
    category: "土地",
    author: "土地所有者",
    postedAt: "2024年1月10日",
    replies: 2,
    views: 75,
  },
  {
    id: "7",
    title: "マンション管理組合の運営について",
    excerpt:
      "管理組合の理事になったのですが、管理費の使い道や修繕計画の立て方について教えてください...",
    category: "マンション管理",
    author: "管理組合理事",
    postedAt: "2024年1月9日",
    replies: 4,
    views: 180,
  },
  {
    id: "8",
    title: "賃貸物件の更新料について",
    excerpt: "賃貸アパートの更新時に更新料を請求されましたが、これは必須なのでしょうか？...",
    category: "賃貸",
    author: "賃貸住人",
    postedAt: "2024年1月8日",
    replies: 1,
    views: 110,
  },
  {
    id: "9",
    title: "不動産売却時の仲介手数料について",
    excerpt:
      "自宅を売却する際の仲介手数料の相場や、複数の業者に依頼する場合の注意点を教えてください...",
    category: "売却",
    author: "売却検討中",
    postedAt: "2024年1月7日",
    replies: 2,
    views: 140,
  },
  {
    id: "10",
    title: "建物の耐震診断について",
    excerpt:
      "築30年の木造住宅の耐震診断を受けようと思っていますが、費用や手続きについて教えてください...",
    category: "耐震",
    author: "住宅所有者",
    postedAt: "2024年1月6日",
    replies: 1,
    views: 90,
  },
  {
    id: "11",
    title: "不動産投資の節税対策について",
    excerpt: "不動産投資で得た収入の節税対策について、具体的な方法を教えてください...",
    category: "節税",
    author: "投資家",
    postedAt: "2024年1月5日",
    replies: 3,
    views: 220,
  },
  {
    id: "12",
    title: "住宅ローン控除の申請方法について",
    excerpt: "住宅ローン控除の申請手続きについて、必要な書類や申請時期を教えてください...",
    category: "住宅ローン",
    author: "新築購入者",
    postedAt: "2024年1月4日",
    replies: 2,
    views: 160,
  },
];
