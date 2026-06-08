"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormValues, signinSchema } from "./auth-schema";

export function SignInForm({ onSwitch }: { onSwitch: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SignInFormValues) => {
    console.log("SIGN IN:", data);
    const res = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (res.ok) {
      localStorage.setItem("token", resData.token);
      localStorage.setItem("userId", resData.user._id);
      window.location.href = "/dashboard";
    } else {
      alert(resData.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Welcome Back</h2>

      <input {...register("email")} placeholder="Email" className="input" />
      <p className="text-red-400 text-sm">{errors.email?.message}</p>

      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="input"
      />
      <p className="text-red-400 text-sm">{errors.password?.message}</p>

      <button className="btn-primary w-full">
        {isSubmitting ? "Signing in..." : "Sign In"}
      </button>

      <p className="text-center text-sm text-white/60">
        Don’t have an account?{" "}
        <button type="button" onClick={onSwitch} className="text-blue-400">
          Create Account
        </button>
      </p>
    </form>
  );
}
