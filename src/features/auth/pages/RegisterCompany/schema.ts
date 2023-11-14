import { CompanyType } from 'src/models'
import { requiredValidator } from 'src/utils/zod'
import { z } from 'zod'

export const registerCompanySchema = z.object({
  name: requiredValidator,
  cnpj: z.string().min(18, 'CNPJ inválido'),
  type: z.nativeEnum(CompanyType),
})

export type RegisterCompanySchema = z.infer<typeof registerCompanySchema>
