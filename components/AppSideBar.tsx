"use client";

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
import { useEffect, useState } from "react";
import { User } from "@/lib/types/type";
import { getUserInSession } from "@/lib/db/userCrud";

export function AppSidebar() {
  const [userInSession, setUserInSession] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserInSession = async () => {
      const user = await getUserInSession();
      setUserInSession(user);
    };

    fetchUserInSession();
  }, []);

  if (!userInSession) {
    return null;
  }

  return (
    <Sidebar collapsible="icon" className="bg-slate-100 ">
      <SidebarHeader>
        <div className="flex items-center">
          <Image src="/logo.png" height={80} width={80} alt="HMS Logo" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarItems} user={userInSession} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInSession} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
