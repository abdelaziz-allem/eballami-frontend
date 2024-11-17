import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Container from "./Container";
import Navbar from "./NavBar";
import Sidebar from "./SideBar";
import { ThemeProvider } from "@/components/theme-provider";

const poppins = Poppins({ subsets: ["latin"], weight: "300" });

export const metadata: Metadata = {
  title: "PatientLink",
  description: "by alim solutions",
  icons: "/patientlinknotext.png",
};

export const revalidate = 0;

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <div className={`flex min-h-screen flex-row ${poppins.className}`}>
      <Sidebar />
      <main className="flex-1 text-black dark:text-slate-50">
        <Navbar />
        <Container>{children}</Container>
      </main>
    </div>
    // </ThemeProvider>
  );
}
