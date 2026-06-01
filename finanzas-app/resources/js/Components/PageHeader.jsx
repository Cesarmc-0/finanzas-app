export default function PageHeader ({titulo, subtitulo, botonTexto, onNuevo}) {
    return(
        <div className = "flex items-center justify-between mb-8">
            <div>
                <h1 className = "text-white text-2xl font-bold ">{titulo}</h1>
                <p className = "text-slate-400 text-sm mt-1 ">{subtitulo}</p>
            </div>
            <button
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-xl"
                onClick={onNuevo}
            >
                {botonTexto}
            </button>
        </div>
    )
}