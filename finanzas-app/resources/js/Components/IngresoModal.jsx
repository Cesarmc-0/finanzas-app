import { useState } from "react";
export default function IngresoModal({ingreso, categorias, onGuardar, onCerrar}){
    const [form, setForm] = useState(ingreso?{monto: ingreso.monto, descripcion:ingreso.descripcion,fecha: ingreso.fecha, categoria_id : ingreso.categoria_id} : {monto: '', descripcion: '', fecha: '', categoria_id: '' })
    return(
    <div className = " fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">   
        <div className = "bg-slate-800 rounded-2xl p-6 w-full max-w-md">    
            <div className="flex justify-between it ems-center mb-6">
                <h2 className="text-white text-lg font-semibold">{ingreso ? 'Editar Ingreso' : 'Nuevo Ingreso'}</h2>
                <button onClick={onCerrar} className="text-slate-400 hover:text-white text-xl">✕</button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); onGuardar(form); }} className="flex flex-col gap-4">

                <div className="flex flex-col gap-1">
                    <label className="text-slate-400 text-sm">Monto</label>
                    <input
                        type="number"
                        value={form.monto}
                        onChange={(e) => setForm({ ...form, monto: e.target.value })}
                        className="bg-slate-900 border border-slate-600 focus:border-indigo-500 text-white rounded-lg px-3 py-2 outline-none"
                        placeholder="0.00"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-slate-400 text-sm">Descripción</label>
                    <input
                        type="text"
                        value={form.descripcion}
                        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                        className="bg-slate-900 border border-slate-600 focus:border-indigo-500 text-white rounded-lg px-3 py-2 outline-none"
                        placeholder="Ej. Salario mensual"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-slate-400 text-sm">Fecha</label>
                    <input
                        type="date"
                        value={form.fecha}
                        onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                        className="bg-slate-900 border border-slate-600 focus:border-indigo-500 text-white rounded-lg px-3 py-2 outline-none"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-slate-400 text-sm">Categoría</label>
                    <select
                        value={form.categoria_id}
                        onChange={(e) => setForm({ ...form, categoria_id: e.target.value })}
                        className="bg-slate-900 border border-slate-600 focus:border-indigo-500 text-white rounded-lg px-3 py-2 outline-none"
                        required
                    >
                        <option value="">Selecciona una categoría</option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-3 mt-2">
                    <button
                        type="button"
                        onClick={onCerrar}
                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg py-2 text-sm font-medium"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg py-2 text-sm font-medium"
                    >
                        {ingreso ? 'Guardar cambios' : 'Crear ingreso'}
                    </button>
                </div>

            </form>
      </div> 
    </div> 
    )
}