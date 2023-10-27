import { requiredValidator } from './required'

export const plateValidator = requiredValidator.min(
  7,
  'Placa precisa ter no mínimo 7 caracteres',
)
