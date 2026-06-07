// components/landing/features.tsx

import { FileText, Brain, BarChart3, ArrowRight } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "ATS Resume Analysis",
    description:
      "Get instant ATS scores, keyword insights, and actionable recommendations.",
  },
  {
    icon: Brain,
    title: "AI Mock Interviews",
    description:
      "Practice technical and behavioral interviews with an AI recruiter.",
  },
  {
    icon: BarChart3,
    title: "Career Analytics",
    description:
      "Track improvement over time with detailed performance reports.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur">
            Features
          </div>

          <h2 className="mt-6 text-4xl font-bold md:text-6xl">
            Everything you need to land your next role
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Optimize your resume, master interviews, and track progress with
            AI-powered career tools.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="
                group
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                p-8
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-primary/40
                hover:bg-white/[0.05]
              "
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>

              <h3 className="mt-6 text-2xl font-semibold">{feature.title}</h3>

              <p className="mt-4 text-muted-foreground">
                {feature.description}
              </p>

              <div className="mt-8 flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition group-hover:opacity-100">
                Learn more
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
