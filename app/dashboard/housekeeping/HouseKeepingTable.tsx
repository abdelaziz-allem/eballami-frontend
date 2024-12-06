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
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="w-full border-none shadow-none">
      <CardContent>
        <div className="flex justify-between mb-4">
          <Input
            className="w-auto"
            placeholder="Search by room..."
            value={search}
            onChange={handleInputChange}
          />
          <AddHouseKeepingTask
            rooms={rooms}
            users={users}
            assignedBy={assignedBy}
          />
        </div>

        <Table>
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
                  <Badge className="bg-primary_color-500">
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
      </CardContent>
    </Card>
  );
};

export default HousekeepingTable;
