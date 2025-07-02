"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Required")
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
        /^\+?[0-9]{10,15}$/.test(value) ||
        /^[a-zA-Z0-9._]{3,}$/.test(value),
      "Invalid input",
    ),
  password: z.string().min(6, "Minimum 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function SignInForm() {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("login error");
      }

      router.push("/userprofile");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <input
        {...register("email")}
        placeholder="email"
        className="px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400"
      />
      <input
        type="password"
        {...register("password")}
        placeholder="password"
        className="px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400"
      />
      <button
        type="submit"
        disabled={!formState.isValid}
        className={`py-1 text-sm font-medium text-white rounded ${
          formState.isValid ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-300"
        }`}
      >
        Log In
      </button>
    </form>
  );
}
