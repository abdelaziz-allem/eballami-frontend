"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { object, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Edit2 } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading";
import {
  HousekeepingTask,
  Room,
  TaskStatus,
  User,
  userInSessionType,
} from "@/lib/types/type";
import {
  createHousekeepingTask,
  updateHousekeepingTask,
} from "@/lib/db/houseKeepingTaskCrud";

const statusOptions = Object.values(TaskStatus);

const schema = z.object({
  description: z.string().min(1, "HousekeepingTask number is required"),
  roomId: z.string().min(1, "Room number is required"),
  userid: z.string().min(1, "assigned user  is required"),
  status: z.enum(statusOptions as [TaskStatus, ...TaskStatus[]]),
});

type FormData = z.infer<typeof schema>;

const EditHouseKeepingTask = ({
  rooms,
  users,
  assignedBy,
  housekeepingTask,
}: {
  rooms: Room[];
  users: User[];
  assignedBy: userInSessionType;
  housekeepingTask: HousekeepingTask;
}) => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: housekeepingTask.description,
      roomId: housekeepingTask.roomId.toString(),
      userid: housekeepingTask.assignedToId.toString(),
      status: housekeepingTask.status,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  async function onSubmit(formData: FormData) {
    try {
      setLoading(true);

      await updateHousekeepingTask(housekeepingTask.id, {
        description: formData.description,
        roomId: Number(formData.roomId),
        assignedToId: Number(formData.userid),
        assignedById: assignedBy.id,
        status: formData.status,
      });

      setLoading(false);
      setDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="rounded-full p-2 text-blue-500 transition-colors duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-500"
          variant="ghost"
        >
          <Edit2 className="transform transition-transform hover:scale-110" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={control}
              name="description"
              defaultValue={""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter user description" {...field} />
                  </FormControl>
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="roomId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>rooms</FormLabel>
                  <FormControl>
                    <Select
                      required
                      {...field}
                      onValueChange={(value: string) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select room" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>rooms</SelectLabel>
                          {rooms.map((room) => (
                            <SelectItem
                              key={room.id}
                              value={room.id.toString()}
                            >
                              {room.number}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errors.roomId && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.roomId.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="userid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned to</FormLabel>
                  <FormControl>
                    <Select
                      required
                      {...field}
                      onValueChange={(value: string) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select user" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>users</SelectLabel>
                          {users.map((user) => (
                            <SelectItem
                              key={user.id}
                              value={user.id.toString()}
                            >
                              {user.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errors.userid && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.userid.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      required
                      {...field}
                      onValueChange={(value: string) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          {statusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errors.status && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.status.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                disabled={loading}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                {loading ? <LoadingSpinner className="mr-2" /> : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditHouseKeepingTask;
