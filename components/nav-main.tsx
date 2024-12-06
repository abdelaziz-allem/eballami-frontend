"use client";

import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { userInSessionType } from "@/lib/types/type";

interface NavItem {
  text: string;
  href: string;
  icon?: LucideIcon;
  role: string[];
}

interface NavMainProps {
  items: NavItem[];
  user: userInSessionType;
}

export function NavMain({ items, user }: NavMainProps) {
  const pathName = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-1">
        {items.map(
          (item, index) =>
            item.role.includes(user.role) && (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-6 font-medium transition-all text-lg",
                      "hover:bg-slate-400 hover:text-white",
                      "focus:bg-primary_color-500 ",
                      pathName === item.href
                        ? "bg-primary_color-500 "
                        : "text-muted-foreground"
                    )}
                  >
                    {item.icon && (
                      <item.icon
                        className={pathName === item.href ? "text-white " : ""}
                        aria-hidden="true"
                        size={10}
                      />
                    )}
                    <span
                      className={
                        pathName === item.href
                          ? "text-white  truncate"
                          : " truncate"
                      }
                    >
                      {item.text}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
