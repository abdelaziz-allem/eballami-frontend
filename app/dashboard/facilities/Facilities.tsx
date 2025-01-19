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
import { Facility, Perk, User } from "@/lib/types/type";
import { Card, CardContent } from "@/components/ui/card";
import AddFacility from "./AddFacility";
import EditFacility from "./EditFacility";
import { Badge } from "@/components/ui/badge";
import AddFacilityPerk from "./AddFacilityPerk";
import DeleteFacilityPerk from "./DeleteFacilityPerk";
import DeleteUserFacility from "./DeleteUserFacility";
import AddOwner from "./AddOwner";

interface RoomsProps {
  facilities: Facility[];
  perks: Perk[];
  users: User[];
}

const Facilities = ({ facilities, perks, users }: RoomsProps) => {
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
              <TableHead>Perks</TableHead>
              <TableHead>Owners</TableHead>
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
                <TableCell>
                  {facility.perks.map((perk) => (
                    <div className="flex items-center ">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-primary_color-500 hover:bg-primary_color-600 mt-2">
                          {perk.perk.name}
                        </Badge>
                        <DeleteFacilityPerk facilityPerkId={perk.id} />
                      </div>
                    </div>
                  ))}
                </TableCell>

                <TableCell>
                  {facility.users.map((user) => (
                    <div className="flex items-center ">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-emerald-500 hover:bg-emerald-600 mt-2">
                          {user.user.name}
                        </Badge>
                        <DeleteUserFacility userFacilityId={user.id} />
                      </div>
                    </div>
                  ))}
                </TableCell>

                <TableCell>{facility.averageRating}</TableCell>
                <TableCell>
                  <EditFacility facility={facility} />
                  <AddFacilityPerk perks={perks} facilityId={facility.id} />
                  <AddOwner users={users} facilityId={facility.id} />
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
