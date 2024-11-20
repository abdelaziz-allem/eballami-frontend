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

// import { createRoom } from "@/lib/db/roomCrud";
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
import { Edit2Icon } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading";
import { RoomType } from "@/lib/types/type";
import { updateRoom } from "@/lib/db/roomCrud";

const schema = z.object({
  roomNumber: z.string().min(1, "Room number is required"),
  typeId: z.string().min(1, "Room type is required"),
});

type FormData = z.infer<typeof schema>;

interface EditRoomProps {
  roomId: number;
  roomNumber: string;
  roomTypeId: number;
  roomTypes: RoomType[];
}

const EditRoom = ({
  roomId,
  roomNumber,
  roomTypeId,
  roomTypes,
}: EditRoomProps) => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      roomNumber: roomNumber,
      typeId: String(roomTypeId),
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

      console.log(formData);

      await updateRoom(roomId, {
        number: formData.roomNumber,
        typeId: Number(formData.typeId),
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
          className="rounded-full p-2 text-emerald-500 transition-colors duration-300 ease-in-out hover:bg-emerald-100 hover:text-emerald-500"
          variant="ghost"
        >
          <Edit2Icon className="transform transition-transform hover:scale-110" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Room</DialogTitle>
        </DialogHeader>

        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={control}
              name="roomNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter room number" {...field} />
                  </FormControl>
                  {errors.roomNumber && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.roomNumber.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="typeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Type</FormLabel>
                  <FormControl>
                    <Select
                      required
                      {...field}
                      defaultValue="1"
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Room Type</SelectLabel>
                          {roomTypes.map((roomType) => (
                            <SelectItem
                              key={roomType.id}
                              value={roomType.id.toString()}
                            >
                              {roomType.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errors.typeId && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.typeId.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                disabled={loading}
                className="rounded bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
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

export default EditRoom;
