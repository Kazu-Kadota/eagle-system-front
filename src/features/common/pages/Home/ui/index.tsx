import { LinksBox } from 'src/features/common/components'
import { UserType } from 'src/models'
import { hasUserType } from 'src/utils/userType'
import { linksPeople, linksRegister, linksVehicles } from './links'

interface HomeUIProps {
  userType: UserType
}

export function HomeUI({ userType }: HomeUIProps) {
  return (
    <>
      <h2 className="text-3xl font-bold tracking-wider text-light md:text-4xl lg:text-5xl">
        Seja bem vindo ao Eagle
      </h2>
      <div className="mt-6 flex flex-col gap-8 md:mt-10">
        <LinksBox
          title="Acesso Rápido à Frota"
          links={linksVehicles(userType)}
        />
        <LinksBox
          title="Acesso Rápido à Pessoas"
          links={linksPeople(userType)}
        />
        {hasUserType(userType, UserType.ADMIN) && (
          <LinksBox title="Acesso Rápido à Cadastros" links={linksRegister} />
        )}
      </div>
    </>
  )
}
