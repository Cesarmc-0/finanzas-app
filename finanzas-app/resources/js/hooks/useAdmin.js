import api from "@/services/api";
import { useState,useEffect } from "react";


export function useAdmin () {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [usuarios, setUsuarios] = useState([]);
    const [estadisticas, setEstadisticas] = useState({});

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
        try {
            await api.patch(`/admin/usuarios/${id}/toggle`);
            cargarUsuarios();
        } catch (error) {
            setError(error.message);
        }
    }

    const eliminarUsuario = async (id) => {
        try {
            await api.delete(`/admin/usuarios/${id}`);
            cargarUsuarios();
        } catch (error) {
            setError(error.message);
        }
    }
    const cargarEstadisticas = async () => {
        try {
            const {data} = await api.get(`/admin/estadisticas`);
            setEstadisticas(data);
        } catch (error) {
            setError(error.message);
        }
    }

    return {loading, error, usuarios,estadisticas, actualizarEstado, eliminarUsuario, cargarEstadisticas }
}

