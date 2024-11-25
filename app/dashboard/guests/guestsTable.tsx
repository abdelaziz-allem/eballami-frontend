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
import { Guest } from "@/lib/types/type";

interface RoomsProps {
  guests: Guest[];
}

const GuestsTable = ({ guests }: RoomsProps) => {
  const [search, setSearch] = useState("");

  const currentGuests = guests.filter((guest) =>
    guest.firstName.toLowerCase().includes(search.toLowerCase())
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
            <TableHead>Mobile #</TableHead>
            <TableHead>first booking</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentGuests.map((guest) => (
            <TableRow key={guest.id}>
              <TableCell>
                {guest.firstName} {guest.lastName}
              </TableCell>
              <TableCell>{guest.mobileNumber}</TableCell>

              <TableCell>
                {new Date(guest.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GuestsTable;
