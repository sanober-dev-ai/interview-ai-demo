export function StatCard({ title, value, sub }: any) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
      <p className="text-sm text-white/50">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
      {sub && <p className="text-xs text-white/40 mt-1">{sub}</p>}
    </div>
  );
}
