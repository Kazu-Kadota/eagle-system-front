import { QueryClient, QueryCache } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { getErrorMsg } from 'src/utils/errors'

const queryCache = new QueryCache({
  onError: (error) => {
    const message = getErrorMsg(error)
    return toast.error(message, { toastId: message })
  },
})

export const queryClient = new QueryClient({ queryCache })
