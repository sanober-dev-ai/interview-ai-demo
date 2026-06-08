"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ open, onClose }: Props) {
  const [mode, setMode] = useState<"signin" | "signup">("signup");

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-[#07142e] border border-white/10"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/70"
          >
            <X />
          </button>

          <div className="grid md:grid-cols-2">
            {/* LEFT */}
            <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-blue-600 to-violet-700 text-white">
              <h2 className="text-3xl font-bold">InterviewAI Pro</h2>
              <p className="mt-4 text-white/80">
                AI-powered resume analysis & interview practice
              </p>
            </div>

            {/* RIGHT */}
            <div className="p-8">
              {/* FORMS */}
              {mode === "signup" ? (
                <SignUpForm onSwitch={() => setMode("signin")} />
              ) : (
                <SignInForm onSwitch={() => setMode("signup")} />
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
