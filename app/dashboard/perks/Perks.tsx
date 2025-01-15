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
import AddPerk from "./AddPerk";
import EditPerk from "./EditPerk";
import { Perk } from "@/lib/types/type";
import { Card, CardContent } from "@/components/ui/card";

interface PerksProps {
  perks: Perk[];
}

const Perks = ({ perks }: PerksProps) => {
  const [search, setSearch] = useState("");

  const currentPerks = perks.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
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
          <AddPerk />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentPerks.map((perk) => (
              <TableRow key={perk.id}>
                <TableCell>{perk.name}</TableCell>
                <TableCell>{perk.type}</TableCell>
                <TableCell>
                  <EditPerk perk={perk} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Perks;
