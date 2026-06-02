import { createPortal } from 'react-dom';

export default function ConfirmModal({ mensaje, onConfirmar, onCancelar }) {
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancelar} />

            <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-slide-up">

                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 mx-auto mb-4">
                    <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                </div>

                <h3 className="text-white text-base font-semibold text-center mb-1">¿Eliminar registro?</h3>
                <p className="text-slate-400 text-sm text-center mb-6">{mensaje}</p>

                <div className="flex gap-3">
                    <button
                        onClick={onCancelar}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl py-2.5 text-sm font-medium transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirmar}
                        className="flex-1 bg-rose-600 hover:bg-rose-500 text-white rounded-xl py-2.5 text-sm font-medium transition"
                    >
                        Sí, eliminar
                    </button>
                </div>

            </div>

            <style>{`
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up { animation: slide-up 0.25s ease-out forwards; }
            `}</style>
        </div>,
        document.body
    );
}
