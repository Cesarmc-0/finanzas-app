import { useState, useEffect } from 'react';
import api from '../services/api';
import { useIngresos } from '../hooks/useIngresos';
import AppLayout from '../Layouts/AppLayout';
import PageHeader from '../Components/PageHeader';
import BackButton from '../Components/BackButton';
import EmptyState from '../Components/EmptyState';
import IngresoModal from '../Components/IngresoModal';

export default function Ingresos() {
    const { ingresos, loading, error, total, crear, actualizar, eliminar } = useIngresos();
    const [categorias, setCategorias] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [ingresoSeleccionado, setIngresoSeleccionado] = useState(null);

    useEffect(() => {
        api.get('/categorias').then(({ data }) => setCategorias(data.filter(c => c.tipo === 'ingreso')));
    }, []);

    const abrirCrear = () => {
        setIngresoSeleccionado(null);
        setModalAbierto(true);
    };

    const abrirEditar = (ingreso) => {
        setIngresoSeleccionado(ingreso);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setIngresoSeleccionado(null);
    };

    const guardar = async (data) => {
        if (ingresoSeleccionado) {
            await actualizar(ingresoSeleccionado.id, data);
        } else {
            await crear(data);
        }
        cerrarModal();
    };

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto">

                <BackButton label="Dashboard"/>
                <PageHeader
                    titulo="Ingresos"
                    subtitulo={`Total: $${total.toFixed(2)}`}
                    botonTexto="+ Nuevo Ingreso"
                    onNuevo={abrirCrear}
                />

                {loading && <p className="text-slate-400 text-sm">Cargando...</p>}
                {error && <p className="text-rose-400 text-sm">{error}</p>}

                {!loading && ingresos.length === 0 && (
                    <EmptyState
                        titulo="No tienes ingresos aún"
                        mensaje="Registra tu primer ingreso para empezar a llevar el control."
                    />
                )}

                <div className="flex flex-col gap-3">
                    {ingresos.map((ingreso) => (
                        <div key={ingreso.id} className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 flex justify-between items-center">
                            <div>
                                <p className="text-white font-medium">{ingreso.descripcion || 'Sin descripción'}</p>
                                <p className="text-slate-400 text-sm">{ingreso.fecha}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-indigo-400 font-semibold">${Number(ingreso.monto).toFixed(2)}</span>
                                <button onClick={() => abrirEditar(ingreso)} className="text-slate-400 hover:text-white text-sm">Editar</button>
                                <button onClick={() => eliminar(ingreso.id)} className="text-rose-400 hover:text-rose-300 text-sm">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {modalAbierto && (
                <IngresoModal
                    ingreso={ingresoSeleccionado}
                    categorias={categorias}
                    onGuardar={guardar}
                    onCerrar={cerrarModal}
                />
            )}
        </AppLayout>
    );
}
