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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { toast } from "@/hooks/use-toast";
import { updateFacility } from "@/lib/db/facilityCrud";
import { Pencil } from "lucide-react";
import { Facility, FacilityType } from "@/lib/types/type";

const facilityTypeOptions = Object.values(FacilityType);

const schema = z.object({
  name: z.string().min(1, "User number is required"),
  description: z.string().min(1, "Description is required"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  address: z.string().min(1, "Address is required"),
  map: z.string().min(1, "Map is required"),
  type: z.enum(facilityTypeOptions as [FacilityType, ...FacilityType[]]),
});

type FormData = z.infer<typeof schema>;

const EditFacility = ({ facility }: { facility: Facility }) => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: facility.name,
      mobileNumber: facility.mobileNumber,
      description: facility.description,
      address: facility.address,
      map: facility.map,
      type: facility.type,
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

      await updateFacility(facility.id, {
        name: formData.name,
        description: formData.description,
        address: formData.address,
        map: formData.map,
        mobileNumber: formData.mobileNumber,
        type: formData.type,
      });

      setDialogOpen(false);

      toast({
        title: "Facility updated successfully",
        className: "bg-primary_color-500 ",
      });
      router.refresh();
    } catch (error) {
      console.error("An error occurred:", error);
    }
    setLoading(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-primary_color-500 hover:bg-primary_color-600 "
        >
          Edit facility
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add facility</DialogTitle>
        </DialogHeader>

        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={control}
              name="name"
              defaultValue={""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter user name" {...field} />
                  </FormControl>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="description"
              defaultValue={""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter description" {...field} />
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
              name="mobileNumber"
              defaultValue={""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter mobileNumber" {...field} />
                  </FormControl>
                  {errors.mobileNumber && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.mobileNumber.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="address"
              defaultValue={""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" {...field} />
                  </FormControl>
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="map"
              defaultValue={""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Map</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter map" {...field} />
                  </FormControl>
                  {errors.map && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.map.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facility Type</FormLabel>
                  <FormControl>
                    <Select
                      required
                      {...field}
                      onValueChange={(value: string) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select facility type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Facility Type</SelectLabel>
                          {facilityTypeOptions.map((facilityType) => (
                            <SelectItem key={facilityType} value={facilityType}>
                              {facilityType}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.type.message}
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

export default EditFacility;
