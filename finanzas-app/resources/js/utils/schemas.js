import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(2, 'Mínimo 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string()
        .min(8, 'Mínimo 8 caracteres')
        .regex(/[A-Z]/, 'Debe tener al menos una mayúscula')
        .regex(/[a-z]/, 'Debe tener al menos una minúscula')
        .regex(/[^a-zA-Z0-9]/, 'Debe tener al menos un carácter especial'),
    password_confirmation: z.string(),
}).refine(
    (data) => data.password === data.password_confirmation,
    { message: 'Las contraseñas no coinciden', path: ['password_confirmation'] }
)