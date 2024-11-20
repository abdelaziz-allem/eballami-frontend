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
import AddRoom from "./AddRoom";
import EditRoom from "./EditRoom";
import { Badge } from "@/components/ui/badge";
import { Room, RoomType } from "@/lib/types/type";

interface RoomsProps {
  rooms: Room[];
  roomTypes: RoomType[];
}

const RoomsTable = ({ rooms, roomTypes }: RoomsProps) => {
  const [search, setSearch] = useState("");

  // Filter rooms based on the search query
  const currentRooms = rooms.filter((room) =>
    room.number.toLowerCase().includes(search.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="mx-6 rounded-lg border p-4 shadow-sm">
      <div className="flex gap-3 mb-4">
        <AddRoom />
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
            <TableHead>Room Number</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentRooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell>{room.number}</TableCell>
              <TableCell>
                <Badge className={`bg-blue-400 hover:bg-blue-500`}>
                  {room.type.name}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(room.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <EditRoom
                  roomId={room.id}
                  roomNumber={room.number}
                  roomTypeId={room.type.id}
                  roomTypes={roomTypes}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RoomsTable;
