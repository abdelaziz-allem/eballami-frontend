"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Booking, Guest } from "@/lib/types/type";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface RoomsProps {
  bookings: Booking[];
}

const GuestsTable = ({ bookings }: RoomsProps) => {
  const [search, setSearch] = useState("");

  const currentGuest = bookings.filter((booking) =>
    booking.guest.firstName.toLowerCase().includes(search.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="mx-6 rounded-lg border p-4 shadow-sm">
      <div className="flex gap-3 mb-4">
        <Input
          className="w-auto"
          placeholder="Search by room number..."
          value={search}
          onChange={handleInputChange}
        />
      </div>

      <Table>
        <TableCaption className="font-bold mb-2 text-center">
          A list of guests.
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Mobile no.</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Check-in date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentGuest.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>
                {booking.guest.firstName} {booking.guest.lastName}
              </TableCell>
              <TableCell>{booking.guest.mobileNumber}</TableCell>
              <TableCell>{booking.guest.email}</TableCell>
              <TableCell>
                <Badge
                  className={`font-bold text-md bg-emerald-400 hover:bg-emerald-500`}
                >
                  {booking.room.number}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={`font-bold text-md bg-pink-400 hover:bg-pink-500`}
                >
                  {booking.room.type.name}
                </Badge>
              </TableCell>

              <TableCell>{formatDate(booking.checkInDate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GuestsTable;
