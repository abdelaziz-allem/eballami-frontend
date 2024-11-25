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
import AddHouseKeepingTask from "./AddHouseKeepingTask";
import EditHouseKeepingTask from "./EditHouseKeepingTask";
import {
  HousekeepingTask,
  Room,
  User,
  userInSessionType,
} from "@/lib/types/type";
import { formatDate, getRoomTaskStatusColor } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface UsersProps {
  tasks: HousekeepingTask[];
  rooms: Room[];
  users: User[];
  assignedBy: userInSessionType;
}

const HousekeepingTable = ({ tasks, rooms, users, assignedBy }: UsersProps) => {
  const [search, setSearch] = useState("");

  const currentUsers = tasks.filter((task) =>
    task.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="mx-6 rounded-lg border p-4 shadow-sm">
      <div className="flex gap-3 mb-4">
        <AddHouseKeepingTask
          rooms={rooms}
          users={users}
          assignedBy={assignedBy}
        />
        <Input
          className="w-auto"
          placeholder="Search by room..."
          value={search}
          onChange={handleInputChange}
        />
      </div>

      <Table>
        <TableCaption className="font-bold mb-2 text-center">
          A list of tasks.
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Room</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Assigned By</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentUsers.map((HousekeepingTask) => (
            <TableRow key={HousekeepingTask.id}>
              <TableCell>{HousekeepingTask.room.number}</TableCell>
              <TableCell>{HousekeepingTask.description}</TableCell>
              <TableCell>
                <Badge className="bg-pink-500">
                  {HousekeepingTask.assignedBy.name}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-emerald-500">
                  {HousekeepingTask.assignedTo.name}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(HousekeepingTask.createdAt)}</TableCell>
              <TableCell>
                <Badge
                  className={getRoomTaskStatusColor(
                    HousekeepingTask.status,
                    "bg"
                  )}
                >
                  {HousekeepingTask.status}
                </Badge>
              </TableCell>
              <TableCell>
                <EditHouseKeepingTask
                  housekeepingTask={HousekeepingTask}
                  rooms={rooms}
                  users={users}
                  assignedBy={assignedBy}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HousekeepingTable;
