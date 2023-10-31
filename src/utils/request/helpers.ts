import queryString from 'query-string'
import { RequestOptions } from './requestCreator'
import { useAuthStore } from 'src/store/auth'

export const constructHeaders = (options: RequestOptions) => {
  const headers: Record<string, string> = {}

  const token = useAuthStore.getState().jwtToken

  if (options.body) {
    headers['Content-Type'] = 'application/json'
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return headers
}

export const prepareBody = (options: RequestOptions) => {
  if (options.body) {
    return JSON.stringify(options.body)
  }

  return null
}

export const constructUrl = (
  hostname: string,
  endpoint: string,
  options: RequestOptions,
) => {
  const url = `${hostname}${endpoint}`

  if (options.query) {
    return queryString.stringifyUrl({ url, query: options.query })
  }

  return url
}

export const isBlobFile = (blob: Blob) => {
  const fileTypes = ['text/csv', 'application/pdf']

  return fileTypes.includes(blob.type)
}

export const hasTokenExpired = (status: number) => {
  return status === 401 && useAuthStore.getState().isLoggedIn
}
