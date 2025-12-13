"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { useEffect, useRef, useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: Tab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, tabs, activeTab, onTabChange, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeStyle, setActiveStyle] = useState({
      left: "0px",
      width: "0px",
    });
    const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (activeTab) {
        const tabIndex = tabs.findIndex((tab) => tab.id === activeTab);
        if (tabIndex !== -1) {
          setActiveIndex(tabIndex);
        }
      }
    }, [activeTab, tabs]);

    useEffect(() => {
      requestAnimationFrame(() => {
        const activeElement = tabRefs.current[activeIndex];
        const activeTextElement = textRefs.current[activeIndex];
        const containerElement = containerRef.current;
        if (activeElement && activeTextElement && containerElement) {
          const containerRect = containerElement.getBoundingClientRect();
          const textRect = activeTextElement.getBoundingClientRect();
          const left = textRect.left - containerRect.left;
          const width = textRect.width;
          setActiveStyle({
            left: `${left}px`,
            width: `${width}px`,
          });
        }
      });
    }, [activeIndex]);

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div className="relative">
          {/* Active Indicator */}
          <div
            className="absolute bottom-[-6px] h-[2px] bg-[#0e0f11] dark:bg-white transition-all duration-300 ease-out"
            style={activeStyle}
          />

          {/* Tabs */}
          <div
            ref={(el) => {
              containerRef.current = el;
            }}
            className="relative flex space-x-[6px] items-baseline"
          >
            {tabs.map((tab, index) => (
              <div
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                className={cn(
                  "pl-0 pr-3 py-2 cursor-pointer transition-colors duration-300",
                  index === activeIndex
                    ? "text-[#0e0e10] dark:text-white"
                    : "text-[#0e0f1199] dark:text-[#ffffff99]"
                )}
                onClick={() => {
                  setActiveIndex(index);
                  onTabChange?.(tab.id);
                }}
              >
                <div
                  ref={(el) => {
                    textRefs.current[index] = el;
                  }}
                  className="text-sm font-medium leading-none whitespace-nowrap"
                >
                  {tab.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
Tabs.displayName = "Tabs";

export { Tabs };
