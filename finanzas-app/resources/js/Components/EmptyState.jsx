export default function EmptyState({titulo,mensaje}){
    return(
        <div className = "text-center py-16 text-slate-400">
                <h2 className = "text-white text-lg font-semibold mb-2">{titulo}</h2>
                <p className = "text-slate-400 text-sm">{mensaje}</p>
        </div>
    )
}