import {
  Book,
  BookMarked,
  ChartNoAxesGantt,
  LandPlot,
  UserRoundCog,
  Users,
  WalletCards,
} from "lucide-react";
const sidebarItems = [
  {
    href: "/dashboard/facilities",
    icon: Users,
    text: "Facilities",
    role: ["Admin"],
  },

  {
    href: "/dashboard/manage",
    icon: LandPlot,
    text: "Manage",
    role: ["Owner"],
  },

  {
    href: "/dashboard/bookings",
    icon: BookMarked,
    text: "Bookings",
    role: ["Owner"],
  },
  {
    href: "/dashboard/users",
    icon: Users,
    text: "Users",
    role: ["Admin"],
  },
  {
    href: "/dashboard/perks",
    icon: Book,
    text: "Perks",
    role: ["Admin"],
  },
  {
    href: "/dashboard/userFacilities",
    icon: UserRoundCog,
    text: "User Facilities",
    role: ["Admin"],
  },
  {
    href: "/dashboard/facilityPerks",
    icon: Book,
    text: "Facility Perks",
    role: ["Admin"],
  },
];

export default sidebarItems;
