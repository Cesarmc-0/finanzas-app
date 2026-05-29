import { useAuth } from '../context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';

const NavItem = ({ to, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-sm font-medium transition ${
                isActive
                    ? 'bg-indigo-500/10 text-indigo-400'
                    : 'text-slate-400 hover:text-white'
            }`
        }
    >
        {label}
    </NavLink>
);

const greeting = () => {
    const h = new Date().getHours();
    if (h >= 6  && h < 12) return 'Buenos días';
    if (h >= 12 && h < 18) return 'Buenas tardes';
    return 'Buenas noches';
};

export default function AppLayout({ children }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-900">

            {/* Navbar */}
            <header className="bg-slate-950 border-b border-slate-700/50 shadow-[0_1px_12px_rgba(0,0,0,0.4)]">
                <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-8">

                    <span className="text-white font-bold text-sm tracking-tight shrink-0">Mi Finanzas</span>

                    <nav className="flex items-center gap-1 flex-1 justify-center">
                        <NavItem to="/dashboard"  label="Dashboard" />
                        <NavItem to="/ingresos"   label="Ingresos" />
                        <NavItem to="/gastos"     label="Gastos" />
                        <NavItem to="/categorias" label="Categorías" />
                    </nav>

                    <div className="flex items-center gap-6 shrink-0">
                        <p className="text-slate-200 text-sm font-semibold tracking-tight">{greeting()}, {user?.name}</p>
                        <button onClick={handleLogout} className="text-sm text-slate-500 hover:text-rose-400 transition">
                            Salir
                        </button>
                    </div>
                </div>
            </header>

            {/* Contenido */}
            <main className="max-w-6xl mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
