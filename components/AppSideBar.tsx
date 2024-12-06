"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import Image from "next/image";
import sidebarItems from "./SideBarItems";

export function AppSidebar({ ...props }: any) {
  const { user } = props;

  return (
    <Sidebar collapsible="icon" {...props} className="bg-slate-100 ">
      <SidebarHeader>
        <div className="mb-6 flex items-center justify-center gap-2 p-4">
          <Image src="/logo.png" height={150} width={150} alt="HMS Logo" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarItems} user={user} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={props.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
