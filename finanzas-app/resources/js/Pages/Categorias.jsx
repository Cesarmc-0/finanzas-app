import { useState } from 'react';
import { useTransacciones } from '../hooks/useTransacciones';
import AppLayout from '../Layouts/AppLayout';
import PageHeader from '../Components/PageHeader';
import EmptyState from '../Components/EmptyState';
import CategoriaModal from '../Components/CategoriaModal';
import BackButton from '../Components/BackButton';
import SearchInput from '../Components/SearchInput';
import Toast from '../Components/Toast';
import ConfirmModal from '../Components/ConfirmModal';
import { useToast } from '../hooks/useToast';

  export default function Categorias(){
    const { items: categorias, loading, error, crear, actualizar, eliminar } = useTransacciones('categorias');
    const [modalAbierto, setModalAbierto] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const { toast, mostrar } = useToast();
    const [idAEliminar, setIdAEliminar] = useState(null);

    const categoriasFiltradas = categorias.filter(c =>
        c.nombre?.toLowerCase().includes(busqueda.toLowerCase())
    );


    const abrirCrear = () => {
    setCategoriaSeleccionada(null);
    setModalAbierto(true);
    };

    const abrirEditar = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setModalAbierto(true);
    };    

    const cerrarModal = () => {
    setModalAbierto(false);
    setCategoriaSeleccionada(null);
    };    

    const handleEliminar = async () => {
        await eliminar(idAEliminar);
        setIdAEliminar(null);
        mostrar('Categoría eliminada', 'exito');
    };

    const guardar = async (data) => {
        if (categoriaSeleccionada) {
            await actualizar(categoriaSeleccionada.id, data);
            mostrar('Categoría actualizada', 'exito');
        } else {
            await crear(data);
            mostrar('Categoría creada', 'exito');
        }
        cerrarModal();
    };

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto">

                <BackButton label="Dashboard" />

                <PageHeader
                    titulo="Categorías"
                    subtitulo={`${categorias.length} categoría${categorias.length !== 1 ? 's' : ''}`}
                    botonTexto="+ Nueva Categoría"
                    onNuevo={abrirCrear}
                />

                <div className="mb-4">
                    <SearchInput value={busqueda} onChange={setBusqueda} placeholder="Buscar categoría..." />
                </div>

                {loading && <p className="text-slate-400 text-sm">Cargando...</p>}
                {error && <p className="text-rose-400 text-sm">{error}</p>}

                {!loading && categoriasFiltradas.length === 0 && (
                    <EmptyState
                        titulo="No tienes categorías aún"
                        mensaje="Crea tu primera categoría para usarla en ingresos y gastos."
                    />
                )}

                <div className="flex flex-col gap-3">
                    {categoriasFiltradas.map((categoria) => (
                        <div key={categoria.id} className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: categoria.color }}></span>
                                <div>
                                    <p className="text-white font-medium">{categoria.nombre}</p>
                                    <p className="text-slate-400 text-sm capitalize">{categoria.tipo}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button onClick={() => abrirEditar(categoria)} className="text-slate-400 hover:text-white text-sm">Editar</button>
                                <button onClick={() => setIdAEliminar(categoria.id)} className="text-rose-400 hover:text-rose-300 text-sm">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {modalAbierto && (
                <CategoriaModal
                    categoria={categoriaSeleccionada}
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