"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { api } from "@/app/config/api-detail";

interface Props {
  jobId: string | null;
  open: boolean;
  onClose: () => void;
}

export function AtsDrawer({ jobId, open, onClose }: Props) {
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!open || !jobId) return;

    const interval = setInterval(async () => {
      setStatus("uploading");

      const res = await fetch(`${api}/resume/${jobId}`);

      const json = await res.json();

      setStatus(json.status);

      if (json.status === "DONE") {
        setData(json.result);
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [open, jobId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex">
      {/* BACKDROP */}
      {/* <div onClick={onClose} className="absolute inset-0 bg-black/60" /> */}

      {/* DRAWER */}
      <div className="ml-auto w-full sm:w-[600px] h-full bg-white text-black p-6">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">Resume Analysis</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* LOADING */}
        {status !== "DONE" && (
          <div className="mt-10 text-white/70">Analyzing resume...</div>
        )}

        {/* RESULT */}
        {data && (
          <div className="mt-6 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-green-400">
                {data.atsScore}%
              </h1>
              <p className="text-white/60">ATS Score</p>
            </div>

            <div>
              <h3 className="font-semibold">Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {data?.skills?.map((s: string) => (
                  <span
                    key={s}
                    className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-red-400">Missing</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.missing?.map((m: string) => (
                  <span
                    key={m}
                    className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Suggestions</h3>
              <ul className="list-disc ml-5 text-white/70">
                {data?.suggestions?.map((s: string) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
