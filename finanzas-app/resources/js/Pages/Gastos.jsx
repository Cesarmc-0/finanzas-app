import { useState, useEffect } from 'react';
import api from '../services/api';
import { useGastos } from '../hooks/useGastos';
import AppLayout from '../Layouts/AppLayout';
import PageHeader from '../Components/PageHeader';
import EmptyState from '../Components/EmptyState';
import GastoModal from '../Components/GastoModal';
import BackButton from '../Components/BackButton';
import SearchInput from '../Components/SearchInput';
import ConfirmModal from '../Components/ConfirmModal';
import { useToast } from '../hooks/useToast';
import Toast from '../Components/Toast';
import { formatMonto } from '../utils/format';
import { usePaginacion } from '../hooks/usePaginacion';

export default function Gastos() {
    const { gastos, loading, error, total, crear, actualizar, eliminar } = useGastos();
    const [categorias, setCategorias] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [gastoSeleccionado, setGastoSeleccionado] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const {toast, mostrar} = useToast();
    const [idAEliminar, setIdAEliminar] = useState(null);
    const gastosFiltrados = gastos.filter(g =>
        g.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
    );

    const { itemsPagina, pagina, totalPaginas, siguiente, anterior } = usePaginacion(gastosFiltrados);

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

    const handleEliminar = async () => {
        await eliminar(idAEliminar);
        setIdAEliminar(null);
        mostrar('Gasto eliminado', 'exito');
    };

    const guardar = async (data) => {
        if (gastoSeleccionado) {
            await actualizar(gastoSeleccionado.id, data);
            mostrar('Gasto actualizado', 'exito');
        } else {
            await crear(data);
            mostrar('Gasto creado', 'exito');
        }
        cerrarModal();
    };

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto">

                <BackButton label="Dashboard" />

                <PageHeader
                    titulo="Gastos"
                    subtitulo={`Total: $${formatMonto(total)}`}
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
                    {itemsPagina.map((gasto) => (
                        <div key={gasto.id} className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 flex justify-between items-center">
                            <div>
                                <p className="text-white font-medium">{gasto.descripcion || 'Sin descripción'}</p>
                                <p className="text-slate-400 text-sm">{gasto.fecha}</p>
                                <p className="text-rose-300 text-xs">{gasto.categoria?.nombre}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-rose-400 font-semibold">${formatMonto(gasto.monto)}</span>
                                <button onClick={() => abrirEditar(gasto)} className="text-slate-400 hover:text-white text-sm">Editar</button>
                                <button onClick={() => setIdAEliminar(gasto.id)} className="text-rose-400 hover:text-rose-300 text-sm">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>

                {totalPaginas > 1 && (
                    <div className="flex items-center justify-between mt-6">
                        <button
                            onClick={anterior}
                            disabled={pagina === 1}
                            className="px-4 py-2 text-sm rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
                        >
                            ← Anterior
                        </button>
                        <span className="text-slate-400 text-sm">Página {pagina} de {totalPaginas}</span>
                        <button
                            onClick={siguiente}
                            disabled={pagina === totalPaginas}
                            className="px-4 py-2 text-sm rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
                        >
                            Siguiente →
                        </button>
                    </div>
                )}

            </div>

            {modalAbierto && (
                <GastoModal
                    gasto={gastoSeleccionado}
                    categorias={categorias}
                    onGuardar={guardar}
                    onCerrar={cerrarModal}
                />
            )}
            {idAEliminar && (
                <ConfirmModal
                    mensaje="Esta acción no se puede deshacer."
                    onConfirmar={handleEliminar}
                    onCancelar={() => setIdAEliminar(null)}
                />
            )}
            <Toast toast={toast} />
        </AppLayout>
    );
}
