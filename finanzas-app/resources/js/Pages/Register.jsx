import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PasswordInput from '../Components/PasswordInput';

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(form.name, form.email, form.password, form.password_confirmation);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message ?? 'Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">

            {/* Panel izquierdo */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 flex-col justify-between p-12">
                <span className="text-white font-bold text-xl tracking-tight">Mi Finanzas</span>
                <div>
                    <h2 className="text-4xl font-bold text-white leading-snug mb-4">
                        Empieza hoy.<br />
                        <span className="text-emerald-400">Tu futuro</span><br />
                        te lo agradecerá.
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                        Crea tu cuenta y empieza a registrar tus finanzas en menos de un minuto.
                    </p>
                </div>
                <p className="text-slate-600 text-xs">© 2025 Mi Finanzas</p>
            </div>

            {/* Panel derecho */}
            <div className="w-full lg:w-1/2 bg-slate-50 flex items-center justify-center px-8">
                <div className="w-full max-w-sm">

                    <h1 className="text-2xl font-bold text-slate-800 mb-1">Crear cuenta</h1>
                    <p className="text-slate-500 text-sm mb-8">Completa los datos para comenzar.</p>

                    {error && (
                        <div className="mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre</label>
                            <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Tu nombre" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="tu@email.com" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Contraseña</label>
                            <PasswordInput name="password" value={form.password} onChange={handleChange} placeholder="Mínimo 8 caracteres" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirmar contraseña</label>
                            <PasswordInput name="password_confirmation" value={form.password_confirmation} onChange={handleChange} />
                        </div>

                        <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl py-3 text-sm font-semibold transition">
                            {loading ? 'Creando cuenta...' : 'Crear cuenta →'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-6">
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" className="text-emerald-600 font-medium hover:underline">Inicia sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
