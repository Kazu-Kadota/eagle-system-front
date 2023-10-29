import { Stringifiable } from 'query-string'
import ApiError from './ApiError'
import { constructUrl, constructHeaders, prepareBody } from './helpers'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface RequestOptions {
  body?: Record<string, unknown>
  query?: Record<string, Stringifiable>
}

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

    if (!res.ok) {
      throw new ApiError(data)
    }

    return { data: data as T, status: res.status }
  }

export default requestCreator