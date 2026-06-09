import api from "@/services/api";
import { useState,useEffect } from "react";


export function useAdmin () {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [usuarios, setUsuarios] = useState([]);

    const cargarUsuarios = async () => {
    try {
        const { data } = await api.get('/admin/usuarios');
        setUsuarios(data);
    } catch (error) {
        setError(error.message);
    }finally{
        setLoading(false);
    }
    }
    useEffect( () => {
        cargarUsuarios();
    },[]);

    const actualizarEstado = async (id) => {
        await api.patch('/admin/usuarios/'+ id + '/toggle');
        cargarUsuarios();
    }


    const eliminarUsuarios = async (id) => {
        await api.delete('/ingresos/' + id);
        cargarUsuarios();
    }

    return {loading, error, usuarios, }
}

