import { useState,useEffect } from "react";
import api from '../services/api';

export function useIngresos(){
    const [ingresos, setIngresos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cargar = async () => {
        try {
            const { data } = await api.get('/ingresos');
            setIngresos(data);
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect( () => {
        cargar();
    }, []);


    const total = ingresos.reduce((acumulador, item) => acumulador + item.monto, 0);

    const crear = async (data) => {
        await api.post('/ingresos', data);
        cargar();
    }

    const actualizar = async (id, data) => {
        await api.put('/ingresos/' + id, data);
        cargar();
    }

    const eliminar = async(id) => {
        await api.delete('/ingresos/'+ id);
        cargar();
    }
    return {ingresos, loading, error, total, crear, actualizar, eliminar};
}