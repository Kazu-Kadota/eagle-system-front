import { getFileName } from '../fileName'
import { clearStorage } from '../logout'
import ApiError from './ApiError'
import { TokenExpiredError } from './TokenExpiredError'
import {
  constructAuthHeaders,
  constructUrl,
  isTokenNotAuthorized,
  prepareBody,
} from './helpers'
import { Method, RequestDownloadOptions, RequestOptions } from './types'

export const requestAuthCreator =
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

export const requestDownloadAuthCreator =
  (method: Method) =>
  async (
    hostname: string,
    endpoint: string,
    options: RequestDownloadOptions = {},
  ) => {
    const res = await fetch(constructUrl(hostname, endpoint, options), {
      method,
      headers: constructAuthHeaders(options),
    })

    if (isTokenNotAuthorized(res.status)) {
      clearStorage()
      throw new TokenExpiredError()
    }

    if (!res.ok) {
      const data = await res.json()
      throw new ApiError(data)
    }

    const blobFile = await res.blob()
    const url = URL.createObjectURL(blobFile)

    const a = document.createElement('a')
    a.href = url
    a.download = options.fileName || getFileName(url) || 'download'

    const clickHandler = () => {
      setTimeout(() => {
        URL.revokeObjectURL(url)
        removeEventListener('click', clickHandler)
      }, 150)
    }

    a.addEventListener('click', clickHandler, false)
    a.click()
  }
