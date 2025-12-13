import { Building2, HelpCircle, Mail, MessageCircle, UserCheck, Users } from "lucide-react";

export const navMain = [
  { title: "物件管理", url: "/properties", icon: Building2 },
  { title: "不動産業者様管理", url: "/realtors", icon: Users },
  { title: "会員管理", url: "/members", icon: UserCheck },
  { title: "問い合わせ管理", icon: HelpCircle, url: "/inquiry-management" },
  {
    title: "質問管理",
    icon: MessageCircle,
    url: "#",
    items: [
      { title: "ユーザー投稿一覧", url: "/user-posts" },
      { title: "不動産業者様回答一覧", url: "/realtor-replies" },
    ],
  },
  { title: "メール管理", url: "/mail", icon: Mail },
];
