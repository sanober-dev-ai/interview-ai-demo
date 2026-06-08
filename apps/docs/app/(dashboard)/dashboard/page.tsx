"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/app/config/api-detail";

/* ---------------- KPI CARD ---------------- */
const StatCard = ({
  title,
  value,
  sub,
}: {
  title: string;
  value: string | number;
  sub?: string;
}) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
      <p className="text-sm text-white/50">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
      {sub && <p className="text-xs text-white/40 mt-1">{sub}</p>}
    </div>
  );
};

export default function Dashboard() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const userId =
          localStorage.getItem("userId") || "m6a22a0a9b71e857c90b86143";

        const res = await fetch(`${api}/auth/${userId}`);

        const data = await res.json();

        setResumes(data || []);
      } catch (err) {
        console.error("Error fetching resumes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ---------------- ANALYTICS ---------------- */
  const totalResumes = resumes.length;

  const highestATS = resumes.reduce((max, r) => {
    return r.atsScore > max ? r.atsScore : max;
  }, 0);

  const avgATS =
    resumes.reduce((sum, r) => sum + (r.atsScore || 0), 0) /
    (resumes.length || 1);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 lg:p-8 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <button></button>
        <p className="text-white/50 text-sm mt-1">
          Overview of your resume analytics and performance
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Resumes"
          value={totalResumes}
          sub="All uploaded resumes"
        />
        <StatCard
          title="Highest ATS Score"
          value={`${highestATS}%`}
          sub="Best performing resume"
        />
        <StatCard
          title="Average ATS Score"
          value={`${avgATS.toFixed(1)}%`}
          sub="Overall resume quality"
        />
      </div>

      {/* INSIGHTS */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-lg font-semibold mb-4">Quick Insights</h2>

        <div className="space-y-2 text-sm text-white/70">
          <p>
            • You have uploaded{" "}
            <span className="text-white font-medium">{totalResumes}</span>{" "}
            resumes so far.
          </p>

          <p>
            • Your best ATS score is{" "}
            <span className="text-green-400 font-medium">{highestATS}%</span>.
          </p>

          <p>
            • Your average resume quality is{" "}
            <span className="text-blue-400 font-medium">
              {avgATS.toFixed(1)}%
            </span>
            .
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-white/10 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-4 p-4 text-sm text-white/50 border-b border-white/10">
          <span>Resume</span>
          <span>ATS Score</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {/* Table Body */}
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-10 bg-white/5 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : resumes.length === 0 ? (
          <div className="p-10 text-center text-white/50">
            No resumes uploaded yet
          </div>
        ) : (
          resumes.map((r) => (
            <div
              key={r._id}
              className="grid grid-cols-4 p-4 text-sm border-b border-white/5 hover:bg-white/5 transition"
            >
              <span className="truncate">
                {r.filePath?.split("/").pop() || "Resume"}
              </span>

              <span className="text-green-400 font-medium">
                {r.atsScore || 0}%
              </span>

              <span className="text-yellow-400">{r.status || "processed"}</span>

              <Link
                href={`/dashboard/resume/${r._id}`}
                className="text-blue-400 hover:underline"
              >
                View
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
