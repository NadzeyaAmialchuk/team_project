"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(
      /^[a-zA-Z0-9._]+$/,
      "Username can only contain letters, numbers, periods, and underscores",
    ),
  email: z
    .string()
    .min(1, "Email is required")
    .refine(
      (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      "Invalid email",
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z
    .string()
    .min(1, "phone number is required")
    .refine((value) => /^\+?[0-9]{10,15}$/.test(value), "Invalid phone")
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    console.log(data);
    try {
      console.log(JSON.stringify(data))
      await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <input
          type="text"
          placeholder="username"
          className={`w-full px-4 py-2 border ${
            errors.username ? "border-red-500" : "border-gray-300"
          } rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-blue-500`}
          {...register("username")}
        />
        {errors.username && (
          <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
        )}
      </div>
      <div>
        <input
          type="text"
          placeholder="email"
          className={`w-full px-4 py-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-blue-500`}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="password"
          className={`w-full px-4 py-2 border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-blue-500`}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>
      <div>
        <input
          type="text"
          placeholder="Phone"
          className={`w-full px-4 py-2 border ${
            errors.phone ? "border-red-500" : "border-gray-300"
          } rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-blue-500`}
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>
      <div className="text-xs text-gray-500 text-center px-2">
        People who use our service may have uploaded your contact information to
        Instagram.{" "}
        <a href="#" className="text-blue-500">
          Learn More
        </a>
      </div>
      <div className="text-xs text-gray-500 text-center px-2">
        By signing up, you agree to our{" "}
        <a href="#" className="text-blue-500">
          Terms
        </a>
        ,{" "}
        <a href="#" className="text-blue-500">
          Privacy Policy
        </a>
        , and{" "}
        <a href="#" className="text-blue-500">
          Cookies Policy
        </a>
        .
      </div>

      <button
        type="submit"
        disabled={!isValid || isLoading}
        className={`w-full bg-blue-500 text-white py-1.5 rounded-md text-sm font-medium ${
          !isValid || isLoading
            ? "opacity-70 cursor-not-allowed"
            : "hover:bg-blue-600"
        }`}
      >
        {isLoading ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
}
