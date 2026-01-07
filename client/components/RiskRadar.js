export default function RiskRadar({ risks }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="text-slate-400 text-xs font-bold uppercase mb-4 text-left font-sans">Risk Radar</h3>
      <div className="space-y-3">
        {risks.map((risk, i) => (
          <div key={i} className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-amber-500">⚡</span>
            <p className="text-slate-700 text-sm">{risk}</p>
          </div>
        ))}
      </div>
    </div>
  );
}