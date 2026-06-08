import { FileText, Trophy, Brain, TrendingUp } from "lucide-react";

import { StatCard } from "./stat-card";

export function StatsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-4">
      <StatCard icon={<FileText />} value="12" title="Resumes" />

      <StatCard icon={<Trophy />} value="82" title="Average ATS" />

      <StatCard icon={<Brain />} value="8" title="Interviews" />

      <StatCard icon={<TrendingUp />} value="91%" title="Success Rate" />
    </div>
  );
}
