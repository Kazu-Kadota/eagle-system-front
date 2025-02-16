import { UserType } from '@/models';
import { getSessionOrRedirect } from '@/utils/authentication';

export default async function RegisterHomeLayout({
  children,
}: React.PropsWithChildren) {
  await getSessionOrRedirect({
    allowedUserTypes: [UserType.ADMIN],
  });

  return children;
}
