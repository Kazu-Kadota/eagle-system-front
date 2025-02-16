'use client';

import { usePathname, useRouter } from 'next/navigation';
import { memo, useMemo } from 'react';

import { logoutAction } from '@/app/(auth)/login/actions';
import { Logo } from '@/assets/icons/Logo';
import { LogoutIcon } from '@/assets/icons/LogoutIcon';
import { MobileTopbar } from '@/components/Navbar/MobileTopbar';
import {
  NavbarItem,
  type NavbarItemProps,
} from '@/components/Navbar/NavbarItem';
import { NavButton } from '@/components/Navbar/NavButton';
import { RoutePaths } from '@/constants/paths';
import { useToggle } from '@/hooks/useToggle';
import { UserType } from '@/models';
import { cn } from '@/utils/classNames';
import { hasUserType } from '@/utils/userType';
import { useMutation } from '@tanstack/react-query';

interface NavbarLinks extends NavbarItemProps {
  userTypes?: UserType[];
}

const navlinks: NavbarLinks[] = [
  { label: 'Home', path: RoutePaths.HOME },
  {
    label: 'Análises de Pessoas',
    path: RoutePaths.PEOPLE_ANALYSIS_HOME,
  },
  {
    label: 'Análises de Véiculos',
    path: RoutePaths.VEHICLE_ANALYSIS_HOME,
  },
  {
    label: 'Relatórios',
    path: RoutePaths.REPORT_HOME,
    userTypes: [UserType.ADMIN, UserType.CLIENT],
  },
  {
    label: 'Gerenciamento\nde Usuários',
    path: RoutePaths.REGISTER_HOME,
    userTypes: [UserType.ADMIN],
  },
  { label: 'Minha Conta', path: RoutePaths.ACCOUNT_HOME },
];

interface NavbarProps {
  userType: UserType;
}

export const Navbar = memo(({ userType }: NavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isNavbarOpen, toggleNavbarOpen] = useToggle(false);

  const { isPending: isLogoutLoading, mutate: handleLogout } = useMutation({
    mutationFn: logoutAction,
    onSuccess: () => router.push(RoutePaths.login()),
  });

  const isLinkActive = (href: string) => {
    if (href === '/') return href === pathname;

    return pathname.startsWith(href);
  };

  const links = useMemo(
    () =>
      navlinks
        .filter(
          (navlink) =>
            !navlink.userTypes || hasUserType(userType, ...navlink.userTypes),
        )
        .map((navlink) => (
          <NavbarItem
            key={navlink.label}
            closeNavbar={toggleNavbarOpen}
            isActive={isLinkActive(navlink.path)}
            {...navlink}
          />
        )),
    [userType, pathname, toggleNavbarOpen],
  );

  return (
    <>
      <MobileTopbar
        navbarIsOpen={isNavbarOpen}
        toggleNavbar={toggleNavbarOpen}
      />

      <nav
        className={cn(
          'fixed inset-y-0 left-0 z-20 flex w-48 flex-col gap-5 bg-light pt-7 transition-transform',
          isNavbarOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-48',
        )}
      >
        <Logo className="mb-5 self-center" />

        {links}

        <div className="flex-1" />

        <NavButton
          label="Sair"
          icon={<LogoutIcon className="w-8 fill-light" />}
          loading={isLogoutLoading}
          onClick={handleLogout}
        />
      </nav>
      <div className="w-48" />
    </>
  );
});

Navbar.displayName = 'Navbar';
