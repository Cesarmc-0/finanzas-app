import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white">

            {/* Navbar */}
            <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xl">💰</span>
                    <span className="font-bold text-white">Mi Finanzas</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-400">{user?.name}</span>
                    <button
                        onClick={handleLogout}
                        className="text-sm text-slate-400 hover:text-white transition"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </nav>

            {/* Contenido */}
            <main className="max-w-5xl mx-auto px-6 py-10">
                <h2 className="text-2xl font-bold mb-2">Bienvenido, {user?.name} 👋</h2>
                <p className="text-slate-400">Tu resumen financiero aparecerá aquí.</p>
            </main>
        </div>
    );
}
