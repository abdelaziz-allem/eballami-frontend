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
import AddUserFacility from "./AddFacilityPerk";
import EditUserFacility from "./EditFacilityPerk";
import {
  Facility,
  FacilityPerk,
  Perk,
  User,
  UserFacility,
} from "@/lib/types/type";
import { Card, CardContent } from "@/components/ui/card";

interface FacilityPerksProps {
  facilityPerks: FacilityPerk[];
  perks: Perk[];
  facilities: Facility[];
}

const FacilityPerks = ({
  facilityPerks,
  perks,
  facilities,
}: FacilityPerksProps) => {
  const [search, setSearch] = useState("");

  const currentFacilityPerks = facilityPerks.filter((facilityPerk) =>
    facilityPerk.facility.name.toLowerCase().includes(search.toLowerCase())
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
          <AddUserFacility perks={perks} facilities={facilities} />
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
            {currentFacilityPerks.map((facilityPerk) => (
              <TableRow key={facilityPerk.id}>
                <TableCell>{facilityPerk.perk.name}</TableCell>
                <TableCell>{facilityPerk.facility.name}</TableCell>

                <TableCell>
                  <EditUserFacility
                    perks={perks}
                    facilities={facilities}
                    facilityPerk={facilityPerk}
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

export default FacilityPerks;
