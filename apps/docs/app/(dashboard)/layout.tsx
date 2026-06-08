import { Sidebar } from "../components/dashboard/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-2 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
