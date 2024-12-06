"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Booking,
  BookingStatus,
  Room,
  userInSessionType,
} from "@/lib/types/type";
import { formatDate, calculateNights } from "@/lib/utils";
import { Calendar, Search, User, Filter, CheckCheck } from "lucide-react";
import AddBooking from "./AddBooking";
import CalcDailyCost from "./CalcDailyCost";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface BookingTableProps {
  bookings: Booking[];
  rooms: Room[];
  userInSession: userInSessionType;
}

const BookingTable = ({
  bookings,
  rooms,
  userInSession,
}: BookingTableProps) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "ALL">(
    "ALL"
  );

  const filteredBookings = useMemo(() => {
    return bookings.filter(
      (booking) =>
        (booking.room.number.toLowerCase().includes(search.toLowerCase()) ||
          `${booking.guest.firstName} ${booking.guest.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase())) &&
        (statusFilter === "ALL" || booking.status === statusFilter)
    );
  }, [bookings, search, statusFilter]);

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.CHECKED_IN:
        return "text-emerald-500";
      case BookingStatus.CHECKED_OUT:
        return "text-gray-500";
      case BookingStatus.BOOKED:
        return "text-primary-color-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardContent>
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              className="pl-10 pr-4"
              placeholder="Search by room or guest..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  {statusFilter === "ALL" ? "All Statuses" : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("ALL")}>
                  All Statuses
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter(BookingStatus.BOOKED)}
                >
                  Booked
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter(BookingStatus.CHECKED_IN)}
                >
                  Checked In
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AddBooking rooms={rooms} />
          </div>
        </div>

        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Room</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Nights</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Balance</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow
                  key={booking.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium text-lg py-6">
                    {booking.room.number}
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-3 text-primary_color-400" />
                      <span>
                        <Link
                          className="text-lg font-medium hover:text-primary transition-colors underline underline-offset-4 hover:underline-offset-1"
                          href={`/dashboard/guests/guest/profile/${booking.id}`}
                        >
                          {booking.guest.firstName} {booking.guest.lastName}
                        </Link>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-3 text-green-500" />
                      <span className="text-lg">
                        {formatDate(booking.checkInDate)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-3 text-red-500" />
                      <span
                        className={`text-lg ${
                          new Date(booking.checkOutDate).getTime() <
                          new Date().getTime()
                            ? "line-through "
                            : ""
                        }`}
                      >
                        {formatDate(booking.checkOutDate)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-lg py-6">
                    {calculateNights(booking.checkInDate)}
                  </TableCell>
                  <TableCell className="py-6">
                    <CheckCheck className={getStatusColor(booking.status)} />
                  </TableCell>
                  <CalcDailyCost
                    booking={booking}
                    getResults={true}
                    rooms={rooms}
                    userInSession={userInSession}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filteredBookings.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No bookings found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingTable;
