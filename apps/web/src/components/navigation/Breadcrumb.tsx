"use client";

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface BreadcrumbItemData {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItemData[];
  className?: string;
}

export const Breadcrumb = ({ items, className = "" }: BreadcrumbProps) => {
  return (
    <BreadcrumbRoot className={cn("mb-4", className)}>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={item.href ?? item.label}>
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>
                    {item.icon ? (
                      <div className="flex items-center">
                        {item.icon}
                        <span className="sr-only">{item.label}</span>
                      </div>
                    ) : (
                      item.label
                    )}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>
                  {item.icon ? (
                    <div className="flex items-center">
                      {item.icon}
                      <span className="sr-only">{item.label}</span>
                    </div>
                  ) : (
                    item.label
                  )}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
};
