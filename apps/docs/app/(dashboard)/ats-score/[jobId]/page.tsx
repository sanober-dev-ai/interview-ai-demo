"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/app/config/api-detail";

export default function ATSScore() {
  const params = useParams();
  console.log(params, 9);
  const jobId = params.jobId as string;

  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState("loading");
  console.log("Job ID:", jobId);
  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${api}/resume/${jobId}`);

        const json = await res.json();

        setStatus(json.status);

        if (json.status === "DONE") {
          setData(json.result);
          clearInterval(interval);
        }
      } catch (err) {
        console.error(err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [jobId]);

  if (!data) {
    return <div className="p-10 text-white">Analyzing Resume...</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-4xl font-bold text-green-400">{data.atsScore}%</h1>

      <p className="mt-2 text-gray-400">ATS Score</p>

      <div className="mt-8">
        <h2 className="font-semibold text-xl">Skills</h2>

        <div className="flex flex-wrap gap-2 mt-3">
          {data.skills?.map((skill: string) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full bg-green-500/20 text-green-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-semibold text-xl text-red-400">Missing Keywords</h2>

        <div className="flex flex-wrap gap-2 mt-3">
          {data.missing?.map((item: string) => (
            <span
              key={item}
              className="px-3 py-1 rounded-full bg-red-500/20 text-red-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-semibold text-xl">Suggestions</h2>

        <ul className="list-disc pl-6 mt-3">
          {data.suggestions?.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
