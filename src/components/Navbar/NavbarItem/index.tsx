import Link from 'next/link';

import { cn } from '@/utils/classNames';

export interface NavbarItemProps {
  label: string;
  path: string;
  isActive?: boolean;
  closeNavbar?: () => void;
}

export const NavbarItem = ({
  path,
  label,
  isActive,
  closeNavbar,
}: NavbarItemProps) => (
  <Link
    href={path}
    className={cn(
      'ml-4 whitespace-pre-line rounded-l-md px-3 py-0.5 text-base font-extrabold transition-colors hover:bg-dark hover:text-light',
      isActive ? 'bg-dark text-light' : 'text-dark',
    )}
    onClick={closeNavbar}
  >
    {label}
  </Link>
);
