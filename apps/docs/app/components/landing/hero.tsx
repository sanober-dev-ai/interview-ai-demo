"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/dist/client/components/navigation";
import Image from "next/image";
import { AtsDrawer } from "../resume/ats-drawer";
import { useState } from "react";
import { AuthModal } from "../auth/auth-modal";
import { api } from "@/app/config/api-detail";

export function Hero() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const router = useRouter();

  const handleUpload = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setAuthModalOpen(true);
      return;
    }
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.doc,.docx";

    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      const userId = localStorage.getItem("userId");

      const formData = new FormData();
      formData.append("resume", file);
      formData.append("userId", userId!);

      const res = await fetch(`${api}/resume/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json(); // { jobId }
      console.log("Upload Response:", data.resume._id);
      setJobId(data.resume._id);
      // setDrawerOpen(true);
      router.push(`/dashboard`);
    };

    input.click();
  };
  return (
    <>
      <section className="relative overflow-hidden py-24 min-h-[90vh] flex items-center">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2400"
          alt="AI Background"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/75" />

        {/* Optional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
                ✨ AI Resume Analysis + Mock Interviews
              </div>

              <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
                Land More Interviews With AI
              </h1>

              <p className="mt-6 text-xl text-gray-300">
                Upload your resume, improve ATS score, and practice interviews
                with an AI recruiter.
              </p>

              <div className="mt-8 flex gap-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={handleUpload}
                >
                  Upload Resume
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Watch Demo
                </Button>
              </div>

              <p className="mt-6 text-sm text-gray-400">
                Trusted by 10,000+ job seekers
              </p>
            </div>

            <div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-between text-white">
                  <span>Resume ATS Score</span>
                  <span className="font-bold text-green-400">82%</span>
                </div>

                <div className="h-4 rounded-full bg-white/10">
                  <div className="h-4 w-[82%] rounded-full bg-green-500" />
                </div>

                <div className="mt-8 space-y-4 text-white">
                  <div className="rounded-xl border border-white/10 p-4">
                    ✓ React
                  </div>

                  <div className="rounded-xl border border-white/10 p-4">
                    ✓ Node.js
                  </div>

                  <div className="rounded-xl border border-white/10 p-4">
                    ✗ Testing Experience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AtsDrawer
        jobId={jobId}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
