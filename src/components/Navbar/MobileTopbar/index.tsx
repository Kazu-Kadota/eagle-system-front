import Image from 'next/image';

import { MenuIcon } from '@/assets/icons/MenuIcon';
import logoImg from '@/assets/images/logo.png';
import { useTransition } from '@/hooks/useTransition';
import { cn } from '@/utils/classNames';
import { memo } from 'react';

interface MobileTopbar {
  navbarIsOpen: boolean;
  toggleNavbar: () => void;
}

const transitionDuration = 150;

export const MobileTopbar = memo(
  ({ navbarIsOpen, toggleNavbar }: MobileTopbar) => {
    const { shouldMount, stage } = useTransition(
      navbarIsOpen,
      transitionDuration,
    );

    return (
      <>
        <div className="top fixed z-0 flex h-12 w-full items-center justify-between bg-dark shadow-2xl md:hidden">
          <div className="w-10" />
          <Image
            quality={100}
            src={logoImg}
            alt="Eagle System"
            className="w-12 object-contain"
          />
          <button type="button" className="w-10" onClick={toggleNavbar}>
            <MenuIcon className="w-8 fill-light" />
          </button>
        </div>
        <div className="h-12 md:hidden" />
        {shouldMount && (
          <div
            className={cn(
              stage === 'enter' ? 'opacity-30' : 'opacity-0',
              `fixed inset-0 z-10 bg-dark transition-opacity duration-[${transitionDuration}] md:hidden`,
            )}
            onClick={toggleNavbar}
          />
        )}
      </>
    );
  },
);

MobileTopbar.displayName = 'MobileTopbar';
