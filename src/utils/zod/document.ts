import { isCNPJ } from '../cnpj'
import { isCPF } from '../cpf'
import { isDocumentValid } from '../document'
import { requiredValidator } from './required'

export const documentValidator = requiredValidator.refine(
  isDocumentValid,
  'CPF/CNPJ inválido',
)

export const cpfValidator = requiredValidator.refine(isCPF, 'CPF inválido')

export const cnpjValidator = requiredValidator.refine(isCNPJ, 'CNPJ inválido')

export const cnhValidator = requiredValidator.regex(
  /(?=.*\d)[A-Za-z0-9]{1,11}/,
  'CNH inválida',
)
