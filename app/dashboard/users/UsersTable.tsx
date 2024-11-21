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
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import { Badge } from "@/components/ui/badge";
import { ROLE, User } from "@/lib/types/type";

interface UsersProps {
  users: User[];
}

const UsersTable = ({ users }: UsersProps) => {
  const [search, setSearch] = useState("");

  const currentUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getRoleColor = (status: ROLE) => {
    switch (status) {
      case ROLE.ADMIN:
        return "bg-green-500 hover:bg-green-600";
      case ROLE.RECEPTION:
        return "bg-blue-500 hover:bg-blue-600";
      case ROLE.CASHIER:
        return "bg-yellow-500 hover:bg-yellow-600";
      case ROLE.WAITER:
        return "bg-red-500 hover:bg-red-600";
      case ROLE.HOUSEKEEPING:
        return "bg-purple-500 hover:bg-purple-600";
      case ROLE.HOUSEKEEPING_ADMIN:
        return "bg-pink-500 hover:bg-pink-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };
  return (
    <div className="mx-6 rounded-lg border p-4 shadow-sm">
      <div className="flex gap-3 mb-4">
        <AddUser />
        <Input
          className="w-auto"
          placeholder="Search by user name..."
          value={search}
          onChange={handleInputChange}
        />
      </div>

      <Table>
        <TableCaption className="font-bold mb-2 text-center">
          A list of users.
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>User Name</TableHead>
            <TableHead>Mobile Number</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.mobileNumber}</TableCell>
              <TableCell>
                <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
              </TableCell>
              <TableCell>
                <EditUser user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
