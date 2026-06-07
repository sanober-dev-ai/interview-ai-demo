"use client";

import React, { memo, useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  company: string;
  image: string;
  content: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Michael Johnson",
    company: "CEO, Tech Corp",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    content:
      "My cooperation with the IT company was very positive. They impressed me with their openness and professionalism in communication.",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    company: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    content:
      "The team’s ability to translate complex requirements into a seamless user experience was incredible.",
  },
  {
    id: 3,
    name: "David Chen",
    company: "Lead Developer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
    content:
      "Finding a partner that understands clean code and scalable architecture is rare. These guys are the real deal.",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    company: "Marketing Director",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    content:
      "Their attention to detail regarding brand guidelines was impressive.",
  },
];

type ThumbnailProps = {
  item: Testimonial;
  active: boolean;
  onClick: () => void;
};

const Thumbnail = memo(function Thumbnail({
  item,
  active,
  onClick,
}: ThumbnailProps) {
  return (
    <button
      onClick={onClick}
      className={`h-20 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
        active
          ? "scale-110 border-primary"
          : "border-transparent opacity-50 grayscale"
      }`}
    >
      <Image
        src={item.image}
        alt={item.name}
        width={64}
        height={80}
        className="h-full w-full object-cover"
      />
    </button>
  );
});

export function Testimonials() {
  const [index, setIndex] = useState(0);

  const current = useMemo(() => testimonials[index], [index]);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  return (
    <section id="testimonials" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-left max-w-6xl mx-auto mb-8">
          <h2 className="text-4xl md:text-6xl font-black text-black leading-tight">
            Our Alumni Testimonials
          </h2>

          <p className="text-gray-400 text-lg mt-0 leading-relaxed">
            Hear from students and graduates who experienced innovation,
            opportunities, and career growth through our modern education
            system.
          </p>
        </div>

        {/* Main Card */}
        <div className="relative w-full max-w-6xl grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-center mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current?.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
              className="contents"
            >
              {/* ================= Image ================= */}

              <div className="relative">
                <div className="absolute -bottom-2 -left-2 w-full h-full border-4 border-orange-400 z-0" />

                <img
                  src={current?.image || ""}
                  alt={current?.name || "Testimonial"}
                  className="
                    relative z-10
                    w-full
                    h-87.5 md:h-125
                    object-cover
                    grayscale hover:grayscale-0
                    transition-all duration-500
                  "
                />
              </div>

              {/* ================= Content ================= */}

              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="text-2xl font-bold">{current?.name}</h3>

                    <p className="text-gray-500 text-sm mt-1">
                      {current?.company}
                    </p>

                    <div className="flex text-orange-400 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} fill="currentColor" />
                      ))}
                    </div>
                  </div>

                  <button
                    className="
                    bg-gradient-to-r
                from-yellow-300
                to-orange-300
                      hover:bg-orange-500
                      border border-white/30
                      px-4 py-2
                      text-sm font-semibold
                      rounded-md
                      hover:scale-105
                      transition-all duration-300
                    "
                  >
                    Read more
                  </button>
                </div>

                <p className="text-gray-500 leading-relaxed text-lg italic">
                  "{current?.content}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className="
            mt-8
            flex items-center gap-4
            mx-auto
            w-full max-w-md md:max-w-max
            justify-center
            px-2
          "
        >
          {/* Left */}

          <button
            onClick={prev}
            className="
              p-2 rounded-md
              border border-gray-300
              hover:border-orange-400
              transition-colors
              shrink-0
            "
          >
            <ChevronLeft size={20} />
          </button>

          {/* Thumbnails */}

          <div className="flex gap-3 overflow-hidden">
            {testimonials.map((item) => {
              const actualIndex = testimonials.findIndex(
                (t) => t.id === item.id,
              );

              return (
                <Thumbnail
                  key={item.id}
                  item={item}
                  active={index === actualIndex}
                  onClick={() => setIndex(actualIndex)}
                />
              );
            })}
          </div>

          {/* Right */}

          <button
            onClick={next}
            className="
              p-2 rounded-md
              border border-gray-300
              hover:border-orange-400
              transition-colors
              shrink-0
            "
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
