import { useEffect, useState } from 'react';
import AppLayout from '../Layouts/AppLayout';
import StatCard from '../Components/StatCard';
import api from '../services/api';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#4f46e5', '#f43f5e', '#f59e0b', '#06b6d4', '#8b5cf6', '#10b981'];

const fmt = (n) => `$${Number(n).toLocaleString('es-CO', { minimumFractionDigits: 2 })}`;

const mesCorto = (fecha) =>
    new Date(fecha).toLocaleDateString('es-CO', { month: 'short' });

export default function Dashboard() {
    const [ingresos,   setIngresos]   = useState([]);
    const [gastos,     setGastos]     = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        api.get('/ingresos').then(r => setIngresos(r.data));
        api.get('/gastos').then(r => setGastos(r.data));
        api.get('/categorias').then(r => setCategorias(r.data));
    }, []);

    const totalIngresos = ingresos.reduce((s, i) => s + parseFloat(i.monto), 0);
    const totalGastos   = gastos.reduce((s, g) => s + parseFloat(g.monto), 0);
    const balance       = totalIngresos - totalGastos;
    const ahorro        = totalIngresos > 0 ? Math.round((balance / totalIngresos) * 100) : 0;
    const positivo      = balance >= 0;

    // Bar chart — agrupar por mes
    const mesesMap = {};
    ingresos.forEach(i => {
        const m = mesCorto(i.fecha);
        if (!mesesMap[m]) mesesMap[m] = { mes: m, ingresos: 0, gastos: 0 };
        mesesMap[m].ingresos += parseFloat(i.monto);
    });
    gastos.forEach(g => {
        const m = mesCorto(g.fecha);
        if (!mesesMap[m]) mesesMap[m] = { mes: m, ingresos: 0, gastos: 0 };
        mesesMap[m].gastos += parseFloat(g.monto);
    });
    const barData = Object.values(mesesMap);

    // Pie chart — gastos por categoría
    const gastosMap = {};
    gastos.forEach(g => {
        const cat = categorias.find(c => c.id === g.categoria_id);
        const nombre = cat?.nombre ?? 'Sin categoría';
        gastosMap[nombre] = (gastosMap[nombre] || 0) + parseFloat(g.monto);
    });
    const pieData = Object.entries(gastosMap).map(([name, value]) => ({ name, value }));

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
