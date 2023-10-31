import { Stringifiable } from 'query-string'
import { clearStorage } from '../logout'
import ApiError from './ApiError'
import {
  constructHeaders,
  constructUrl,
  hasTokenExpired,
  prepareBody,
} from './helpers'

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

    if (res.ok) {
      return { data: data as T, status: res.status }
    }

    if (hasTokenExpired(res.status)) {
      clearStorage()
      throw new Error('Seu token expirou, faça login novamente.')
    }

    throw new ApiError(data)
  }

export default requestCreator
