import { NavLink } from 'react-router-dom'
import { cn } from 'src/utils/classNames'

export interface NavbarItemProps {
  label: string
  path: string
}

export const NavbarItem = ({ path, label }: NavbarItemProps) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      cn(
        'text-smx ml-5 whitespace-pre-line rounded-l-md px-3 py-0.5 font-extrabold transition-colors hover:bg-dark hover:text-light',
        isActive ? 'bg-dark text-light' : 'text-dark',
      )
    }
  >
    {label}
  </NavLink>
)
