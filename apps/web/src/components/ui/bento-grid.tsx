import type React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BentoGrid = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("grid w-full auto-rows-[22rem] grid-cols-3 gap-4", className)}>
      {children}
    </div>
  );
};

function hexToRgba(hex: string, alpha: number): string {
  const sanitized = hex.replace("#", "");
  const bigint = Number.parseInt(
    sanitized.length === 3
      ? sanitized
          .split("")
          .map((c) => c + c)
          .join("")
      : sanitized,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const BentoCard = ({
  name,
  className,
  background,
  description,
  href,
  cta,
  hoverColor = "#093893",
}: {
  name: string;
  className: string;
  background: React.ReactNode;
  description: string;
  href: string;
  cta: string;
  hoverColor?: string;
}) => {
  // 下方向アニメーション対象
  const moveDown = name === "不動産を購入する" || name === "不動産の査定をする";
  const footerBg = hexToRgba(hoverColor, 0.09);
  const g1 = hexToRgba(hoverColor, 0.15);
  const g2 = hexToRgba(hoverColor, 0.12);
  const g3 = hexToRgba(hoverColor, 0.18);
  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0">{background}</div>

      {/* ホバー時の背景グラデーション（カード毎の hoverColor ベース） */}
      {/* 注意: 動的な背景グラデーション（カスタムカラーに基づく）のため、style属性が必要 */}
      {/* Tailwindクラスでは動的に生成されたカラー値を使用したグラデーションを表現できない */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 100%, ${g1} 0%, transparent 60%),
            radial-gradient(circle at 50% 100%, ${g2} 0%, transparent 70%),
            radial-gradient(circle at 50% 100%, ${g3} 0%, transparent 80%)
          `,
        }}
      />

      <div
        className={cn(
          "pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 mt-10",
          moveDown ? "group-hover:translate-y-10" : "group-hover:-translate-y-10"
        )}
      >
        {/* アイコンを非表示 */}
        <div className="h-12 w-12" />
        <h3 className="text-xl font-semibold text-[#093893] dark:text-[#093893]">{name}</h3>
        <p className="max-w-lg text-gray-900">{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        )}
        // 注意: 動的な背景色（カスタムカラーに基づく）のため、style属性が必要
        // Tailwindクラスでは動的に生成されたカラー値を使用した背景色を表現できない
        style={{ backgroundColor: footerBg }}
      >
        <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
          <a href={href}>
            {cta}
            <IoIosArrowRoundForward className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
      {/* 追加の汎用オーバーレイは削除（個別カラーに統一） */}
    </div>
  );
};

export { BentoCard, BentoGrid };
