import { LogoTriangle } from '@/assets/icons/LogoTriangle';
import { LogoutSessionClient } from '@/store/session/LogoutSessionClient';
import Image from 'next/image';
import bgAuthImg from '@/assets/images/bg-auth.jpg';

export default async function AuthLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      <LogoutSessionClient />

      <Image
        quality={100}
        src={bgAuthImg}
        alt="Eagle System"
        className="absolute h-full w-full object-cover"
      />
      <LogoTriangle className="absolute right-0 hidden h-full lg:block" />

      <div className="relative flex h-full w-full flex-col items-center px-5 pt-[12vh] lg:items-start lg:px-12 xl:px-[8vw]">
        <div className="w-full max-w-xl">
          {children}
          <p className="mt-6 text-center text-xs font-light text-light/60">
            Todos os direitos reservados - EAGLE SYSTEM © 2023
          </p>
        </div>
      </div>
    </>
  );
}
