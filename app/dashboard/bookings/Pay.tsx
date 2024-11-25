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
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/loading";
import { PaymentMethod } from "@/lib/types/type";
import { createPayment } from "@/lib/db/paymentCrud";
import { toast } from "@/hooks/use-toast";
const paymentMethodOptions = Object.values(PaymentMethod);

const schema = z.object({
  amount: z.string().min(1, "User number is required"),

  paymentMethod: z.enum(
    paymentMethodOptions as [PaymentMethod, ...PaymentMethod[]]
  ),
});

type FormData = z.infer<typeof schema>;

const Pay = ({
  bookingId,
  onClose,
}: {
  bookingId: number;
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

      await createPayment({
        amount: formData.amount,
        method: formData.paymentMethod,
        bookingId: bookingId,
      });
      setLoading(false);
      toast({
        title: `Payment of $${formData.amount} has been made`,
        className: "bg-emerald-700",
      });
      onClose();
      router.refresh();
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
  }

  return (
    <div>
      <Form {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <FormField
            control={control}
            name="amount"
            defaultValue={""}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paid Amount</FormLabel>
                <FormControl>
                  <Input placeholder="Enter user amount" {...field} />
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

          <Button
            type="submit"
            disabled={loading}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            {loading ? <LoadingSpinner className="mr-2" /> : "Save"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Pay;
