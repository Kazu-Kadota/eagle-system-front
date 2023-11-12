import { NavLink } from 'react-router-dom'
import { cn } from 'src/utils/classNames'

export interface NavbarItemProps {
  label: string
  path: string
  closeNavbar?: () => void
}

export const NavbarItem = ({ path, label, closeNavbar }: NavbarItemProps) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      cn(
        'ml-4 whitespace-pre-line rounded-l-md px-3 py-0.5 text-base font-extrabold transition-colors hover:bg-dark hover:text-light',
        isActive ? 'bg-dark text-light' : 'text-dark',
      )
    }
    onClick={closeNavbar}
  >
    {label}
  </NavLink>
)
