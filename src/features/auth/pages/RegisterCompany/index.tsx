import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CompanyType } from 'src/models'
import { useModal } from 'src/store/modal'
import { getErrorMsg } from 'src/utils/errors'
import { registerCompany } from '../../services/register'
import { RegisterCompanySchema, registerCompanySchema } from './schema'
import { RegisterCompanyUI } from './ui'
import { useQueryClient } from '@tanstack/react-query'

export function RegisterCompanyPage() {
  const modal = useModal()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [isLoading, setLoading] = useState(false)

  const { control, reset, handleSubmit } = useForm<RegisterCompanySchema>({
    resolver: zodResolver(registerCompanySchema),
    defaultValues: {
      name: '',
      cnpj: '',
      type: CompanyType.CLIENT,
    },
  })

  const onSubmit = async (data: RegisterCompanySchema) => {
    try {
      setLoading(true)

      await registerCompany(data)

      modal.open({
        title: 'Empresa criada com\nsucesso!',
        buttons: [{ children: 'OK', onClick: () => navigate(-1) }],
      })

      reset()

      queryClient.invalidateQueries({ queryKey: ['companies'] })
    } catch (error) {
      toast.error(getErrorMsg(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <RegisterCompanyUI
      control={control}
      isLoading={isLoading}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}
