import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PasswordInput from '../Components/PasswordInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../utils/schemas';

export default function Register() {
    const { register : registerUser } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema)
    });
    const password = watch('password') ?? '';
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const requisitos = [
        { label: 'Mínimo 8 caracteres', ok: password.length >= 8 },
        { label: 'Una mayúscula', ok: /[A-Z]/.test(password) },
        { label: 'Una minúscula', ok: /[a-z]/.test(password) },
        { label: 'Un carácter especial', ok: /[^a-zA-Z0-9]/.test(password) },
    ];

    const onSubmit = async (data) => {
        setError('');
        setLoading(true);
        try {
            await registerUser(data.name, data.email, data.password, data.password_confirmation);
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
                        Empieza hoy.<br />
                        <span className="text-indigo-400">Tu futuro</span><br />
                        te lo agradecerá.
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                        Crea tu cuenta y empieza a registrar tus finanzas en menos de un minuto.
                    </p>
                </div>

                <p className="text-slate-700 text-xs">© 2025 Mi Finanzas</p>
            </div>

            {/* Panel derecho */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-8">
                <div className="w-full max-w-sm">

                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                        <h1 className="text-xl font-bold text-white mb-1">Crear cuenta</h1>
                        <p className="text-slate-400 text-sm mb-5">Completa los datos para comenzar.</p>

                        {error && (
                            <div className="mb-5 text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-4 py-3">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Nombre</label>
                                    <input type="text" placeholder="Tu nombre" {...register('name')}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
                                    {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                                    <input type="email" placeholder="tu@email.com" {...register('email')}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
                                    {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email.message}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Contraseña</label>
                                <PasswordInput {...register('password')} />
                                <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-0.5">
                                    {requisitos.map((r) => (
                                        <span key={r.label} className={`text-xs flex items-center gap-1 ${r.ok ? 'text-emerald-400' : 'text-slate-500'}`}>
                                            {r.ok ? '✓' : '✗'} {r.label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Confirmar contraseña</label>
                                <PasswordInput {...register('password_confirmation')} />
                                {errors.password_confirmation && <p className="text-rose-400 text-xs mt-1">{errors.password_confirmation.message}</p>}
                            </div>

                            <button type="submit" disabled={loading}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl py-2.5 text-sm font-semibold transition mt-2">
                                {loading ? 'Creando cuenta...' : 'Crear cuenta →'}
                            </button>
                        </form>
                    </div>

                    <p className="text-center text-sm text-slate-500 mt-5">
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" className="text-indigo-400 font-medium hover:underline">Inicia sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
