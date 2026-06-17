export function handleApiErrors(err, setFieldError, setGeneralError) {
    const status = err.response?.status;
    const serverErrors = err.response?.data?.errors;

    if (status === 422 && serverErrors) {
        // Mapea cada error de Laravel directo al campo de RHF
        Object.entries(serverErrors).forEach(([field, messages]) => {
            setFieldError(field, { message: messages[0] });
        });
    } else if (status === 403) {
        setGeneralError('Tu cuenta está desactivada.');
    } else if (status === 401) {
        setGeneralError('Credenciales incorrectas.');
    } else {
        setGeneralError('Error al conectar con el servidor.');
    }
}