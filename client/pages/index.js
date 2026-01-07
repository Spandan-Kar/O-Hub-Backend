import { useState } from 'react';
import ScoreGauge from '../components/ScoreGauge';
import RiskRadar from '../components/RiskRadar';
import RunwayCard from '../components/RunwayCard';

export default function NexisDashboard() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://localhost:8000/analyze', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setReport(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-black text-indigo-600 tracking-tight">NEXIS OS</h1>
        <p className="text-slate-500">The Awareness Layer for UPI</p>
      </header>

      {!report ? (
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
          <label className="block text-center cursor-pointer">
            <span className="text-indigo-600 font-bold text-lg">↑ Upload UPI CSV</span>
            <input type="file" className="hidden" onChange={handleUpload} />
          </label>
          {loading && <p className="text-center mt-4 animate-pulse">Analyzing behavior patterns...</p>}
        </div>
      ) : (
        <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* HERO: SCORE */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
            <h3 className="text-slate-400 font-bold text-xs uppercase mb-4">Nexis Behaviour Score</h3>
            <div className={`text-7xl font-black ${report.score > 70 ? 'text-emerald-500' : 'text-amber-500'}`}>
              {report.score}
            </div>
            <p className="mt-4 text-center text-slate-500 text-sm">Discipline-based readiness for future credit.</p>
          </div>

          {/* RISK RADAR */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 md:col-span-2">
            <h3 className="text-slate-400 font-bold text-xs uppercase mb-4 text-left">Risk Radar</h3>
            <div className="space-y-3">
              {report.risks.map((r, i) => (
                <div key={i} className="flex items-start gap-3 bg-red-50 p-4 rounded-xl border border-red-100">
                  <span className="text-red-500">⚠️</span>
                  <p className="text-red-700 text-sm font-medium">{r}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RUNWAY & DBT */}
          <div className="bg-indigo-600 p-8 rounded-3xl shadow-lg text-white">
            <h3 className="text-indigo-200 font-bold text-xs uppercase mb-2">Financial Runway</h3>
            <div className="text-4xl font-bold">{report.runway?.days || 0} Days Left</div>
<p className="text-indigo-100 text-xs mt-2 italic">
  Based on daily burn rate of ₹{report.runway?.daily_burn || 0}
</p>
          </div>

          <div className="bg-emerald-600 p-8 rounded-3xl shadow-lg text-white md:col-span-2">
            <h3 className="text-emerald-200 font-bold text-xs uppercase mb-2">Scholarship / DBT Status</h3>
            <div className="text-xl font-bold">Action: {report.dbt.action_required}</div>
            <div className="mt-4 flex gap-2 overflow-x-auto">
              {report.dbt.eligible_schemes.map((s, i) => (
                <div key={i} className="bg-white/20 p-3 rounded-lg flex-shrink-0">
                  <p className="text-sm font-bold">{s.name}</p>
                  <p className="text-xs opacity-80">{s.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}