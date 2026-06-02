import { useState, useMemo } from 'react';

export function usePaginacion(items, porPagina = 5) {
    const [pagina, setPagina] = useState(1);

    const totalPaginas = Math.ceil(items.length / porPagina);

    const itemsPagina = useMemo(() => {
        const inicio = (pagina - 1) * porPagina;
        return items.slice(inicio, inicio + porPagina);
    }, [items, pagina, porPagina]);

    const siguiente = () => setPagina(p => Math.min(p + 1, totalPaginas));
    const anterior = () => setPagina(p => Math.max(p - 1, 1));

    return { itemsPagina, pagina, totalPaginas, siguiente, anterior };
}
