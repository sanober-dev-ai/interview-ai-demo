// app/page.tsx

import React from "react";
import { CTASection } from "./components/landing/CTASection";
import { Features } from "./components/landing/featues";
import { Footer } from "./components/landing/Footer";
import { Hero } from "./components/landing/hero";

import { Navbar } from "./components/landing/navbar";
import { Testimonials } from "./components/landing/testimonials";
import { Trusted } from "./components/landing/trusted";

// import { AtsDemo } from "../../components/landing/ats-demo";
// import { InterviewDemo } from "@/components/landing/interview-demo";
// import { Testimonials } from "@/components/landing/testimonials";
// import { Pricing } from "@/components/landing/pricing";
// import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <CTASection />
      <Testimonials />
      <Trusted />
      <Footer />
    </>
  );
}
