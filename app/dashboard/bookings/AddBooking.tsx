"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/loading";
import { createBooking } from "@/lib/db/bookingCrud";
import { createGuest } from "@/lib/db/guestCrud";
import { updateRoom } from "@/lib/db/roomCrud";
import { Status } from "@/lib/types/type";

const schema = z.object({
  checkOutDate: z.string().min(1, "Check-out date is required"),
  guest: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    mobileNumber: z.string(),
    nikahDocumentImage: z.string().optional(),
    email: z.string().email("Invalid email"),
    identificationType: z.string().min(1, "Identification type is required"),
    identificationNumber: z
      .string()
      .min(1, "Identification number is required"),
  }),
});

type FormData = z.infer<typeof schema>;

const AddBooking = ({
  roomId,
  onClose,
}: {
  roomId: number;
  onClose: () => void;
}) => {
  const [loading, setLoading] = useState(false);
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

      const guest = await createGuest({
        firstName: formData.guest.firstName,
        lastName: formData.guest.lastName,
        email: formData.guest.email,
        mobileNumber: formData.guest.mobileNumber,
        nikahDocumentImage: formData.guest.nikahDocumentImage,
        identificationType: formData.guest.identificationType,
        identificationNumber: formData.guest.identificationNumber,
      });

      const bookedRoom = await createBooking({
        roomId,
        checkInDate: new Date(),
        checkOutDate: new Date(formData.checkOutDate),
        guestId: guest.id,
      });

      await updateRoom(bookedRoom.roomId, {
        status: Status.OCCUPIED,
      });

      setLoading(false);
      onClose();
      router.refresh();
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Booking</h1>

      <Form {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex  gap-8">
            <div>
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
                name="guest.mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter mobile number"
                        {...field}
                      />
                    </FormControl>
                    {errors.guest?.mobileNumber && (
                      <p className="text-sm text-red-500">
                        {errors.guest.mobileNumber.message}
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
                name="guest.identificationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identification Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Passport" {...field} />
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
                name="guest.nikahDocumentImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identification Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., image" {...field} />
                    </FormControl>
                    {errors.guest?.nikahDocumentImage && (
                      <p className="text-sm text-red-500">
                        {errors.guest.nikahDocumentImage.message}
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

            <div>
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
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <Button
              type="submit"
              disabled={loading}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              {loading ? <LoadingSpinner className="mr-2" /> : "Save Booking"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddBooking;
