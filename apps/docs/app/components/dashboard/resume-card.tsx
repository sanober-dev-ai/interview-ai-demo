"use client";

import Link from "next/link";

export function ResumeCard({ resume }: { resume: any }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold group-hover:text-blue-400 transition">
            {resume.name || "Untitled Resume"}
          </h3>

          <p className="text-sm text-white/50 mt-1">
            Uploaded:{" "}
            {resume.createdAt
              ? new Date(resume.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        {/* Example status badge */}
        <span className="text-xs px-2 py-1 rounded-lg bg-green-500/10 text-green-400">
          ATS Ready
        </span>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <Link
          href={`/dashboard/resume/${resume._id}`}
          className="text-sm px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          View Details
        </Link>

        <button className="text-sm px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 transition">
          Analyze
        </button>
      </div>
    </div>
  );
}
