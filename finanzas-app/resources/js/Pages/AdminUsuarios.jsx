import AdminLayout from "@/Layouts/AdminLayout";
import SearchInput from "@/Components/SearchInput";
import PageHeader from "@/Components/PageHeader";
import EmptyState from '../Components/EmptyState';
import Toast from "@/Components/Toast";
import ConfirmModal from "@/Components/ConfirmModal";
import { useAdmin } from "@/hooks/useAdmin";
import { useToast } from "@/hooks/useToast";
import { useState } from "react";

const AdminUsuarios = () => {
    const { toast, mostrar } = useToast();
    const { usuarios, loading, error, eliminarUsuario, actualizarEstado } = useAdmin();
    const [busqueda, setBusqueda] = useState('');
    const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

    const usuariosFiltrados = usuarios.filter(usuario => 
        usuario.name?.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleToggle = async (id) => {
        await actualizarEstado(id);
        mostrar('Estado actualizado', 'exito');
    };

    const handleEliminar = async () => {
        await eliminarUsuario(usuarioAEliminar);
        setUsuarioAEliminar(null);
        mostrar('Usuario Eliminado', 'exito');
    }

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
            <PageHeader
                titulo="Usuarios"
            />   
            </div>

            <div className="mb-4">
                <SearchInput value={busqueda} onChange={setBusqueda} placeholder="Buscar Usuarios..." />
            </div>
                {loading && <p className="text-slate-400 text-sm">Cargando...</p>}
                {error && <p className="text-rose-400 text-sm">{error}</p>}

                {!loading && usuariosFiltrados.length === 0 && (
                    <EmptyState
                        titulo="No tienes usuarios aún"
                        mensaje="No se encontraron usuarios"
                    />
                )}
                <div className="flex flex-col gap-3">
                    {usuariosFiltrados.map((usuario) => (
                        <div key={usuario.id} className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 flex justify-between items-center">
                            <div>
                                <p className="text-white font-medium">{usuario.name}</p>
                                <p className="text-slate-400 text-sm">{usuario.email}</p>
                                <p className="text-slate-400 text-sm capitalize">{usuario.rol}</p>
                                <p className={`text-sm capitalize ${usuario.activo ? 'text-emerald-400' : 'text-rose-400'}`}>{usuario.activo ? 'Activo' : 'Inactivo'}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button onClick={() => handleToggle(usuario.id)} className="text-indigo-400 hover:text-indigo-300 text-sm">{usuario.activo ? 'Desactivar' : 'Activar'}</button>
                                <button onClick={() => setUsuarioAEliminar(usuario.id)} className="text-rose-400 hover:text-rose-300 text-sm">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            {usuarioAEliminar && (
                <ConfirmModal
                    mensaje="Esta acción no se puede deshacer."
                    onConfirmar={handleEliminar}
                    onCancelar={() => setUsuarioAEliminar(null)}
                />
            )}
            
            <Toast toast={toast} />             
        </AdminLayout>
    )
}

export default AdminUsuarios;