import queryString from 'query-string'
import { useAuthStore } from 'src/store/auth'
import { RequestOptions } from './types'

export const constructHeaders = (options: RequestOptions) => {
  const headers: Record<string, string> = {}

  if (options.body) {
    headers['Content-Type'] = 'application/json'
  }

  return headers
}

export const constructAuthHeaders = (options: RequestOptions) => {
  const headers: Record<string, string> = constructHeaders(options)

  const token = useAuthStore.getState().jwtToken

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

export const isTokenNotAuthorized = (name: string, status: number) =>
  (status === 403 && name === 'Usuário não autenticado') || status === 498
