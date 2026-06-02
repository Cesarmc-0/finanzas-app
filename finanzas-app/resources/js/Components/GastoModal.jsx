import { useState } from 'react';

export default function GastoModal({ gasto, categorias, onGuardar, onCerrar }) {
    const [form, setForm] = useState(
        gasto
            ? { monto: gasto.monto, descripcion: gasto.descripcion, fecha: gasto.fecha, categoria_id: gasto.categoria_id }
            : { monto: '', descripcion: '', fecha: '', categoria_id: '' }
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-lg font-semibold">{gasto ? 'Editar Gasto' : 'Nuevo Gasto'}</h2>
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
                            placeholder="Ej. Pago de servicios"
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
                            className="flex-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg py-2 text-sm font-medium"
                        >
                            {gasto ? 'Guardar cambios' : 'Crear gasto'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
