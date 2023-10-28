import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ForgotPasswordUI } from './ui'
import { ForgotPasswordSchema, schema } from './schema'
import { StatesEnum } from './ui/types'
import { useState } from 'react'
import recoveryPasswordSend from '../../services/recovery-password'
import { toast } from 'react-toastify'
import { getErrorMsg } from 'src/utils/errors'

export function ForgotPasswordPage() {
  const { control, handleSubmit } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  })

  const [state, setState] = useState(StatesEnum.DEFAULT)

  const onSubmit = async (data: ForgotPasswordSchema) => {
    try {
      setState(StatesEnum.LOADING)

      await recoveryPasswordSend(data)

      setState(StatesEnum.SUCCESS)
    } catch (error) {
      setState(StatesEnum.DEFAULT)

      toast.error(getErrorMsg(error))
    }
  }

  return (
    <ForgotPasswordUI
      control={control}
      state={state}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}
