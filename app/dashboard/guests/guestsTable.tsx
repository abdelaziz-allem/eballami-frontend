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
import { Guest } from "@/lib/types/type";
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="w-full border-none shadow-none">
      <CardContent>
        <div className="flex gap-3 mb-4">
          <Input
            className="w-auto"
            placeholder="Search by room number..."
            value={search}
            onChange={handleInputChange}
          />
        </div>

        <Table>
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
      </CardContent>
    </Card>
  );
};

export default GuestsTable;
