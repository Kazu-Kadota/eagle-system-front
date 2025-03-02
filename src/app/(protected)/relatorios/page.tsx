import { ReportHomeForm } from '@/app/(protected)/relatorios/form';
import { UserType } from '@/models';
import { getSessionOrRedirect } from '@/utils/authentication';

export default async function ReportHomePage() {
  await getSessionOrRedirect({
    allowedUserTypes: [UserType.ADMIN, UserType.CLIENT],
  });

  return <ReportHomeForm />;
}
