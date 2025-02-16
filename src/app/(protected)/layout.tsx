import { Navbar } from '@/components/Navbar';
import { SessionClient } from '@/store/session/SessionClient';
import { getSessionOrRedirect } from '@/utils/authentication';
import Image from 'next/image';
import bgProtectedImg from 'src/assets/images/bg-protected.jpg';

export default async function ProtectedLayout({
  children,
}: React.PropsWithChildren) {
  const session = await getSessionOrRedirect();

  return (
    <main className="flex h-full flex-col md:flex-row">
      <SessionClient session={session} />

      <Image
        src={bgProtectedImg}
        alt="Eagle System"
        className="fixed h-full w-full object-cover"
      />
      <Navbar />
      <div className="relative flex flex-1 flex-col overflow-x-auto px-4 py-7 md:px-8 md:py-14 xl:px-14">
        {children}
      </div>
    </main>
  );
}
