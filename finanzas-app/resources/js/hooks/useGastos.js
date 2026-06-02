import { useState, useEffect } from 'react';
import api from '../services/api';

export function useGastos() {
    const [gastos, setGastos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cargar = async () => {
        try {
            const { data } = await api.get('/gastos');
            setGastos(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargar();
    }, []);

    const total = gastos.reduce((acumulador, item) => acumulador + Number(item.monto), 0);

    const crear = async (data) => {
        await api.post('/gastos', data);
        cargar();
    };

    const actualizar = async (id, data) => {
        await api.put('/gastos/' + id, data);
        cargar();
    };

    const eliminar = async (id) => {
        await api.delete('/gastos/' + id);
        cargar();
    };

    return { gastos, loading, error, total, crear, actualizar, eliminar };
}
