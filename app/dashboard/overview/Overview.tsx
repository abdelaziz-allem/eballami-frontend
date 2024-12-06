"use client";

import { CheckSquare, Ticket, TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";
import { ChartComponent, ChartData } from "@/components/Chart";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Booking } from "@/lib/types/type";
import { formatDate } from "@/lib/utils";

interface AnalyticsPageDataProps {
  totalCheckins: number;
  totalAvailableRooms: number;
  todayExpenseTotalAmount: number;
  todayPaymentTotalAmount: number;
  checkins: Booking[];
  chartData: ChartData[];
}

export default function OverviewPageData({
  totalCheckins,
  totalAvailableRooms,
  todayExpenseTotalAmount,
  todayPaymentTotalAmount,
  chartData,
  checkins,
}: AnalyticsPageDataProps) {
  return (
    <div className="min-h-screen w-full space-y-8 px-8 py-6">
      {/* Stats Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Checked-in Rooms"
          value={totalCheckins}
          description="Total rooms occupied"
          icon={<CheckSquare className="h-6 w-6 text-sky-500" />}
          href="/dashboard/bookings"
          color="sky"
        />
        <StatCard
          title="Available Rooms"
          value={totalAvailableRooms}
          description="Ready to rent rooms"
          icon={<Ticket className="h-6 w-6 text-primary_color-500" />}
          href="/dashboard/rooms"
          color="primary_color"
        />
        <StatCard
          title="Today's Expenses"
          value={todayExpenseTotalAmount}
          description="Total expenses for today"
          icon={<TrendingDown className="h-6 w-6 text-red-500" />}
          href="/dashboard/expenses"
          color="red"
        />
        <StatCard
          title="Today's Revenue"
          value={todayPaymentTotalAmount}
          description="Total revenue for today"
          icon={<TrendingUp className="h-6 w-6 text-emerald-500" />}
          href="/dashboard/payments"
          color="emerald"
        />
      </div>

      {/* Financial Overview */}
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
          <CardDescription>Monthly expenses and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartComponent chartData={chartData} />
        </CardContent>
      </Card>

      {/* Occupancy Statistics */}
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Occupancy Statistics</CardTitle>
          <CardDescription>
            Current room status and availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Room Status</h3>
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-sky-500">
                    {totalCheckins}
                  </div>
                  <div className="text-sm text-gray-500">Occupied</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary_color-500">
                    {totalAvailableRooms}
                  </div>
                  <div className="text-sm text-gray-500">Available</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Occupancy Rate</h3>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-emerald-500">
                    {(
                      (totalCheckins / (totalCheckins + totalAvailableRooms)) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                  <div className="text-sm text-gray-500">Current Occupancy</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Check-ins */}
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Recent Check-ins</CardTitle>
          <CardDescription>Overview of our guests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Room Type</TableHead>
                <TableHead>Check-in Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {checkins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No recent check-ins
                  </TableCell>
                </TableRow>
              ) : (
                checkins.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      {booking.guest.firstName} {booking.guest.lastName}
                    </TableCell>
                    <TableCell>{booking.guest.email}</TableCell>
                    <TableCell>{booking.guest.mobileNumber}</TableCell>
                    <TableCell>
                      {" "}
                      <Badge
                        className={
                          "bg-primary_color-400 hover:bg-primary_color-500"
                        }
                      >
                        {booking.room.number}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          "bg-primary_color-500 hover:bg-primary_color-600"
                        }
                      >
                        {booking.room.type.name}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(booking.checkInDate)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: "sky" | "primary_color" | "red" | "emerald";
}

function StatCard({
  title,
  value,
  description,
  icon,
  href,
  color,
}: StatCardProps) {
  const colorClasses = {
    sky: "border-sky-500 dark:border-sky-400",
    primary_color: "border-primary_color-500 dark:border-primary_color-400",
    red: "border-red-500 dark:border-red-400",
    emerald: "border-emerald-500 dark:border-emerald-400",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href} className="block transition-all hover:scale-105">
            <Card
              className={`overflow-hidden border-l-4 ${colorClasses[color]}`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium ">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{value}</div>
                    <p className="text-xs ">{description}</p>
                  </div>
                  {icon}
                </div>
              </CardContent>
            </Card>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to view details</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
