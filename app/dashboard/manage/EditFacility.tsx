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
import { Facility } from "@/lib/types/type";
import { Edit, ImagePlus } from "lucide-react";
import timeList from "./timeList";

const schema = z.object({
  name: z.string().min(1, "User number is required"),
  mobileNumber: z.string().min(1, "Mobile number is required").optional(),
  email: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  logo: z
    .instanceof(File)
    .optional()
    .refine(
      (file) =>
        file === undefined || ["image/jpeg", "image/png"].includes(file.type),
      { message: "Logo must be an image file of type jpg, jpeg, or png" }
    ),
  openHour: z.string(),
  closeHour: z.string(),
  price: z.number(),
});

type FormData = z.infer<typeof schema>;

const EditFacility = ({ facility }: { facility: Facility }) => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const router = useRouter();

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: facility.name,
      mobileNumber: facility.mobileNumber,
      email: facility.email,
      description: facility.description,
      openHour: facility.openHour,
      closeHour: facility.closeHour,
      price: facility.price,
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

      if (formData.logo) {
        const ImageForm = new FormData();
        ImageForm.append(
          "UPLOADCARE_PUB_KEY",
          process.env.NEXT_PUBLIC_UPLOADCARE_API_KEY!
        );
        ImageForm.append("file", formData.logo);

        const response = await fetch("https://upload.uploadcare.com/base/", {
          method: "POST",
          body: ImageForm,
        });

        console.log("response", response);

        if (!response.ok) {
          throw new Error("Failed to upload image to Uploadcare");
        }

        const data = await response.json();
        const imageUrl = data.file;

        setImageUrl(`https://ucarecdn.com/${imageUrl}/
-/preview/1000x750/`);
        console.log("data", data);
      }

      updateFacility(facility.id, {
        name: formData.name,
        mobileNumber: formData.mobileNumber,
        email: formData.email,
        description: formData.description,
        logo: imageUrl,
        openHour: formData.openHour,
        closeHour: formData.closeHour,
        price: +formData.price,
      });

      toast({
        title: "User created successfully",
        className: "bg-primary_color-500 text-white",
      });

      setDialogOpen(false);
      // window.location.reload();
    } catch (error) {
      console.error("An error occurred:", error);
    }
    setLoading(false);
  }
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Edit className="text-primary_color-600 cursor-pointer transform transition-transform hover:scale-110" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
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
              name="mobileNumber"
              defaultValue={""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number(s)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Put space between mobileNumber"
                      {...field}
                    />
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
              name="email"
              defaultValue={""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email" {...field} />
                  </FormControl>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
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
                    <Input
                      type="description"
                      placeholder="Enter description"
                      {...field}
                    />
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
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  {errors.logo && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.logo.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="openHour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hours</FormLabel>
                  <FormControl>
                    <Select
                      required
                      {...field}
                      onValueChange={(value: string) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select open hour" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Hours</SelectLabel>
                          {timeList.map((hour) => (
                            <SelectItem key={hour.id} value={hour.value}>
                              {hour.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errors.openHour && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.openHour.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="closeHour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hours</FormLabel>
                  <FormControl>
                    <Select
                      required
                      {...field}
                      onValueChange={(value: string) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select close hour" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Hours</SelectLabel>
                          {timeList.map((hour) => (
                            <SelectItem key={hour.id} value={hour.value}>
                              {hour.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errors.closeHour && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.closeHour.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="Price /hour"
                      placeholder="Enter price per hour"
                      {...field}
                    />
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

export default EditFacility;
