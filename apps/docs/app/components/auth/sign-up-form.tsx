"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignUpFormValues } from "./auth-schema";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function SignUpForm({ onSwitch }: { onSwitch: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignUpFormValues) => {
    console.log("SIGN UP:", data);
    await new Promise((r) => setTimeout(r, 1200));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Create Account</h2>

      <input
        {...register("fullName")}
        placeholder="Full Name"
        className="input"
      />
      <p className="text-red-400 text-sm">{errors.fullName?.message}</p>

      <input {...register("email")} placeholder="Email" className="input" />
      <p className="text-red-400 text-sm">{errors.email?.message}</p>

      <input {...register("phone")} placeholder="Phone" className="input" />
      <p className="text-red-400 text-sm">{errors.phone?.message}</p>

      <select {...register("experience")} className="input">
        <option value="">Experience</option>
        <option value="0-1">0-1</option>
        <option value="1-3">1-3</option>
        <option value="3-5">3-5</option>
      </select>
      <p className="text-red-400 text-sm">{errors.experience?.message}</p>

      <div className="relative">
        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="input pr-10"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-white/60"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      <p className="text-red-400 text-sm">{errors.password?.message}</p>

      <button className="btn-primary w-full">
        {isSubmitting ? "Creating..." : "Create Account"}
      </button>

      <p className="text-center text-sm text-white/60">
        Already have an account?{" "}
        <button type="button" onClick={onSwitch} className="text-blue-400">
          Sign In
        </button>
      </p>
    </form>
  );
}
