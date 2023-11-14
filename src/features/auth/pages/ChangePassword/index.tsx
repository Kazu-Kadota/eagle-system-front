import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getErrorMsg } from 'src/utils/errors'
import { changePassword } from '../../services/change-password'
import {
  ChangePasswordSchema,
  changePasswordSchema,
} from '../AccountHome/schema'
import { ChangePasswordUIState } from './ui/types'
import { ChangePasswordUI } from './ui'
import { useModal } from 'src/store/modal'

export function ChangePasswordModalContent() {
  const modal = useModal()

  const { control, handleSubmit } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: '',
      password: '',
      confirm_password: '',
    },
  })

  const [state, setState] = useState(ChangePasswordUIState.DEFAULT)

  const onSubmit = async (data: ChangePasswordSchema) => {
    try {
      setState(ChangePasswordUIState.LOADING)

      await changePassword({
        password: data.password,
        old_password: data.old_password,
      })

      setState(ChangePasswordUIState.SUCCESS)
      modal.update({ disableOverlayClose: false })
    } catch (error) {
      toast.error(getErrorMsg(error))
      setState(ChangePasswordUIState.DEFAULT)
    }
  }

  return (
    <ChangePasswordUI
      control={control}
      state={state}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}
