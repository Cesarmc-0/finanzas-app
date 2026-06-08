import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function verifyCode (){
    const navigate = useNavigate();
    const {verify, pendingEmail } = useAuth();
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await verify(code);
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message ?? 'Error al conectar con el servidor');
        }finally { setLoading(false); }
    };

    return(
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-8">
          <div className="w-full max-w-sm">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
                  <h1 className="text-xl font-bold text-white mb-1">Verifica tu identidad</h1>
                  <p className="text-slate-400 text-sm mb-7">
                      Ingresa el código de 6 dígitos enviado a{' '}
                      <span className="text-indigo-400">{pendingEmail}</span>
                  </p>

                  {error && (
                      <div className="mb-5 text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-4 py-3">
                          {error}
                      </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-slate-300 mb-1.5">Código</label>
                          <input
                              type="text"
                              maxLength={6}
                              value={code}
                              onChange={(e) => setCode(e.target.value)}
                              placeholder="000000"
                              className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition tracking-widest text-center"
                          />
                      </div>

                      <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl py-2.5 text-sm font-semibold transition mt-2"
                      >
                          {loading ? 'Verificando...' : 'Verificar →'}
                      </button>
                  </form>
              </div>

              <p className="text-center text-sm text-slate-500 mt-5">
                  ¿Código incorrecto?{' '}
                  <Link to="/login" className="text-indigo-400 font-medium hover:underline">Volver al login</Link>
              </p>
          </div>
      </div>

    );
}