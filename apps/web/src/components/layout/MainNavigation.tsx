import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link, { type LinkProps } from "next/link";
import React from "react";

// 定数の定義
const NAVIGATION_STYLES = {
  trigger:
    "text-black focus:text-black data-[state=open]:text-black text-base font-semibold h-8",
  link: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-semibold transition-opacity duration-200 h-8 px-4 bg-transparent text-black hover:opacity-50 focus:outline-none focus:bg-transparent",
  dropdown:
    "grid w-[300px] gap-0 p-2 bg-white border border-gray-200 rounded-md shadow-lg",
  listItem:
    "block select-none space-y-1 rounded-md p-2.5 leading-none no-underline outline-none text-[#111] transition-opacity duration-200 hover:opacity-50 focus:bg-transparent focus:outline-none",
} as const;

// 売買物件の種類
const PROPERTY_TYPES = [
  { name: "マンション", href: "/search?type=sale&propertyType=mansion" },
  { name: "一戸建て", href: "/search?type=sale&propertyType=house" },
  { name: "土地", href: "/search?type=sale&propertyType=land" },
  {
    name: "店舗・事務所・倉庫・工場",
    href: "/search?type=sale&propertyType=commercial",
  },
  {
    name: "一棟ビル・一棟マンション",
    href: "/search?type=sale&propertyType=building",
  },
  { name: "アパート", href: "/search?type=sale&propertyType=apartment" },
  {
    name: "その他（宿泊施設等）",
    href: "/search?type=sale&propertyType=other",
  },
] as const;

// 賃貸物件の種類
const RENTAL_TYPES = [
  {
    name: "アパート・マンション",
    href: "/search?type=rental&propertyType=rental_apartment",
  },
  { name: "一戸建て", href: "/search?type=rental&propertyType=rental_house" },
  {
    name: "店舗・事務所・倉庫・工場",
    href: "/search?type=rental&propertyType=rental_commercial",
  },
  {
    name: "その他(貸土地、駐車場等)",
    href: "/search?type=rental&propertyType=rental_other",
  },
] as const;

// その他のナビゲーション項目
const OTHER_NAV_ITEMS = [
  { name: "不動産質問・相談", href: "/real-estate-consultation" },
  { name: "不動産査定", href: "/real-estate-appraisal" },
  { name: "不動産業者検索", href: "/real-estate-agent-search" },
  { name: "不動産業者登録", href: "/real-estate-agent-registration" },
] as const;

// 型定義
interface MainNavigationProps {
  className?: string;
}

interface ListItemProps extends LinkProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

interface NavigationItem {
  name: string;
  href: string;
}

interface DropdownMenuProps {
  title: string;
  items: readonly NavigationItem[];
}

// コンポーネントの分離
const ListItem = React.forwardRef<React.ComponentRef<"a">, ListItemProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(NAVIGATION_STYLES.listItem, className)}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            {children && (
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            )}
          </Link>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, items }) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger className={NAVIGATION_STYLES.trigger}>
      {title}
    </NavigationMenuTrigger>
    <NavigationMenuContent>
      <ul className={NAVIGATION_STYLES.dropdown}>
        {items.map((item) => (
          <ListItem key={item.name} href={item.href} title={item.name} />
        ))}
      </ul>
    </NavigationMenuContent>
  </NavigationMenuItem>
);

const NavigationLink: React.FC<NavigationItem> = ({ name, href }) => (
  <NavigationMenuItem>
    <Link href={href} className={NAVIGATION_STYLES.link}>
      {name}
    </Link>
  </NavigationMenuItem>
);

export function MainNavigation({ className }: MainNavigationProps) {
  return (
    <NavigationMenu
      className={cn("h-8", className)}
      viewport={false}
      delayDuration={0}
    >
      <NavigationMenuList className="flex h-8 items-center space-x-1 text-black">
        <DropdownMenu title="売買物件検索" items={PROPERTY_TYPES} />
        <DropdownMenu title="賃貸物件検索" items={RENTAL_TYPES} />

        {OTHER_NAV_ITEMS.map((item) => (
          <NavigationLink key={item.name} name={item.name} href={item.href} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
