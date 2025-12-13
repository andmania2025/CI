"use client";

import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import type * as React from "react";
import { useState } from "react";

import { NavUser } from "@/components/layout/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { navMain } from "@/config/nav";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (title: string, event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenItems((prev) =>
      prev.includes(title) ? prev.filter((i) => i !== title) : [...prev, title]
    );
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <div className="flex justify-center py-4">
          <a href="/dashboard" className="block -ml-4">
            <Image
              src="/logo_w.svg"
              alt="ウチカツ"
              width={160}
              height={42}
              className="h-10 w-auto brightness-0 invert"
            />
          </a>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-3">
            <SidebarMenu>
              {navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <>
                      <SidebarMenuButton
                        tooltip={item.title}
                        onClick={(e) => toggleItem(item.title, e)}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        {openItems.includes(item.title) ? (
                          <IconChevronUp className="ml-auto" />
                        ) : (
                          <IconChevronDown className="ml-auto" />
                        )}
                      </SidebarMenuButton>
                      {openItems.includes(item.title) && (
                        <SidebarMenuSub>
                          {item.items.map((sub) => (
                            <SidebarMenuSubItem key={sub.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={sub.url}>
                                  <span>{sub.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <Link href={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
