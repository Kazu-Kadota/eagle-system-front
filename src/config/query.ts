import { QueryClient, QueryCache } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { getErrorMsg } from 'src/utils/errors'

const queryCache = new QueryCache({
  onError: (error) => toast.error(getErrorMsg(error)),
})

export const queryClient = new QueryClient({ queryCache })
