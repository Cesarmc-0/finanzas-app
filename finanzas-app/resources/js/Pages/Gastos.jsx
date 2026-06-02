import { useState, useEffect } from 'react';
import api from '../services/api';
import { useGastos } from '../hooks/useGastos';
import AppLayout from '../Layouts/AppLayout';
import PageHeader from '../Components/PageHeader';
import EmptyState from '../Components/EmptyState';
import GastoModal from '../Components/GastoModal';
import BackButton from '../Components/BackButton';
import SearchInput from '../Components/SearchInput';

export default function Gastos() {
    const { gastos, loading, error, total, crear, actualizar, eliminar } = useGastos();
    const [categorias, setCategorias] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [gastoSeleccionado, setGastoSeleccionado] = useState(null);
    const [busqueda, setBusqueda] = useState('');

    const gastosFiltrados = gastos.filter(g =>
        g.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
    );

    useEffect(() => {
        api.get('/categorias').then(({ data }) =>
            setCategorias(data.filter(c => c.tipo === 'gasto'))
        );
    }, []);

    const abrirCrear = () => {
        setGastoSeleccionado(null);
        setModalAbierto(true);
    };

    const abrirEditar = (gasto) => {
        setGastoSeleccionado(gasto);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setGastoSeleccionado(null);
    };

    const guardar = async (data) => {
        if (gastoSeleccionado) {
            await actualizar(gastoSeleccionado.id, data);
        } else {
            await crear(data);
        }
        cerrarModal();
    };

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto">

                <BackButton label="Dashboard" />

                <PageHeader
                    titulo="Gastos"
                    subtitulo={`Total: $${total.toFixed(2)}`}
                    botonTexto="+ Nuevo Gasto"
                    onNuevo={abrirCrear}
                />

                <div className="mb-4">
                    <SearchInput value={busqueda} onChange={setBusqueda} placeholder="Buscar gasto..." />
                </div>

                {loading && <p className="text-slate-400 text-sm">Cargando...</p>}
                {error && <p className="text-rose-400 text-sm">{error}</p>}

                {!loading && gastosFiltrados.length === 0 && (
                    <EmptyState
                        titulo="No tienes gastos aún"
                        mensaje="Registra tu primer gasto para empezar a llevar el control."
                    />
                )}

                <div className="flex flex-col gap-3">
                    {gastosFiltrados.map((gasto) => (
                        <div key={gasto.id} className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 flex justify-between items-center">
                            <div>
                                <p className="text-white font-medium">{gasto.descripcion || 'Sin descripción'}</p>
                                <p className="text-slate-400 text-sm">{gasto.fecha}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-rose-400 font-semibold">${Number(gasto.monto).toFixed(2)}</span>
                                <button onClick={() => abrirEditar(gasto)} className="text-slate-400 hover:text-white text-sm">Editar</button>
                                <button onClick={() => eliminar(gasto.id)} className="text-rose-400 hover:text-rose-300 text-sm">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {modalAbierto && (
                <GastoModal
                    gasto={gastoSeleccionado}
                    categorias={categorias}
                    onGuardar={guardar}
                    onCerrar={cerrarModal}
                />
            )}
        </AppLayout>
    );
}
