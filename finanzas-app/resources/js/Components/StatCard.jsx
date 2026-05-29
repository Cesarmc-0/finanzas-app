export default function StatCard({ label, value, sub, accent = 'indigo' }) {
    const colors = {
        indigo: 'text-indigo-400',
        rose:    'text-rose-400',
        slate:   'text-slate-100',
    };

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex-1">
            <p className="text-slate-400 text-xs mb-2">{label}</p>
            <p className={`text-2xl font-bold ${colors[accent]}`}>{value}</p>
            {sub && <p className="text-slate-500 text-xs mt-1">{sub}</p>}
        </div>
    );
}
