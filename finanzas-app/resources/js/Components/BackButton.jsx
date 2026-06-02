import { useNavigate } from 'react-router-dom';

export default function BackButton({ label = 'Regresar' }) {
    const navigate = useNavigate();

    return (
        <div className="mb-6">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
            >
                <span>←</span>
                <span>{label}</span>
            </button>
        </div>
    );
}
