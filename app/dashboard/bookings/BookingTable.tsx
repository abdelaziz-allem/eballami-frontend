"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Booking } from "@/lib/types/type";
import { formatDate, getStatusColor } from "@/lib/utils";
import { Calendar, Search, User, Mail, Hash } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { set } from "date-fns";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const BookingTable = ({
  bookings,
  availableTimes,
}: {
  bookings: Booking[];
  availableTimes: { id: number; dateTime: string }[];
}) => {
  const [search, setSearch] = useState("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const filterBookings = bookings.filter((booking) =>
    booking.user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="w-full border-none shadow-none">
      <CardContent>
        <div className="relative w-full sm:w-96 mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            className="pl-10 pr-4"
            placeholder="Search email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex w-12 space-x-4 p-4">
            {availableTimes.map((time) => (
              <Badge
                key={time.id}
                variant={"destructive"}
                className={`cursor-pointer bg-primary_color-500 hover:bg-purple-600 ${
                  selectedTime === time.dateTime
                    ? "ring ring-primary_color-400"
                    : ""
                }`}
                onClick={() => setSelectedTime(time.dateTime)}
              >
                {formatDate(time.dateTime)}
              </Badge>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterBookings.map((booking) => (
              <TableRow
                key={booking.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-3 text-primary_color-400" />
                    <span>{booking.user.name}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-primary_color-400" />
                    <span>{booking.user.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-primary_color-400" />
                    {formatDate(booking.bookedAt)}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center">
                    <Hash className="h-5 w-5 mr-3 text-primary_color-400" />
                    <span className="font-bold text-lg">{booking.code}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BookingTable;
