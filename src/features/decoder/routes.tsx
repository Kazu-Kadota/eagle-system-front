import { RouteObject } from 'react-router-dom'
import { Base64DecordPage } from 'src/features/decoder/pages/Base64Decoder'
import { DecoderPaths } from 'src/features/decoder/paths'
import { UserType } from 'src/models'
import { AccessGuardLayout } from 'src/routes/layouts/AccessGuardLayout'

export const decoderProtectedRoutes: RouteObject[] = [
  {
    element: (
      <AccessGuardLayout userTypes={[UserType.ADMIN, UserType.CLIENT]} />
    ),
    children: [
      {
        path: DecoderPaths.BASE_64_DECODER,
        element: <Base64DecordPage />,
      },
    ],
  },
]
