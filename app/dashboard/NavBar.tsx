"use client";

import { Building, LogOut, Search, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { theme, setTheme } = useTheme();

  // Replace this with actual staff name logic
  const staffName = "John Doe";

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    console.log("Logout triggered"); // Replace with actual logout logic
  };

  return (
    <nav className="z-20 w-full bg-white shadow-sm dark:bg-gray-900">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* Search Section */}
        <div className="flex items-center space-x-2 w-full max-w-md">
          <Input
            placeholder="Search patient"
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-500 dark:focus:ring-emerald-500"
            aria-label="Search patient"
          />
          <Button
            variant="ghost"
            className="text-gray-500 dark:text-gray-400"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Theme Switch */}
        <Switch
          checked={theme === "dark"}
          onCheckedChange={toggleTheme}
          id="theme-switch"
          className="bg-gray-200 dark:bg-gray-700"
          aria-label="Toggle theme"
        />

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="rounded-full"
              aria-label="User menu"
            >
              <Image
                src="/next.svg"
                height={40}
                width={40}
                alt="Profile Logo"
                className="rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>{staffName}&apos;s Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/dashboard/staff/editprofile" passHref>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </DropdownMenuItem>
            </Link>
            <Link href="/dashboard/staff/changepassword" passHref>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Change Password
              </DropdownMenuItem>
            </Link>
            <Link href="/dashboard/clinic" passHref>
              <DropdownMenuItem>
                <Building className="mr-2 h-4 w-4" />
                Clinic
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full text-red-500"
                    aria-label="Logout"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure you want to logout?</DialogTitle>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="destructive" onClick={handleLogout}>
                      Confirm Logout
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
