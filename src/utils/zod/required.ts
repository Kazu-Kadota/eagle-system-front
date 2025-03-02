import { z } from 'zod';

export const requiredValidator = z.string().min(1, 'Campo deve ser preenchido');
