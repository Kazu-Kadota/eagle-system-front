import { Button } from 'src/components'
import { RoutePaths } from 'src/routes/paths'

export function AccessDeniedUI() {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center px-3 pb-[20vh]">
      <div className="fixed inset-0 bg-dark/60" />
      <div className="relative flex max-w-lg flex-col items-center justify-center gap-12 bg-light px-4 py-8">
        <h2 className="whitespace-pre-line text-center text-3xl font-semibold leading-tight text-dark">
          Acesso negado, você não tem permissão para acessar esta
          funcionalidade.
        </h2>
        <Button
          to={RoutePaths.Common.HOME}
          replace
          theme="accent"
          className="mb-2 min-w-[18rem]"
        >
          Ir para página inicial
        </Button>
      </div>
    </div>
  )
}
