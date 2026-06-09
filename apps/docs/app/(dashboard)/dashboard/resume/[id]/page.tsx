"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/app/config/api-detail";

export default function ResumeDetail() {
  const { id } = useParams();

  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await fetch(`${api}/resume/${id}`);
        const data = await res.json();
        console.log(data, 8);
        setResume(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading Resume...
      </div>
    );
  }

  const result = resume?.result || {};

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Resume ATS Report</h1>
          <p className="text-white/60 mt-2">
            Detailed analysis of your uploaded resume
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* ATS Score */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold mb-4">ATS Score</h2>

              <div className="flex items-center gap-4">
                <div className="text-5xl font-bold text-green-400">
                  {result.atsScore || 0}%
                </div>

                <div>
                  <p className="text-white/60">Resume Match Score</p>

                  <p className="text-sm text-white/40 mt-1">Higher is better</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-6">
              <h2 className="text-lg font-semibold text-green-400 mb-4">
                Skills Found
              </h2>

              <div className="flex flex-wrap gap-2">
                {result.skills?.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6">
              <h2 className="text-lg font-semibold text-red-400 mb-4">
                Missing Keywords
              </h2>

              <div className="flex flex-wrap gap-2">
                {result.missing?.map((item: string) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="rounded-3xl border border-blue-500/20 bg-blue-500/10 p-6">
              <h2 className="text-lg font-semibold text-blue-400 mb-4">
                Suggestions
              </h2>

              <ul className="space-y-3 text-white/80">
                {result.suggestions?.map((item: string) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE PDF */}
          <div>
            <div className="rounded-3xl border border-white/10 overflow-hidden bg-white">
              {result?.filePath ? (
                <iframe
                  src={`${api.replace("/api", "")}/${result.filePath}`}
                  className="w-full h-[900px]"
                  title="Resume Preview"
                />
              ) : (
                <div className="p-10 text-center text-black">
                  PDF preview unavailable
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
