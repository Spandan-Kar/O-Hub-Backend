export default function ScoreGauge({ score }) {
  const getColor = (s) => s > 75 ? 'text-emerald-500' : s > 50 ? 'text-amber-500' : 'text-red-500';
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className={`text-6xl font-black ${getColor(score)}`}>{score}</div>
      <p className="text-slate-400 text-xs font-bold uppercase mt-2">Nexis Score</p>
      <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
        <div className={`h-2 rounded-full transition-all duration-1000 ${score > 75 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${score}%` }}></div>
      </div>
    </div>
  );
}