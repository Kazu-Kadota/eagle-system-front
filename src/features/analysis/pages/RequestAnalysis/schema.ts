import { AnalysisType, UserType } from 'src/models'
import { hasUserType } from 'src/utils/userType'
import {
  asStringOptional,
  cnhValidator,
  requiredValidator,
} from 'src/utils/zod'
import { z } from 'zod'

export const analysisPersonSchema = z
  .object({
    name: requiredValidator,
    document: z.string().min(13, 'CPF inválido'),
    rg: requiredValidator,
    birth_date: requiredValidator,
    mother_name: requiredValidator,
    state_rg: requiredValidator,
    father_name: z.string().optional(),
    cnh: asStringOptional(cnhValidator),
    security_number_cnh: z.string().optional(),
    category_cnh: z.string().optional(),
    expire_at_cnh: z.string().optional(),
    naturalness: z.string().optional(),
    company_name: z.string().optional(),
    userType: z.nativeEnum(UserType).optional(),
  })
  .superRefine((data, ctx) => {
    if (hasUserType(data.userType, UserType.ADMIN) && !data.company_name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['company_name'],
        message: 'Campo não deve ser preenchido',
      })
    }
  })

export const analysisVehiclesSchema = z
  .object({
    owner_name: requiredValidator,
    owner_document: requiredValidator,
    plate: requiredValidator.min(7, 'Placa precisa ter no mínimo 7 caracteres'),
    vehicle_type: requiredValidator,
    plate_state: requiredValidator,
    driver_name: z.string().optional(),
    renavam: z.string().optional(),
    chassis: z.string().optional(),
    company_name: z.string().optional(),
    userType: z.nativeEnum(UserType).optional(),
    analysisType: z.nativeEnum(AnalysisType).optional(),
  })
  .superRefine((data, ctx) => {
    if (
      hasUserType(data.userType, UserType.ADMIN) &&
      data.analysisType !== AnalysisType.COMBO &&
      !data.company_name
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['company_name'],
        message: 'Campo não deve ser preenchido',
      })
    }
  })

export const analysisArrayVehicleSchema = z.object({
  vehicles: z.array(analysisVehiclesSchema),
})

export const basicVehicleFormSchema = z
  .object({
    company_name: z.string().optional(),
    plate_state: requiredValidator,
    plate: requiredValidator.min(7, 'Placa precisa ter no mínimo 7 caracteres'),
    owner_name: requiredValidator,
    owner_document: requiredValidator,
    userType: z.nativeEnum(UserType).optional(),
    analysisType: z.nativeEnum(AnalysisType).optional(),
  })
  .superRefine((data, ctx) => {
    if (
      hasUserType(data.userType, UserType.ADMIN) &&
      data.analysisType !== AnalysisType.COMBO &&
      !data.company_name
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['company_name'],
        message: 'Campo não deve ser preenchido',
      })
    }
  })

export type AnalysisVehiclesSchema = z.infer<typeof analysisVehiclesSchema>
export type AnalysisArrayVehicleSchema = z.infer<
  typeof analysisArrayVehicleSchema
>
export type AnalysisPersonSchema = z.infer<typeof analysisPersonSchema>
export type BasicVehicleFormSchema = z.infer<typeof basicVehicleFormSchema>
