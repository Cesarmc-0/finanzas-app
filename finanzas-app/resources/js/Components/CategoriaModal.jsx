import { useState } from 'react';

export default function CategoriaModal({ categoria, onGuardar, onCerrar }) {
    const [form, setForm] = useState(
        categoria
            ? { nombre: categoria.nombre, tipo: categoria.tipo, color: categoria.color ?? '#6366f1' }
            : { nombre: '', tipo: 'gasto', color: '#6366f1' }
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-lg font-semibold">
                        {categoria ? 'Editar Categoría' : 'Nueva Categoría'}
                    </h2>
                    <button onClick={onCerrar} className="text-slate-400 hover:text-white text-xl">✕</button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); onGuardar(form); }} className="flex flex-col gap-4">

                    <div className="flex flex-col gap-1">
                        <label className="text-slate-400 text-sm">Nombre</label>
                        <input
                            type="text"
                            value={form.nombre}
                            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                            className="bg-slate-900 border border-slate-600 focus:border-indigo-500 text-white rounded-lg px-3 py-2 outline-none"
                            placeholder="Ej. Salario, Alquiler"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-slate-400 text-sm">Tipo</label>
                        <select
                            value={form.tipo}
                            onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                            className="bg-slate-900 border border-slate-600 focus:border-indigo-500 text-white rounded-lg px-3 py-2 outline-none"
                            required
                        >
                            <option value="gasto">Gasto</option>
                            <option value="ingreso">Ingreso</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-slate-400 text-sm">Color</label>
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={form.color}
                                onChange={(e) => setForm({ ...form, color: e.target.value })}
                                className="w-10 h-10 rounded-lg border border-slate-600 bg-slate-900 cursor-pointer"
                            />
                            <span className="text-slate-400 text-sm">{form.color}</span>
                        </div>
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
                            {categoria ? 'Guardar cambios' : 'Crear categoría'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
