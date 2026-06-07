// components/landing/cta.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, FileText } from "lucide-react";
import { AuthModal } from "../auth/auth-modal";

export function CTASection() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden py-32">
        {/* Background Effects */}

        <div className="absolute inset-0 -z-10">
          <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <div
            className="
              relative
              overflow-hidden
              rounded-[40px]
              border
              border-white/10
              bg-gradient-to-br
              from-blue-500/10
              via-background
              to-violet-500/10
              p-8
              md:p-16
              backdrop-blur-xl
            "
          >
            {/* Decorative Glow */}

            <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {/* Left Content */}

              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur">
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                  AI-Powered Career Growth
                </div>

                <h2 className="mt-8 text-4xl font-bold tracking-tight md:text-6xl">
                  Ready to Land More Interviews?
                </h2>

                <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                  Join thousands of professionals using AI to improve resumes,
                  increase ATS scores, and practice real interview questions.
                </p>

                {/* Stats */}

                <div className="mt-10 grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl font-bold">10K+</div>
                    <div className="text-sm text-muted-foreground">Users</div>
                  </div>

                  <div>
                    <div className="text-3xl font-bold">92%</div>
                    <div className="text-sm text-muted-foreground">
                      ATS Success
                    </div>
                  </div>

                  <div>
                    <div className="text-3xl font-bold">50K+</div>
                    <div className="text-sm text-muted-foreground">Resumes</div>
                  </div>
                </div>

                {/* Features */}

                <div className="mt-10 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm">
                    <FileText className="h-4 w-4" />
                    ATS Analysis
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm">
                    <Users className="h-4 w-4" />
                    AI Interviews
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm">
                    <Sparkles className="h-4 w-4" />
                    Career Reports
                  </div>
                </div>
              </div>

              {/* Right Card */}

              <div
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-8
                  backdrop-blur-xl
                "
              >
                <h3 className="text-2xl font-bold">Get Started For Free</h3>

                <p className="mt-2 text-muted-foreground">
                  Create your account and get your first ATS analysis today.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-muted-foreground">
                    Full Name
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-muted-foreground">
                    Email Address
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-muted-foreground">
                    Years of Experience
                  </div>

                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => setAuthOpen(true)}
                  >
                    Create Free Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    No credit card required
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
