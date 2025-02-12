"use client";

import { useState } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EyeIcon, EyeOffIcon, Mail, PhoneIcon } from "lucide-react";
import { getAccessToken, resetPassword } from "@/lib/db/auth";
import nookies from "nookies";
import { useRouter } from "next/navigation";
import { getUserInSession } from "@/lib/db/userCrud";
import { toast } from "@/hooks/use-toast";

const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function ResetPassword({ token }: { token: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError("");

    try {
      const response = await resetPassword(token, data.password);
      toast({
        title: "Password reset successfully",
        className: "bg-primary_color-500 ",
      });
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err?.message || "An unexpected error occurred. Please try again."
      );
      toast({
        title: "Password reset failed",
        className: "bg-red-500 ",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-violet-500 p-6">
      <Card className="w-full max-w-md rounded-xl shadow-xl bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800 dark:text-white">
            Reset password
          </CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-300">
            Enter your new password
          </CardDescription>
        </CardHeader>
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="space-y-6">
              <FormField
                control={control}
                name="password"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 dark:text-white">
                      New password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                          {...field}
                        />
                        <button
                          type="button"
                          aria-label="Toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? (
                            <EyeOffIcon size={20} />
                          ) : (
                            <EyeIcon size={20} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              {/* Error Message */}
              {error && <p className="text-sm text-red-500">{error}</p>}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-lg py-3"
                type="submit"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default ResetPassword;
