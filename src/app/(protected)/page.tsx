import {
  linksPeople,
  linksRegister,
  linksVehicles,
} from '@/app/(protected)/links';
import { LinksBox } from '@/components/LinksBox';
import { UserType } from '@/models';
import { getSession } from '@/utils/authentication';
import { hasUserType } from '@/utils/userType';

export default async function HomePage() {
  const { user } = await getSession();

  return (
    <>
      <h2 className="text-3xl font-bold tracking-wider text-light md:text-4xl lg:text-5xl">
        Seja bem vindo ao Eagle
      </h2>
      <div className="mt-6 flex flex-col gap-8 md:mt-10">
        <LinksBox
          title="Acesso Rápido à Frota"
          links={linksVehicles(user.user_type)}
        />
        <LinksBox
          title="Acesso Rápido à Pessoas"
          links={linksPeople(user.user_type)}
        />
        {hasUserType(user.user_type, UserType.ADMIN) && (
          <LinksBox title="Acesso Rápido à Cadastros" links={linksRegister} />
        )}
      </div>
    </>
  );
}
