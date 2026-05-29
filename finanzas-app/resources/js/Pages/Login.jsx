import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PasswordInput from '../Components/PasswordInput';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(form.email, form.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message ?? 'Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex">

            {/* Panel izquierdo */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-14">
                <span className="text-white font-bold text-xl tracking-tight">Mi Finanzas</span>

                <div>
                    <h2 className="text-5xl font-bold text-white leading-tight mb-5">
                        Cada peso<br />
                        <span className="text-indigo-400">cuenta.</span>
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                        Saber a dónde va tu dinero es el primer paso para decidir a dónde quieres que vaya.
                    </p>

                    <div className="mt-12 flex gap-4">
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex-1">
                            <p className="text-slate-400 text-xs mb-2">Ingresos del mes</p>
                            <p className="text-indigo-400 text-2xl font-bold">+$2.400</p>
                            <p className="text-slate-500 text-xs mt-1">↑ 12% vs anterior</p>
                        </div>
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex-1">
                            <p className="text-slate-400 text-xs mb-2">Ahorro</p>
                            <p className="text-white text-2xl font-bold">68%</p>
                            <p className="text-slate-500 text-xs mt-1">Meta: 70%</p>
                        </div>
                    </div>
                </div>

                <p className="text-slate-700 text-xs">© 2025 Mi Finanzas</p>
            </div>

            {/* Panel derecho */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-8">
                <div className="w-full max-w-sm">

                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
                        <h1 className="text-xl font-bold text-white mb-1">Hola, de nuevo.</h1>
                        <p className="text-slate-400 text-sm mb-7">Ingresa tus datos para continuar.</p>

                        {error && (
                            <div className="mb-5 text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-4 py-3">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="tu@email.com"
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Contraseña</label>
                                <PasswordInput name="password" value={form.password} onChange={handleChange} />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl py-2.5 text-sm font-semibold transition mt-2"
                            >
                                {loading ? 'Ingresando...' : 'Ingresar →'}
                            </button>
                        </form>
                    </div>

                    <p className="text-center text-sm text-slate-500 mt-5">
                        ¿No tienes cuenta?{' '}
                        <Link to="/register" className="text-indigo-400 font-medium hover:underline">Regístrate</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
