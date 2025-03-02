import { RequestAnalysisForm } from '@/app/(protected)/analises/solicitar/form';
import { UserType } from '@/models';
import { getSessionOrRedirect } from '@/utils/authentication';

export default async function RequestAnalysisPage() {
  await getSessionOrRedirect({
    allowedUserTypes: [UserType.ADMIN, UserType.CLIENT],
  });

  return <RequestAnalysisForm />;
}
