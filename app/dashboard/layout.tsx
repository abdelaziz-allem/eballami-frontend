import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Container from "./Container";
import Navbar from "./NavBar";
import Sidebar from "./SideBar";
import { ThemeProvider } from "@/components/theme-provider";
import { getUserInSession } from "@/lib/userInSession";

const poppins = Poppins({ subsets: ["latin"], weight: "300" });

export const metadata: Metadata = {
  title: "HMS",
  description: "by nexlogik",
  icons: "/next.svg",
};

const user = getUserInSession();

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className={`flex min-h-screen flex-row ${poppins.className}`}>
        <Sidebar user={user} />
        <main className="flex-1 text-black dark:text-slate-50">
          <Navbar />
          <Container>{children}</Container>
        </main>
      </div>
    </ThemeProvider>
  );
}
