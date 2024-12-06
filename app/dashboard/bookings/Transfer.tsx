"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/loading";
import {
  createRate,
  getLatestRateOfBooking,
  updateRate,
} from "@/lib/db/rateCrud";
import { Room, RoomStatus } from "@/lib/types/type";
import { updateBooking } from "@/lib/db/bookingCrud";
import { updateRoom } from "@/lib/db/roomCrud";
import { ArrowLeftRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const schema = z.object({
  rate: z.string().min(1, "Price is required"),
  roomId: z.string().min(1, "Room is required"),
});

type FormData = z.infer<typeof schema>;

const Transfer = ({
  bookingId,
  currentRoomId,
  rooms,
}: {
  bookingId: number;
  currentRoomId: number;
  rooms: Room[];
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
    setValue,
    formState: { errors },
  } = methods;

  async function onSubmit(formData: FormData) {
    try {
      setLoading(true);

      await updateBooking(bookingId, { roomId: Number(formData.roomId) });
      await updateRoom(Number(formData.roomId), {
        status: RoomStatus.OCCUPIED,
      });
      await updateRoom(currentRoomId, { status: RoomStatus.MAINTENANCE });
      const latest = await getLatestRateOfBooking(bookingId);

      await updateRate(latest.id, {
        endDate: new Date(),
      });
      await createRate({
        bookingId: bookingId,
        amount: formData.rate,
        startDate: new Date(),
      });
      toast({
        title: `Guest has transfered`,
        className: "bg-primary_color-500 text-white",
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
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <ArrowLeftRight
                  className="transform transition-transform hover:scale-110 text-emerald-500 cursor-pointer"
                  size={30}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Transfer</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transfer guest</DialogTitle>
        </DialogHeader>

        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={control}
              name="roomId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rooms</FormLabel>
                  <FormControl>
                    <Select
                      required
                      {...field}
                      onValueChange={(value: string) => {
                        field.onChange(value);

                        const selectedRoom = rooms.find(
                          (room) => room.id.toString() === value
                        );
                        if (selectedRoom) {
                          setValue("rate", selectedRoom.type.pricePerNight);
                        }
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select room" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Rooms</SelectLabel>
                          {rooms.map((room) => (
                            <SelectItem
                              key={room.id}
                              value={room.id.toString()}
                              disabled={room.status === RoomStatus.OCCUPIED}
                            >
                              {room.number}
                              {"  "}
                              <Badge className="bg-primary_color-500  hover:bg-primary_color-600">
                                {room.type.name}
                              </Badge>
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
              name="rate"
              defaultValue={""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter rate" {...field} />
                  </FormControl>
                  {errors.rate && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.rate.message}
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
                {loading ? <LoadingSpinner className="mr-2" /> : "Transfer"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Transfer;
