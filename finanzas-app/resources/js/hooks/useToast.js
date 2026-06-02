import { useState, useCallback } from 'react';

export function useToast() {
    const [toast, setToast] = useState(null);

    const mostrar = useCallback((mensaje, tipo = 'exito') => {
        setToast({ mensaje, tipo, id: Date.now() });
        setTimeout(() => setToast(null), 3000);
    }, []);

    return { toast, mostrar };
}
