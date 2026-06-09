import { useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatCard from '@/Components/StatCard';
import { useAdmin } from '@/hooks/useAdmin';

const AdminDashboard = () => {
    const { estadisticas, cargarEstadisticas, loading } = useAdmin();

    useEffect(() => {
        cargarEstadisticas();
    }, []);

    return (
        <AdminLayout>
            <h2 className="text-white font-bold text-xl mb-6">Resumen general</h2>

            {loading ? (
                <p className="text-slate-400 text-sm">Cargando...</p>
            ) : (
                <div className="flex gap-4">
                    <StatCard label="Total usuarios" value={estadisticas.total ?? 0} accent="indigo" />
                    <StatCard label="Activos" value={estadisticas.activos ?? 0} accent="indigo" />
                    <StatCard label="Inactivos" value={estadisticas.inactivos ?? 0} accent="rose" />
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminDashboard;
