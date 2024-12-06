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
import AddRoom from "./AddRoom";
import EditRoom from "./EditRoom";
import { Badge } from "@/components/ui/badge";
import { Room, RoomType } from "@/lib/types/type";
import { formatDate, getRoomStatusColor } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface RoomsProps {
  rooms: Room[];
  roomTypes: RoomType[];
}

const RoomsTable = ({ rooms, roomTypes }: RoomsProps) => {
  const [search, setSearch] = useState("");

  const currentRooms = rooms.filter((room) =>
    room.number.toLowerCase().includes(search.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardContent>
        <div className="flex justify-between  mb-4">
          <Input
            className="w-auto"
            placeholder="Search by room number..."
            value={search}
            onChange={handleInputChange}
          />
          <AddRoom roomTypes={roomTypes} />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Room Number</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentRooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.number}</TableCell>
                <TableCell>
                  <Badge
                    className={`bg-primary_color-500 hover:bg-primary_color-600 text-white`}
                  >
                    {room.type.name}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getRoomStatusColor(room.status)}>
                    {room.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-light">
                  {formatDate(room.createdAt)}
                </TableCell>
                <TableCell>
                  <EditRoom
                    roomId={room.id}
                    roomNumber={room.number}
                    roomTypeId={room.type.id}
                    roomStatus={room.status}
                    roomTypes={roomTypes}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RoomsTable;
