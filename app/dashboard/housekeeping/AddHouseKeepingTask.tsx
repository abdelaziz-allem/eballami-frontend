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
import { z } from "zod";
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
import { Room, User, userInSessionType } from "@/lib/types/type";
import { createHousekeepingTask } from "@/lib/db/houseKeepingTaskCrud";

const schema = z.object({
  description: z.string().min(1, "HousekeepingTask number is required"),
  roomId: z.string().min(1, "Room number is required"),
  userid: z.string().min(1, "assigned user  is required"),
});

type FormData = z.infer<typeof schema>;

const AddHouseKeepingTask = ({
  rooms,
  users,
  assignedBy,
}: {
  rooms: Room[];
  users: User[];
  assignedBy: userInSessionType;
}) => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  async function onSubmit(formData: FormData) {
    try {
      setLoading(true);

      await createHousekeepingTask({
        description: formData.description,
        roomId: Number(formData.roomId),
        assignedToId: Number(formData.userid),
        assignedById: assignedBy.id,
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

export default AddHouseKeepingTask;
