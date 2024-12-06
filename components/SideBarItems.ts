import {
  CalendarDays,
  GalleryHorizontal,
  ShieldCheck,
  UserCheck,
  // Users,
  TrendingDown,
  TrendingUp,
  DoorOpen,
  LayoutGrid,
} from "lucide-react";
const sidebarItems = [
  {
    href: "/dashboard/overview",
    icon: LayoutGrid,
    text: "Overview",
    role: ["Admin"],
  },
  {
    href: "/dashboard/payments",
    icon: TrendingUp,
    text: "Payments",
    role: ["Admin", "Housekeeping"],
  },
  {
    href: "/dashboard/expenses",
    icon: TrendingDown,
    text: "Expenses",
    role: ["Admin", "Housekeeping"],
  },
  {
    href: "/dashboard/rooms",
    icon: DoorOpen,
    text: "Rooms",
    role: ["Admin", "Reception", "Housekeeping"],
  },
  {
    href: "/dashboard/room-types",
    icon: GalleryHorizontal,
    text: "Room Types",
    role: ["Admin", "Reception"],
  },
  {
    href: "/dashboard/bookings",
    icon: CalendarDays,
    text: "Bookings",
    role: ["Admin", "Reception"],
  },
  // {
  //   href: "/dashboard/guests",
  //   icon: Users,
  //   text: "Guests",
  //   role: ["Admin", "Reception"],
  // },
  {
    href: "/dashboard/housekeeping",
    icon: ShieldCheck,
    text: "Housekeeping",
    role: ["Admin", "Housekeeping", "HousekeepingAdmin"],
  },
  {
    href: "/dashboard/users",
    icon: UserCheck,
    text: "Staff",
    role: ["Admin"],
  },
];

export default sidebarItems;
