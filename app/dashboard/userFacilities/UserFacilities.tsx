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
import AddUserFacility from "./AddUserFacility";
import EditUserFacility from "./EditUserFacility";
import { Facility, User, UserFacility } from "@/lib/types/type";
import { Card, CardContent } from "@/components/ui/card";

interface UserFacilitiesProps {
  userFacilities: UserFacility[];
  users: User[];
  facilities: Facility[];
}

const UserFacilities = ({
  userFacilities,
  users,
  facilities,
}: UserFacilitiesProps) => {
  const [search, setSearch] = useState("");

  const currentUserFacilities = userFacilities.filter((userFacility) =>
    userFacility.user.name.toLowerCase().includes(search.toLowerCase())
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
            placeholder="Search by user name..."
            value={search}
            onChange={handleInputChange}
          />
          <AddUserFacility users={users} facilities={facilities} />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Facility</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentUserFacilities.map((userFacility) => (
              <TableRow key={userFacility.id}>
                <TableCell>{userFacility.user.name}</TableCell>
                <TableCell>{userFacility.facility.name}</TableCell>
                <TableCell>
                  <EditUserFacility
                    users={users}
                    facilities={facilities}
                    userFacility={userFacility}
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

export default UserFacilities;
