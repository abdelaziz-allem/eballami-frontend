"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { AlignJustify } from "lucide-react";
import nookies from "nookies";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import sidebarItems from "@/components/SideBarItems";
import { userInSessionType } from "@/lib/types/type";

const Sidebar = ({ user }: { user: userInSessionType | null }) => {
  if (!user) {
    return <Skeleton />;
  }
  const [width, setWidth] = useState(false);

  const toggleSidebar = () => {
    const newWidth = !width;
    setWidth(newWidth);
    nookies.set(null, "sidebarWidth", newWidth.toString(), {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  };

  const pathName = usePathname();

  return (
    <div className="relative h-full">
      <div
        className={cn(
          "z-50 h-screen bg-slate-50 p-1 transition-all duration-200 ease-in-out dark:bg-gray-950",
          width ? "w-64" : "w-20",
          "overflow-y-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-blue-500 dark:scrollbar-track-gray-900 dark:scrollbar-thumb-gray-800"
        )}
      >
        {/* Toggle Sidebar Icon */}
        <div className="absolute left-[calc(100%+1rem)] top-4">
          <AlignJustify
            size={25}
            className="cursor-pointer hover:scale-105"
            onClick={toggleSidebar}
          />
        </div>

        {/* Logo and Brand */}
        <div className="mb-6 flex items-center justify-center gap-4 p-4">
          <Image src="/hotel-logo.svg" height={30} width={30} alt="HMS Logo" />
          {width && (
            <Link href="/dashboard">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  HMS<span className="text-blue-500">Pro</span>
                </h1>
              </div>
            </Link>
          )}
        </div>

        {sidebarItems.map((item, index) => (
          <div key={index} className="mb-2">
            {item.role.includes(user?.role) && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center rounded-lg px-4 py-3 transition-all hover:bg-blue-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100",
                        pathName === item.href &&
                          "border-r-4 border-blue-500 bg-blue-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                      )}
                    >
                      <item.icon className="mr-3 text-blue-700" size={25} />
                      {width && (
                        <span className="hidden text-sm font-medium lg:block">
                          {item.text}
                        </span>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {!width && (
                    <TooltipContent side="right" className="text-sm">
                      <p>{item.text}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
