import ApiError from './ApiError'
import { constructHeaders, constructUrl, prepareBody } from './helpers'
import { Method, RequestOptions } from './types'

const requestCreator =
  (method: Method) =>
  async <T>(
    hostname: string,
    endpoint: string,
    options: RequestOptions = {},
  ) => {
    const res = await fetch(constructUrl(hostname, endpoint, options), {
      method,
      body: prepareBody(options),
      headers: constructHeaders(options),
    })

    const data = await res.json()

    if (res.ok) {
      return { data: data as T, status: res.status }
    }

    throw new ApiError(data)
  }

export default requestCreator
