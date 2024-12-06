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
import AddRoomType from "./AddRoomType";
import EditRoomType from "./EditRoomType";
import { RoomType } from "@/lib/types/type";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="w-full border-none shadow-none">
      <CardContent>
        <div className="flex justify-between  mb-4">
          <Input
            className="w-auto"
            placeholder="Search room type..."
            value={search}
            onChange={handleInputChange}
          />
          <AddRoomType />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Price Per Night</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentRoomTypes.map((roomType) => (
              <TableRow key={roomType.id}>
                <TableCell>
                  <Badge
                    className={`bg-primary_color-500 hover:bg-primary_color-600`}
                  >
                    {roomType.name}
                  </Badge>
                </TableCell>
                <TableCell>$ {roomType.pricePerNight}</TableCell>

                <TableCell>
                  {new Date(roomType.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <EditRoomType
                    roomTypeId={roomType.id}
                    roomTypeName={roomType.name}
                    pricePerNight={roomType.pricePerNight}
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

export default RoomTypesTable;
