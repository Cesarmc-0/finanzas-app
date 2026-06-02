import AppLayout from '../Layouts/AppLayout';
import StatCard from '../Components/StatCard';
import { useDashboard } from '../hooks/useDashboard';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#4f46e5', '#f43f5e', '#f59e0b', '#06b6d4', '#8b5cf6', '#10b981'];

const fmt = (n) => `$${Number(n).toLocaleString('es-CO', { minimumFractionDigits: 0 })}`;

export default function Dashboard() {
    const { datos, loading } = useDashboard();

    const totalIngresos = parseFloat(datos?.totales?.ingresos ?? 0);
    const totalGastos   = parseFloat(datos?.totales?.gastos ?? 0);
    const balance       = totalIngresos - totalGastos;
    const ahorro        = totalIngresos > 0 ? Math.round((balance / totalIngresos) * 100) : 0;
    const positivo      = balance >= 0;

    const barData = (datos?.por_mes?.ingresos ?? []).map(i => {
        const g = datos.por_mes.gastos.find(g => g.mes === i.mes);
        return { mes: i.mes, ingresos: parseFloat(i.total), gastos: parseFloat(g?.total ?? 0) };
    });

    const pieData = (datos?.por_categoria ?? []).map(c => ({
        name: c.categoria?.nombre ?? 'Sin categoría',
        value: parseFloat(c.total),
    }));

    return (
        <AppLayout>

            {/* Hero — balance */}
            <div className="mb-10">
                <p className="text-slate-400 text-sm mb-2">Balance actual · Mayo 2026</p>
                <div className="flex items-end gap-4">
                    <h1 className="text-6xl font-bold text-white tracking-tight">{fmt(balance)}</h1>
                    <span className={`mb-2 text-sm font-medium px-2.5 py-1 rounded-lg ${
                        positivo
                            ? 'bg-indigo-500/10 text-indigo-400'
                            : 'bg-rose-500/10 text-rose-400'
                    }`}>
                        {positivo ? '↑' : '↓'} {ahorro}% de ahorro
                    </span>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="flex gap-4 mb-10">
                <StatCard label="Ingresos del mes" value={fmt(totalIngresos)} sub="Total recibido"  accent="indigo" />
                <StatCard label="Gastos del mes"   value={fmt(totalGastos)}   sub="Total gastado"   accent="rose"   />
                <StatCard label="Tasa de ahorro"   value={`${ahorro}%`}       sub="Meta: 70%"       accent="slate"  />
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-5 gap-6">

                {/* Barras — más ancho */}
                <div className="col-span-3 bg-slate-800 border border-slate-700 rounded-2xl p-6">
                    <p className="text-slate-300 text-sm font-medium mb-6">Ingresos vs Gastos por mes</p>
                    {barData.length === 0 ? (
                        <p className="text-slate-500 text-sm text-center py-16">Sin datos aún</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={barData} barGap={4}>
                                <XAxis dataKey="mes" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#f1f5f9' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                                    formatter={(v) => fmt(v)}
                                />
                                <Bar dataKey="ingresos" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                                <Bar dataKey="gastos"   fill="#f43f5e" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Pastel — gastos por categoría */}
                <div className="col-span-2 bg-slate-800 border border-slate-700 rounded-2xl p-6">
                    <p className="text-slate-300 text-sm font-medium mb-6">Gastos por categoría</p>
                    {pieData.length === 0 ? (
                        <p className="text-slate-500 text-sm text-center py-16">Sin datos aún</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={55}
                                    outerRadius={80}
                                    paddingAngle={4}
                                    dataKey="value"
                                >
                                    {pieData.map((_, i) => (
                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend
                                    iconType="circle"
                                    iconSize={8}
                                    formatter={(v) => <span style={{ color: '#94a3b8', fontSize: 11 }}>{v}</span>}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#f1f5f9' }}
                                    formatter={(v) => fmt(v)}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
