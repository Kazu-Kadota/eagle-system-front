import Image from 'next/image';

import { MenuIcon } from '@/assets/icons/MenuIcon';
import logoImg from '@/assets/images/logo.png';
import { Fade } from '@/components/Fade';
import { memo } from 'react';

interface MobileTopbar {
  navbarIsOpen: boolean;
  toggleNavbar: () => void;
}

const transitionDuration = 150;

export const MobileTopbar = memo(
  ({ navbarIsOpen, toggleNavbar }: MobileTopbar) => {
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
        <Fade
          isVisible={navbarIsOpen}
          duration={transitionDuration}
          className="fixed inset-0 z-10 bg-dark/70 transition-opacity md:hidden"
          onClick={toggleNavbar}
        />
      </>
    );
  },
);

MobileTopbar.displayName = 'MobileTopbar';
