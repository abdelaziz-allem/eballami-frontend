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
import AddRoomType from "./AddRoomType";
import EditRoomType from "./EditRoomType";
import { RoomType } from "@/lib/types/type";

interface RoomsProps {
  roomTypes: RoomType[];
}

const RoomTypesTable = ({ roomTypes }: RoomsProps) => {
  const [search, setSearch] = useState("");

  const currentRoomTypes = roomTypes.filter((roomType) =>
    roomType.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="mx-6 rounded-lg border p-4 shadow-sm">
      <div className="flex gap-3 mb-4">
        <AddRoomType />
        <Input
          className="w-auto"
          placeholder="Search by room number..."
          value={search}
          onChange={handleInputChange}
        />
      </div>

      <Table>
        <TableCaption className="font-bold mb-2 text-center">
          A list of rooms.
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentRoomTypes.map((roomType) => (
            <TableRow key={roomType.id}>
              <TableCell>{roomType.name}</TableCell>

              <TableCell>
                {new Date(roomType.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <EditRoomType
                  roomTypeId={roomType.id}
                  roomTypeName={roomType.name}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RoomTypesTable;
