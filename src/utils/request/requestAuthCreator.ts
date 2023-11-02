import { clearStorage } from '../logout'
import ApiError from './ApiError'
import { TokenExpiredError } from './TokenExpiredError'
import {
  constructAuthHeaders,
  constructUrl,
  isTokenNotAuthorized,
  prepareBody,
} from './helpers'
import { Method, RequestOptions } from './types'

const requestAuthCreator =
  (method: Method) =>
  async <T>(
    hostname: string,
    endpoint: string,
    options: RequestOptions = {},
  ) => {
    const res = await fetch(constructUrl(hostname, endpoint, options), {
      method,
      body: prepareBody(options),
      headers: constructAuthHeaders(options),
    })

    const data = await res.json()

    if (res.ok) {
      return { data: data as T, status: res.status }
    }

    if (isTokenNotAuthorized(res.status)) {
      clearStorage()
      throw new TokenExpiredError()
    }

    throw new ApiError(data)
  }

export default requestAuthCreator
