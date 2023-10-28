import queryString from 'query-string'
import { RequestOptions } from './requestCreator'

export const contructHeaders = (options: RequestOptions) => {
  const headers: Record<string, string> = {}

  if (options.body) {
    headers['Content-Type'] = 'application/json'
  }
  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`
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
