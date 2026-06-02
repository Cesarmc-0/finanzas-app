import { createPortal } from 'react-dom';

const icons = {
    exito: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    ),
    error: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    ),
};

const estilos = {
    exito: {
        icono: 'bg-emerald-500/20 text-emerald-400',
        barra: 'bg-emerald-400',
    },
    error: {
        icono: 'bg-rose-500/20 text-rose-400',
        barra: 'bg-rose-400',
    },
};

export default function Toast({ toast }) {
    if (!toast) return null;

    const estilo = estilos[toast.tipo] ?? estilos.exito;

    return createPortal(
        <div
            key={toast.id}
            className="fixed bottom-6 right-6 z-50 flex flex-col gap-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] min-w-[260px] max-w-xs animate-slide-up"
        >
            <div className="flex items-center gap-3 px-4 py-3.5">
                <span className={`flex items-center justify-center w-7 h-7 rounded-full shrink-0 ${estilo.icono}`}>
                    {icons[toast.tipo]}
                </span>
                <p className="text-white text-sm font-medium leading-snug">{toast.mensaje}</p>
            </div>
            <div className="h-[2px] w-full bg-white/5">
                <div
                    className={`h-full ${estilo.barra} animate-progress`}
                />
            </div>

            <style>{`
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes progress {
                    from { width: 100%; }
                    to   { width: 0%; }
                }
                .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
                .animate-progress { animation: progress 3s linear forwards; }
            `}</style>
        </div>,
        document.body
    );
}
