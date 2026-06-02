export function formatMonto(valor) {
    return Number(valor).toLocaleString('es-CO', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
}
