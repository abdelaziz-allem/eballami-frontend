"use client";

import type React from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import type { Facility, Perk, User } from "@/lib/types/type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddFacility from "./AddFacility";
import EditFacility from "./EditFacility";
import { Badge } from "@/components/ui/badge";
import AddFacilityPerk from "./AddFacilityPerk";
import DeleteFacilityPerk from "./DeleteFacilityPerk";
import DeleteUserFacility from "./DeleteUserFacility";
import AddOwner from "./AddOwner";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Phone, Star } from "lucide-react";

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Facilities Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Search by facility name..."
              value={search}
              onChange={handleInputChange}
            />
          </div>
          <AddFacility />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Perks</TableHead>
                <TableHead>Owners</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentFacilities.map((facility) => (
                <TableRow key={facility.id}>
                  <TableCell className="font-medium">{facility.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{facility.mobileNumber}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm text-gray-500">
                        {facility.address}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{facility.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="grid grid-cols-3 gap-4">
                      {facility.perks.length > 0 ? (
                        facility.perks.map((perk) => (
                          <div
                            key={perk.id}
                            className="flex items-center gap-2"
                          >
                            <Badge className="bg-primary_color-500 hover:bg-primary_color-600">
                              {perk.perk.name}
                            </Badge>
                            <DeleteFacilityPerk facilityPerkId={perk.id} />
                          </div>
                        ))
                      ) : (
                        <Badge variant="outline">No Perks</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="grid grid-cols-3 gap-4">
                      {facility.users.length > 0 ? (
                        facility.users.map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center gap-2"
                          >
                            <Badge className="bg-emerald-500 hover:bg-emerald-600">
                              {user.user.name}
                            </Badge>
                            <DeleteUserFacility userFacilityId={user.id} />
                          </div>
                        ))
                      ) : (
                        <Badge variant="outline">No Owners</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      {facility.averageRating.toFixed(1)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <EditFacility facility={facility} />
                      <AddFacilityPerk perks={perks} facilityId={facility.id} />
                      <AddOwner users={users} facilityId={facility.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Facilities;
