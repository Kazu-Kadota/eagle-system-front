import { Box, Clickable, Input, InputRow, SelectGroup } from 'src/components'
import {
  registerUserTypeSelectItems,
  userApiSelectItems,
} from 'src/features/auth/constants'
import { User, UserType } from 'src/models'
import { SelectItem } from 'src/types/select'
import { hasUserType } from 'src/utils/userType'

interface AccountHomeUIProps {
  user: User
  companiesSelectItems: SelectItem[]
  companiesLoading: boolean
  onChangePassword: () => void
}

export function AccountHomeUI({
  user,
  companiesLoading,
  companiesSelectItems,
  onChangePassword,
}: AccountHomeUIProps) {
  return (
    <Box title="Minha conta" className="flex flex-col gap-3 sm:gap-4">
      <InputRow>
        <Input
          label="Nome:"
          name="first_name"
          type="text"
          disabled
          value={user?.user_first_name}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        <Input
          label="Sobrenome:"
          name="last_name"
          type="text"
          disabled
          value={user?.user_last_name}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
      </InputRow>

      <InputRow>
        <Input
          label="E-mail"
          name="email"
          type="text"
          disabled
          value={user?.email}
          inputVariants={{ size: 'sm' }}
          labelVariants={{ size: 'sm' }}
          containerVariants={{ layout: 'row' }}
          containerClassName="flex-1"
        />
        {hasUserType(user?.user_type, UserType.ADMIN) && (
          <Input
            label="Nome da Empresa:"
            name="company_name"
            type="text"
            disabled
            placeholder="Selecione uma empresa"
            items={companiesSelectItems}
            loading={companiesLoading}
            value={user?.company_name}
            inputVariants={{ size: 'sm' }}
            labelVariants={{ size: 'sm' }}
            containerVariants={{ layout: 'row' }}
            containerClassName="flex-1"
          />
        )}
      </InputRow>

      {hasUserType(user?.user_type, UserType.ADMIN) && (
        <>
          <SelectGroup
            title="Permissões de acesso:"
            disabled
            items={registerUserTypeSelectItems}
            layout="row"
            value={user?.user_type}
          />
          <SelectGroup
            title="Irá utilizar a API?"
            items={userApiSelectItems}
            layout="row"
            disabled
            value={user.api ? 'true' : 'false'}
          />
        </>
      )}

      <Clickable
        className="mt-1 self-start text-base font-medium text-link outline-none"
        onClick={onChangePassword}
      >
        Redefinir senha
      </Clickable>
    </Box>
  )
}
