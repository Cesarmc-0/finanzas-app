 import { useState, useEffect } from 'react';
  import api from '../services/api';

  export function useTransacciones(endpoint) {
      const [items,   setItems]   = useState([]);
      const [loading, setLoading] = useState(true);
      const [error,   setError]   = useState(null);

    const cargar = async () =>{
        try {
            const { data } =await api.get('/'+ endpoint);
            setItems(data);
        } catch (error) {
            setError(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect (() => {
        cargar();
    },[endpoint]);

    const crear = async (data) => {
        await api.post('/'+ endpoint, data);
        cargar();
    }

    const actualizar = async (id, data) => {
        await api.put('/' + endpoint + '/' + id, data);
        cargar();
    }

    const eliminar = async (id) => {
        await api.delete('/' + endpoint + '/' + id);
        cargar();
    }

      return { items, loading, error, crear, actualizar, eliminar };
  }
