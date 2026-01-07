// This is a helper component for the drag-and-drop feel
export default function UploadArea({ onUpload, loading }) {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-3xl p-12 bg-white">
      <div className="text-4xl mb-4 text-indigo-500">📄</div>
      <h3 className="text-lg font-bold text-slate-700">Drop your UPI CSV here</h3>
      <p className="text-sm text-slate-400 mb-6">Nexis processes your data locally & securely</p>
      <input 
        type="file" 
        accept=".csv" 
        onChange={onUpload} 
        disabled={loading}
        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
      />
    </div>
  );
}