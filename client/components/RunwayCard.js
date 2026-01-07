export default function RunwayCard({ runway }) {
  return (
    <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg text-white">
      <h3 className="text-indigo-200 text-xs font-bold uppercase mb-2">Financial Runway</h3>
      <div className="text-4xl font-bold">{runway.days} Days</div>
      <p className="text-indigo-100 text-xs mt-1">Avg. Spend: ₹{runway.daily_burn}/day</p>
    </div>
  );
}