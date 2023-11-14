import { RouteObject } from 'react-router-dom'
import { UserType } from 'src/models'
import { AccessGuardLayout } from 'src/routes/layouts/AccessGuardLayout'
import { ReportHomePage } from './pages/ReportHome'
import { ReportRoutePaths } from './paths'

export const reportProtectedRoutes: RouteObject[] = [
  {
    element: (
      <AccessGuardLayout userTypes={[UserType.ADMIN, UserType.CLIENT]} />
    ),
    children: [
      {
        path: ReportRoutePaths.REPORT_HOME,
        element: <ReportHomePage />,
      },
    ],
  },
]
