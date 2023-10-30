import { StarIcon } from 'src/assets/icons/StartIcon'
import { Box, Link } from 'src/components'

const links = [
  { label: 'Solicitar Análise de Frota', path: '' },
  { label: 'Solicitar Análise de Combo', path: '' },
  { label: 'Consultar Análise de Frota', path: '' },
]

export function HomeUI() {
  return (
    <>
      <h2 className="text-3xl font-bold tracking-wider text-light md:text-4xl lg:text-5xl">
        Seja bem vindo ao Eagle
      </h2>
      <Box className="mt-6 h-44 w-full max-w-xl pt-5 md:mt-10" radius="sm">
        <div className="mb-2 flex items-center gap-1">
          <StarIcon className="w-3 fill-primary" />
          <h3 className="text-base font-bold text-dark">
            Acesso Rápido à Frota
          </h3>
        </div>
        {links.map((link) => (
          <Link
            key={link.label}
            to={link.path}
            className="text-link my-0.5 pl-3 text-sm"
          >
            {link.label}
          </Link>
        ))}
      </Box>
    </>
  )
}
