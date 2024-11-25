import {
  BedDouble,
  BookOpen,
  CalendarDays,
  CreditCard,
  GalleryHorizontal,
  Home,
  KeyRound,
  Package,
  Settings,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
const sidebarItems = [
  // {
  //   href: "/dashboard/overview",
  //   icon: Home,
  //   text: "Overview",
  //   role: ["Admin"],
  // },
  {
    href: "/dashboard/rooms",
    icon: BedDouble,
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
  {
    href: "/dashboard/guests",
    icon: Users,
    text: "Guests",
    role: ["Admin", "Reception"],
  },
  {
    href: "/dashboard/check-ins",
    icon: KeyRound,
    text: "Check-ins",
    role: ["Admin", "Reception"],
  },
  {
    href: "/dashboard/payments",
    icon: CreditCard,
    text: "Payments",
    role: ["Admin", "Housekeeping"],
  },
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
