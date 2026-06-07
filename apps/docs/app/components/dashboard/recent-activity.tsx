import { Card } from "@/components/ui/card";

const activities = [
  "Resume uploaded",
  "ATS analysis completed",
  "Interview started",
  "Interview feedback generated",
];

export function RecentActivity() {
  return (
    <Card className="rounded-3xl p-6">
      <h2 className="mb-6 text-xl font-semibold">Recent Activity</h2>

      <div className="space-y-4">
        {activities.map((item) => (
          <div key={item} className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-green-500" />

            <span>{item}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
