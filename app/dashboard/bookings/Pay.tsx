"use client";
import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/ui/loading";
import { PaymentMethod } from "@/lib/types/type";
import { createPayment } from "@/lib/db/paymentCrud";
import { toast } from "@/hooks/use-toast";
import { CreditCard } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const paymentMethodOptions = Object.values(PaymentMethod);

const schema = z.object({
  amount: z.string().min(1, "User number is required"),

  paymentMethod: z.enum(
    paymentMethodOptions as [PaymentMethod, ...PaymentMethod[]]
  ),
});

type FormData = z.infer<typeof schema>;

const Pay = ({ bookingId, userId }: { bookingId: number; userId: number }) => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

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

      await createPayment({
        amount: formData.amount,
        method: formData.paymentMethod,
        bookingId: bookingId,
        userId: userId,
      });
      setLoading(false);
      toast({
        title: `Payment of $${formData.amount} has been made`,
        className: "bg-primary_color-500 text-white",
      });
      setDialogOpen(false);
      window.location.reload();
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
                <CreditCard
                  className="transform transition-transform hover:scale-110 text-blue-500 cursor-pointer"
                  size={30}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Pay</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payment</DialogTitle>
        </DialogHeader>
        <Form {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 py-4 m-w-4"
          >
            <FormField
              control={control}
              name="amount"
              defaultValue={""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paid Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter user amount"
                      {...field}
                    />
                  </FormControl>
                  {errors.amount && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.amount.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paid Method</FormLabel>
                  <FormControl>
                    <Select
                      required
                      {...field}
                      onValueChange={(value: string) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Payment Method</SelectLabel>
                          {paymentMethodOptions.map((method) => (
                            <SelectItem key={method} value={method}>
                              {method}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errors.paymentMethod && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.paymentMethod.message}
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
                {loading ? <LoadingSpinner className="mr-2" /> : "Pay"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Pay;
