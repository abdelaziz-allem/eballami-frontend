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
import { Perk } from "@/lib/types/type";
import { createFacilityPerk } from "@/lib/db/facilityPerkCrud";

interface AddFacilityPerkProps {
  perks: Perk[];
  facilityId: number;
}

const schema = z.object({
  perkId: z.string().min(1, "perk  is required"),
});

type FormData = z.infer<typeof schema>;

const AddFacilityPerk = ({ perks, facilityId }: AddFacilityPerkProps) => {
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

      await createFacilityPerk({
        perkId: +formData.perkId,
        facilityId: +facilityId,
      });

      toast({
        title: "Added perk successfully",
        className: "bg-primary_color-500 ",
      });

      setDialogOpen(false);
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.message,
      });

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
          Add perk
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Link User to Facility</DialogTitle>
        </DialogHeader>

        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={control}
              name="perkId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Users</FormLabel>
                  <FormControl>
                    <Select
                      required
                      {...field}
                      onValueChange={(value: string) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select perk" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Perks</SelectLabel>
                          {perks.map((user) => (
                            <SelectItem
                              key={user.id}
                              value={user.id.toString()}
                            >
                              {user.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errors.perkId && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.perkId.message}
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

export default AddFacilityPerk;
