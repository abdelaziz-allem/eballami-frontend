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
import { getAccessToken } from "@/lib/db/auth";
import nookies from "nookies";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().min(1, "Phone number is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginPage() {
  const router = useRouter();
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
      const user = await getAccessToken({
        email: data.email,
        password: data.password,
      });
      nookies.set(undefined, "access_token", user.access_token, { path: "/" });
      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err?.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-violet-500 p-6">
      <Card className="w-full max-w-md rounded-xl shadow-xl bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800 dark:text-white">
            Login
          </CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-300">
            Enter your email and password to access your account or continue
            with Google
          </CardDescription>
        </CardHeader>
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="space-y-6">
              {/* email Field */}
              <FormField
                control={control}
                name="email"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 dark:text-white">
                      email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          size={20}
                        />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              {/* Password Field */}
              <FormField
                control={control}
                name="password"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 dark:text-white">
                      Password
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
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </Form>
        <Button
          className="w-full mt-6 bg-white text-violet-500 hover:bg-gray-100 font-semibold py-3 rounded-lg"
          onClick={() =>
            router.push(
              `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/google/callback`
            )
          }
        >
          Continue with Google
        </Button>
      </Card>
    </div>
  );
}

export default LoginPage;
