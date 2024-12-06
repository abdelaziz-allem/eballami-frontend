"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { LoadingSpinner } from "@/components/ui/loading";

import { createBooking } from "@/lib/db/bookingCrud";
import { createGuest } from "@/lib/db/guestCrud";
import { updateRoom } from "@/lib/db/roomCrud";
import { createRate } from "@/lib/db/rateCrud";

import { IdentificationType, Room, RoomStatus } from "@/lib/types/type";
import { toast } from "@/hooks/use-toast";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const identificationTypes = Object.values(IdentificationType);

const schema = z.object({
  checkInDate: z.string().min(1, "Check-in date is required"),
  checkOutDate: z.string().min(1, "Check-out date is required"),
  roomId: z.string().min(1, "Room is required"),
  roomRate: z.string().min(1, "Room rate is required"),
  guest: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    mobileNumber: z.string(),
    nikahDocumentImage: z.any().optional(),
    email: z.string().email("Invalid email address"),
    identificationType: z.enum(
      identificationTypes as [IdentificationType, ...IdentificationType[]]
    ),
    identificationNumber: z
      .string()
      .min(1, "Identification number is required"),
  }),
});

type FormData = z.infer<typeof schema>;

const AddBooking = ({ rooms }: { rooms: Room[] }) => {
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

  const AddTimetoDate = (date: string) => {
    const fullDate = new Date(date);
    const now = new Date();
    fullDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), 0);
    return fullDate;
  };

  const onSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      const guest = await createGuest({
        firstName: formData.guest.firstName,
        lastName: formData.guest.lastName,
        email: formData.guest.email,
        mobileNumber: formData.guest.mobileNumber,
        identificationType: formData.guest.identificationType,
        identificationNumber: formData.guest.identificationNumber,
        nikahDocumentImage: formData.guest.nikahDocumentImage,
      });
      const booking = await createBooking({
        roomId: Number(formData.roomId),
        checkInDate: AddTimetoDate(formData.checkInDate),
        checkOutDate: AddTimetoDate(formData.checkOutDate),
        guestId: guest.id,
      });

      await updateRoom(Number(formData.roomId), {
        status: RoomStatus.OCCUPIED,
      });

      await createRate({
        bookingId: booking.id,
        startDate: AddTimetoDate(formData.checkInDate),
        amount: formData.roomRate,
      });

      toast({
        title: `${formData.guest.firstName} ${formData.guest.lastName} has booked the room`,
        className: "bg-primary_color-500 text-white",
      });

      setDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Booking Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-primary_color-500 hover:bg-primary_color-600 text-white"
        >
          New booking
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Booking Information</DialogTitle>
        </DialogHeader>
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Guest Information */}
            <section className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="guest.firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      {errors.guest?.firstName && (
                        <p className="text-sm text-red-500">
                          {errors.guest.firstName.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="guest.lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      {errors.guest?.lastName && (
                        <p className="text-sm text-red-500">
                          {errors.guest.lastName.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="guest.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email"
                          {...field}
                        />
                      </FormControl>
                      {errors.guest?.email && (
                        <p className="text-sm text-red-500">
                          {errors.guest.email.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="guest.mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter mobile number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="guest.identificationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Identification Type</FormLabel>
                      <FormControl>
                        <Select
                          required
                          {...field}
                          onValueChange={(value: string) =>
                            field.onChange(value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Identification Types</SelectLabel>
                              {identificationTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      {errors.guest?.identificationType && (
                        <p className="text-sm text-red-500">
                          {errors.guest.identificationType.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="guest.identificationNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Identification Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter identification number"
                          {...field}
                        />
                      </FormControl>
                      {errors.guest?.identificationNumber && (
                        <p className="text-sm text-red-500">
                          {errors.guest.identificationNumber.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </section>

            {/* Booking Information */}
            <section className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="checkInDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check-in Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      {errors.checkInDate && (
                        <p className="text-sm text-red-500">
                          {errors.checkInDate.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="checkOutDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check-out Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      {errors.checkOutDate && (
                        <p className="text-sm text-red-500">
                          {errors.checkOutDate.message}
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
                              setValue(
                                "roomRate",
                                selectedRoom.type.pricePerNight
                              );
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
                                  className="font-semibold"
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
                  name="roomRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Rate</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter room rate"
                          {...field}
                        />
                      </FormControl>
                      {errors.roomRate && (
                        <p className="text-sm text-red-500">
                          {errors.roomRate.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="guest.nikahDocumentImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nikah Document</FormLabel>
                      <FormControl>
                        <Input type="file" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <DialogFooter>
              <Button
                type="submit"
                disabled={loading}
                className="rounded bg-primary_color-500 px-4 py-2 text-white hover:bg-primary_color-600"
              >
                {loading ? <LoadingSpinner className="mr-2" /> : "Book"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBooking;
