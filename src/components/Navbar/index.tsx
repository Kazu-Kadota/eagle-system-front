import { useNavigate } from 'react-router-dom'
import { Logo, LogoutIcon } from 'src/assets/icons'
import { useToggle } from 'src/hooks'
import { RoutePaths } from 'src/routes/paths'
import { cn } from 'src/utils/classNames'
import { clearStorage } from 'src/utils/logout'
import { MobileTopbar } from './MobileTopbar'
import { NavButton } from './NavButton'
import { NavbarItem, NavbarItemProps } from './NavbarItem'

const navlinks: NavbarItemProps[] = [
  { label: 'Home', path: RoutePaths.Common.HOME },
  { label: 'Análises', path: RoutePaths.Analysis.ANALYSIS_HOME },
  { label: 'Relatórios', path: '/relatorios' },
  { label: 'Gerenciamento\nde Usuários', path: RoutePaths.Auth.REGISTER_HOME },
  { label: 'Minha Conta', path: RoutePaths.Auth.ACCOUNT_HOME },
]

export function Navbar() {
  const navigate = useNavigate()

  const [isNavbarOpen, toggleNavbarOpen, setNavbarOpen] = useToggle(false)

  const closeNavbar = () => setNavbarOpen(false)

  const handleLogout = () => {
    clearStorage()
    navigate(RoutePaths.Auth.login())
  }

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

        {navlinks.map((navlink) => (
          <NavbarItem
            key={navlink.label}
            closeNavbar={closeNavbar}
            {...navlink}
          />
        ))}

        <div className="flex-1" />

        <NavButton
          label="Sair"
          icon={<LogoutIcon className="w-8 fill-light" />}
          onClick={handleLogout}
        />
      </nav>
      <div className="w-48" />
    </>
  )
}
