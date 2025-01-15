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
import { Facility } from "@/lib/types/type";
import { Card, CardContent } from "@/components/ui/card";
import AddFacility from "./AddFacility";
import EditFacility from "./EditFacility";

interface RoomsProps {
  facilities: Facility[];
}

const Facilities = ({ facilities }: RoomsProps) => {
  const [search, setSearch] = useState("");

  const currentFacilities = facilities.filter((facility) =>
    facility.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardContent>
        <div className="flex justify-between mb-4">
          <Input
            className="w-auto"
            placeholder="Search by facility name..."
            value={search}
            onChange={handleInputChange}
          />
          <AddFacility />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Mobile Number</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Map</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Average Rating</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentFacilities.map((facility) => (
              <TableRow key={facility.id}>
                <TableCell>{facility.name}</TableCell>
                <TableCell>{facility.description}</TableCell>
                <TableCell>{facility.mobileNumber}</TableCell>
                <TableCell>{facility.address}</TableCell>
                <TableCell>{facility.map}</TableCell>
                <TableCell>{facility.type}</TableCell>
                <TableCell>{facility.averageRating}</TableCell>
                <TableCell>
                  <EditFacility facility={facility} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Facilities;
