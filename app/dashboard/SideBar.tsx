"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  Activity,
  AlertTriangle,
  AlignJustify,
  BadgeIcon,
  BellRing,
  CheckSquare,
  Package,
  PieChart,
  Pill,
  PillIcon,
  SquareKanban,
  SyringeIcon,
  Ticket,
  TrendingDown,
  TrendingUp,
  UserCog,
  UserRoundPlus,
  Users,
  WalletCards,
} from "lucide-react";
import nookies from "nookies";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const Sidebar: React.FC = () => {
  const [width, setWidth] = useState(false);
  const [loggedInStaffRole, setLoggedInStaffRole] = useState("all");

  const toggleSidebar = () => {
    const newWidth = !width;
    setWidth(newWidth);

    nookies.set(null, "sidebarWidth", newWidth.toString(), {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });
  };

  const pathName = usePathname();

  const sidebarItems = [
    {
      href: "/dashboard/analytics",
      icon: PieChart,
      text: "Analytics",
      role: ["admin", "tech"],
    },
    {
      href: "/dashboard/payments",
      icon: TrendingUp,
      text: "Payments",
      role: ["admin", "cashier", "tech"],
    },
    {
      href: "/dashboard/expenses",
      icon: TrendingDown,
      text: "Expenses",
      role: ["admin", "cashier", "tech"],
    },
    {
      href: "/dashboard/order",
      icon: Package,
      text: "Orders",
      role: ["admin", "cashier", "tech"],
    },
    {
      href: "/dashboard/due",
      icon: BellRing,
      text: "Due",
      role: ["admin", "cashier", "tech"],
    },

    {
      href: "/dashboard/pay",
      icon: WalletCards,
      text: "Pay",
      role: ["admin", "cashier", "tech"],
    },
    {
      href: "/dashboard/pharmacy",
      icon: PillIcon,
      text: "Pharmacy",
      role: ["admin", "cashier", "tech"],
    },
    {
      href: "/dashboard/pendingprescriptions",
      icon: SyringeIcon,
      text: "Prescriptions",
      role: ["admin", "cashier", "tech"],
    },
    {
      href: "/dashboard/treatmentplan",
      icon: SquareKanban,
      text: "Treatment Plans",
      role: ["admin", "cashier", "tech"],
    },
    // {
    //   href: "/dashboard/service",
    //   icon: ServerCogIcon,
    //   text: "Service",
    //   role: ["admin", "cashier", "tech"],
    // },

    {
      href: "/dashboard/walkin",
      icon: UserCog,
      text: "Walkin",
      role: ["admin", "cashier", "tech"],
    },
    {
      href: "/dashboard/patients/addpatient",
      icon: UserRoundPlus,
      text: "Add patient",
      role: ["admin", "reception", "cashier", "tech"],
    },
    {
      href: "/dashboard/patients",
      icon: Users,
      text: "Patients",
      role: ["admin", "tech"],
    },
    {
      href: "/dashboard/appointments",
      icon: CheckSquare,
      text: "Appointments",
      role: ["admin", "reception", "cashier", "tech"],
    },

    {
      href: "/dashboard/doctorappointments",
      icon: CheckSquare,
      text: "Appointments",
      role: ["doctor"],
    },
  ];

  return (
    <div className="relative h-full">
      <div
        className={cn(
          "z-50 h-full w-24 bg-slate-50 p-1 transition-all duration-200 ease-in-out dark:bg-gray-950",
          width ? "lg:w-64" : "w-24",
          "overflow-y-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-emerald-500 dark:scrollbar-track-gray-900 dark:scrollbar-thumb-gray-800"
        )}
      >
        {/* Toggle Sidebar Icon */}
        <div className="absolute left-[calc(100%_+_1rem)] top-4">
          <AlignJustify
            size={25}
            className="cursor-pointer transition-transform hover:scale-105 md:block"
            onClick={toggleSidebar}
          />
        </div>

        {/* Logo and Brand */}
        <div className="mb-6 flex items-center justify-center gap-4 p-4">
          <Image src="/next.svg" height={30} width={30} alt="patientlinklogo" />
          {width && (
            <Link href="/dashboard">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Patient<span className="text-emerald-500">Link</span>
                </h1>
              </div>
            </Link>
          )}
        </div>

        {/* Sidebar Items */}
        {sidebarItems.map((item, index) => (
          <div key={index} className="mb-4">
            {(item.role?.includes("admin") ||
              item.role?.includes(loggedInStaffRole)) && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center rounded-lg px-4 py-3 transition-all hover:bg-emerald-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100",
                        pathName === item.href &&
                          "border-r-4 border-emerald-500 bg-emerald-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                      )}
                    >
                      <item.icon className="mr-3 text-emerald-700" size={25} />
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
