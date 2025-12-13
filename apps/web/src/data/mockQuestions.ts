export interface QuestionData {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  postedAt: string;
  replies: number;
  views: number;
}

export const mockQuestions: Record<string, QuestionData> = {
  "1": {
    id: "1",
    title: "中古マンションの購入時に注意すべきポイントを教えてください",
    content: `築15年のマンションの購入を検討していますが、管理状況や修繕積立金について不安があります。

管理組合の運営状況や修繕積立金の残高、過去の修繕履歴など、購入前に確認すべきポイントを教えてください。

また、中古マンション特有の注意点や、購入後のトラブルを防ぐためのアドバイスもいただけると助かります。`,
    category: "マンション",
    author: "不動産初心者",
    postedAt: "2024年1月15日",
    replies: 1,
    views: 120,
  },
  "2": {
    id: "2",
    title: "相続した土地の売却について相談があります",
    content: `親から相続した土地がありますが、売却時の税金や手続きについて詳しく知りたいです。

相続税の申告期限や、売却時の譲渡所得税について教えてください。

また、相続した土地の評価方法や、売却のタイミングについてもアドバイスをいただけると助かります。`,
    category: "相続",
    author: "田中太郎",
    postedAt: "2024年1月14日",
    replies: 2,
    views: 85,
  },
  "3": {
    id: "3",
    title: "住宅ローンの借り換えのタイミングについて",
    content: `現在の金利が高く感じるのですが、借り換えを検討するべきでしょうか。

現在の金利状況や、借り換えに必要な手数料について詳しく知りたいです。

また、借り換えのタイミングや、どの金融機関を選ぶべきかについてもアドバイスをいただけると助かります。`,
    category: "住宅ローン",
    author: "山田花子",
    postedAt: "2024年1月13日",
    replies: 2,
    views: 200,
  },
};
