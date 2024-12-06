"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { updateUser } from "@/lib/db/userCrud";
import { toast } from "@/hooks/use-toast";

const formSchema = z
  .object({
    old_password: z.string().min(4, "Not valid"),
    new_password: z.string().min(4, "Not valid"),
    confirm_password: z.string().min(1, "Not valid"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const ChangePassword = ({ userId }: { userId: number }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      updateUser(userId, {
        password: values.new_password,
      });
      toast({
        title: "Password updated successfully",
        className: "bg-primary_color-500 text-white",
      });
    } catch (error) {
      console.error(error);

      toast({
        title: "Error updating password",
        description: "Please try again later",
        variant: "destructive",
      });
    }
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="mx-4 flex justify-center text-gray-900 dark:text-slate-50">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 w-full max-w-lg p-10 shadow-md"
        >
          <FormField
            control={form.control}
            name="old_password"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Old pasword</FormLabel>
                <FormControl>
                  <Input required placeholder="eg. 123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="name"
                    placeholder="eg:123456789"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Confirm new password</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="name"
                    placeholder="eg:123456789"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-4 flex justify-center">
            <Button
              type="submit"
              disabled={loading}
              className="rounded bg-primary_color-500 px-4 py-2 text-white hover:bg-primary_color-600"
            >
              {loading ? <LoadingSpinner className="mr-2" /> : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangePassword;
