import { env } from 'src/config/env'
import { request } from 'src/utils/request'

type RecoveryPasswordSendBody = {
  email: string
}

const recoveryPasswordSend = async (body: RecoveryPasswordSendBody) => {
  await request.post(env.VITE_API_USER_URL, '/recovery-password', {
    body,
  })
}

export default recoveryPasswordSend
