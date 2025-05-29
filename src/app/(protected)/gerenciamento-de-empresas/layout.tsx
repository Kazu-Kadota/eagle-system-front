import { UserType } from '@/models';
import { getSessionOrRedirect } from '@/utils/authentication';

export default async function ManageCompaniesLayout({
  children,
}: React.PropsWithChildren) {
  await getSessionOrRedirect({
    allowedUserTypes: [UserType.ADMIN],
  });

  return children;
}
