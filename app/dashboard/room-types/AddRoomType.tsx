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
import { createRoomType } from "@/lib/db/roomTypesCrud";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  type: z.string().min(1, "Room number is required"),
  price: z.string().min(1, "Price is required"),
});

type FormData = z.infer<typeof schema>;

const AddRoomType = () => {
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

      await createRoomType({
        name: formData.type,
        pricePerNight: formData.price,
      });

      toast({
        title: "Room type created successfully",
        className: "bg-primary_color-500 ",
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
          variant="default"
          className="bg-primary_color-500 hover:bg-primary_color-600 text-white"
        >
          New type
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Room Type</DialogTitle>
        </DialogHeader>

        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={control}
              name="type"
              defaultValue={""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room type name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter room type" {...field} />
                  </FormControl>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.type.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="price"
              defaultValue={""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter price" {...field} />
                  </FormControl>
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.price.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                disabled={loading}
                className="rounded bg-primary_color-500 px-4 py-2 text-white hover:bg-primary_color-600"
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

export default AddRoomType;
