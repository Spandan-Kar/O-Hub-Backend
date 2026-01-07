import React from 'react';

export default function DBTReadiness({ dbtData }) {
  if (!dbtData) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mt-6">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Scholarship & DBT Readiness</h2>
      <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl mb-6">
        <div className="bg-emerald-500 text-white p-2 rounded-full text-xs font-bold">✓</div>
        <div>
          <p className="text-sm font-bold text-emerald-800">Action Required</p>
          <p className="text-xs text-emerald-700">{dbtData.action_required}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dbtData.eligible_schemes.map((scheme, idx) => (
          <div key={idx} className="border border-slate-200 p-4 rounded-xl hover:border-indigo-300 transition-colors">
            <h4 className="font-bold text-indigo-600">{scheme.name}</h4>
            <p className="text-xs text-slate-500">{scheme.criteria}</p>
            <div className="mt-2 text-sm font-semibold text-slate-700">{scheme.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}