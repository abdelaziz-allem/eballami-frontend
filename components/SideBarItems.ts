import {
  BedDouble,
  BookOpen,
  CalendarDays,
  CreditCard,
  Home,
  KeyRound,
  Package,
  Settings,
  TypeIcon,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
const sidebarItems = [
  {
    href: "/dashboard/overview",
    icon: Home,
    text: "Overview",
    role: ["Admin", "manager"],
  },
  {
    href: "/dashboard/rooms",
    icon: BedDouble,
    text: "Rooms",
    role: ["Admin", "manager", "staff"],
  },
  {
    href: "/dashboard/room-types",
    icon: TypeIcon,
    text: "Room Types",
    role: ["Admin", "manager", "staff"],
  },
  {
    href: "/dashboard/bookings",
    icon: CalendarDays,
    text: "Bookings",
    role: ["Admin", "manager", "staff"],
  },
  {
    href: "/dashboard/guests",
    icon: Users,
    text: "Guests",
    role: ["Admin", "manager", "staff"],
  },
  {
    href: "/dashboard/checkins",
    icon: KeyRound,
    text: "Check-ins",
    role: ["Admin", "staff"],
  },
  {
    href: "/dashboard/payments",
    icon: CreditCard,
    text: "Payments",
    role: ["Admin", "manager", "staff"],
  },
  {
    href: "/dashboard/inventory",
    icon: Package,
    text: "Inventory",
    role: ["Admin", "manager"],
  },
  {
    href: "/dashboard/user",
    icon: UserCheck,
    text: "Staff",
    role: ["Admin", "manager"],
  },
  {
    href: "/dashboard/addguest",
    icon: UserPlus,
    text: "Add Guest",
    role: ["Admin", "staff"],
  },
  {
    href: "/dashboard/reports",
    icon: BookOpen,
    text: "Reports",
    role: ["Admin", "manager"],
  },
  {
    href: "/dashboard/settings",
    icon: Settings,
    text: "Settings",
    role: ["Admin"],
  },
];

export default sidebarItems;
