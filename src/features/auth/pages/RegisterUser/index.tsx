import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserType } from 'src/models'
import { useAuthStore } from 'src/store/auth'
import { useModal } from 'src/store/modal'
import { getErrorMsg } from 'src/utils/errors'
import { hasUserType } from 'src/utils/userType'
import { useCompanies } from '../..'
import { registerUser } from '../../services/register'
import { RegisterUserSchema, registerUserSchema } from './schema'
import { RegisterUserUI } from './ui'

export function RegisterUserPage() {
  const modal = useModal()
  const navigate = useNavigate()

  const { user } = useAuthStore()

  const [isLoading, setLoading] = useState(false)

  const { control, reset, handleSubmit } = useForm<RegisterUserSchema>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      user_type: UserType.ADMIN,
      api: 'false',
      company_name: '',
      password: '',
      user_last_name: '',
      user_first_name: '',
      email: '',
      password_confirmation: '',
    },
  })

  const { companiesSelectItems, isLoading: companiesLoading } = useCompanies({
    enabled: hasUserType(user.user_type, UserType.ADMIN),
  })

  const onSubmit = async (data: RegisterUserSchema) => {
    try {
      setLoading(true)

      await registerUser({
        company_name: data.company_name,
        email: data.email,
        user_first_name: data.user_first_name,
        user_last_name: data.user_last_name,
        user_type: data.user_type,
        password: data.password,
        api: data.api === 'true',
      })

      modal.open({
        title: 'Usuário criado com\nsucesso!',
        buttons: [{ children: 'OK', onClick: () => navigate(-1) }],
      })

      reset()
    } catch (error) {
      toast.error(getErrorMsg(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <RegisterUserUI
      control={control}
      isLoading={isLoading}
      companiesLoading={companiesLoading}
      companiesSelectItems={companiesSelectItems}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}
