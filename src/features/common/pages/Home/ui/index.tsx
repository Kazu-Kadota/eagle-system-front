import { Navigate } from 'react-router-dom'
import { RoutePaths } from 'src/routes/paths'

export function HomeUI() {
  return <Navigate to={RoutePaths.Auth.LOGIN} />
}
