import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo, LogoutIcon } from 'src/assets/icons'
import { useToggle } from 'src/hooks'
import { UserType } from 'src/models'
import { RoutePaths } from 'src/routes/paths'
import { useAuthStore } from 'src/store/auth'
import { cn } from 'src/utils/classNames'
import { clearStorage } from 'src/utils/logout'
import { hasUserType } from 'src/utils/userType'
import { MobileTopbar } from './MobileTopbar'
import { NavButton } from './NavButton'
import { NavbarItem, NavbarItemProps } from './NavbarItem'

interface NavbarLinks extends NavbarItemProps {
  userTypes?: UserType[]
}

const navlinks: NavbarLinks[] = [
  { label: 'Home', path: RoutePaths.Common.HOME },
  {
    label: 'Análises de Pessoas',
    path: RoutePaths.Analysis.PEOPLE_ANALYSIS_HOME,
  },
  {
    label: 'Análises de Véiculos',
    path: RoutePaths.Analysis.VEHICLE_ANALYSIS_HOME,
  },
  {
    label: 'Relatórios',
    path: RoutePaths.Report.REPORT_HOME,
    userTypes: [UserType.ADMIN, UserType.CLIENT],
  },
  {
    label: 'Gerenciamento\nde Usuários',
    path: RoutePaths.Auth.REGISTER_HOME,
    userTypes: [UserType.ADMIN],
  },
  { label: 'Minha Conta', path: RoutePaths.Auth.ACCOUNT_HOME },
]

export function Navbar() {
  const navigate = useNavigate()

  const userType = useAuthStore((state) => state.user.user_type)
  const [isNavbarOpen, toggleNavbarOpen, setNavbarOpen] = useToggle(false)

  const closeNavbar = () => setNavbarOpen(false)

  const handleLogout = () => {
    clearStorage()
    navigate(RoutePaths.Auth.login())
  }

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
            closeNavbar={closeNavbar}
            {...navlink}
          />
        )),
    [userType],
  )

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
          onClick={handleLogout}
        />
      </nav>
      <div className="w-48" />
    </>
  )
}
