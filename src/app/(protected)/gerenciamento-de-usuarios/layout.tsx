import { UserType } from '@/models';
import { getSession } from '@/utils/authentication';

export default async function RegisterHomeLayout({
  children,
}: React.PropsWithChildren) {
  await getSession({
    allowedUserTypes: [UserType.ADMIN],
  });

  return children;
}
