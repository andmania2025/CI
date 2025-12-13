"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import * as React from "react";

export type TTag = {
  key: string;
  name: string;
  category?: string;
};

type MultipleSelectProps = {
  tags: TTag[];
  customTag?: (item: TTag) => ReactNode | string;
  onChange?: (value: TTag[]) => void;
  defaultValue?: TTag[];
};

export const MultipleSelect = ({
  tags,
  customTag,
  onChange,
  defaultValue,
}: MultipleSelectProps) => {
  const [selected, setSelected] = useState<TTag[]>(defaultValue ?? []);
  const containerRef = useRef<HTMLDivElement>(null);
  const onChangeRef = useRef(onChange);

  // onChangeの参照を更新
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  useEffect(() => {
    if (containerRef?.current) {
      containerRef.current.scrollBy({
        left: containerRef.current?.scrollWidth,
        behavior: "smooth",
      });
    }
    onChangeRef.current?.(selected);
  }, [selected]);

  const onSelect = (item: TTag) => {
    setSelected((prev) => [...prev, item]);
  };

  const onDeselect = (item: TTag) => {
    setSelected((prev) => prev.filter((i) => i !== item));
  };

  return (
    <AnimatePresence mode={"popLayout"}>
      <div className={"flex w-full flex-col gap-2"}>
        <motion.div
          layout
          ref={containerRef}
          className="selected no-scrollbar flex min-h-[3rem] w-full items-start overflow-x-auto scroll-smooth rounded-md border border-solid border-gray-200 bg-gray-50 p-2"
        >
          <motion.div layout className="flex items-start gap-2 flex-wrap">
            {selected?.length > 0 ? (
              selected?.map((item) => (
                <Tag name={item?.key} key={item?.key} className={"bg-white shadow"}>
                  <div className="flex items-center gap-2">
                    <motion.span layout className={"text-nowrap"}>
                      {item?.name}
                    </motion.span>
                    <button className={""} onClick={() => onDeselect(item)}>
                      <X size={14} />
                    </button>
                  </div>
                </Tag>
              ))
            ) : (
              <span className="text-gray-500 text-sm">下記から選択してください</span>
            )}
          </motion.div>
        </motion.div>
        {tags?.length > selected?.length && (
          <div className="flex w-full flex-wrap gap-2 rounded-md border border-solid border-gray-200 p-2">
            {tags
              ?.filter((item) => !selected?.some((i) => i.key === item.key))
              .map((item) => (
                <Tag name={item?.key} onClick={() => onSelect(item)} key={item?.key}>
                  {customTag ? (
                    customTag(item)
                  ) : (
                    <motion.span layout className={"text-nowrap"}>
                      {item?.name}
                    </motion.span>
                  )}
                </Tag>
              ))}
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};

type TagProps = PropsWithChildren &
  Pick<HTMLAttributes<HTMLDivElement>, "onClick"> & {
    name?: string;
    className?: string;
  };

export const Tag = ({ children, className, name, onClick }: TagProps) => {
  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "1room":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "2room":
        return "bg-green-100 text-green-800 border-green-200";
      case "3room":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "4room":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "5room":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-200 text-gray-800 border-gray-300";
    }
  };

  // カテゴリー情報を取得（nameからkeyを抽出してカテゴリーを判定）
  const getCategoryFromKey = (key: string) => {
    if (key.startsWith("1")) return "1room";
    if (key.startsWith("2")) return "2room";
    if (key.startsWith("3")) return "3room";
    if (key.startsWith("4")) return "4room";
    if (key.startsWith("5")) return "5room";
    return undefined;
  };

  return (
    <motion.div
      layout
      layoutId={name}
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-md px-2 py-1 text-sm border",
        getCategoryColor(getCategoryFromKey(name || "")),
        className
      )}
    >
      {children}
    </motion.div>
  );
};
