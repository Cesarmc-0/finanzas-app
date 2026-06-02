import { useState, useEffect } from 'react';
import api from '../services/api';

export function useDashboard() {
    const [datos, setDatos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargar = async () => {
            try {
                const { data } = await api.get('/resumen');
                setDatos(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []);

    return { datos, loading, error };
}