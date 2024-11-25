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

const schema = z.object({
  rate: z.string().min(1, "Price is required"),
});

type FormData = z.infer<typeof schema>;

const ChangeRate = ({
  bookingId,
  onClose,
}: {
  bookingId: number;
  onClose: () => void;
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

      const latest = await getLatestRateOfBooking(bookingId);

      await updateRate(latest.id, {
        endDate: new Date(),
      });

      await createRate({
        bookingId: bookingId,
        amount: formData.rate,
        startDate: new Date(),
      });
      onClose();
      setLoading(false);
      router.refresh();
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Change Rate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change rate</DialogTitle>
        </DialogHeader>

        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
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

            <Button
              type="submit"
              disabled={loading}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              {loading ? <LoadingSpinner className="mr-2" /> : "Save"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeRate;
