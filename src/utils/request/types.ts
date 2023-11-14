import { Stringifiable } from 'query-string'

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface RequestOptions {
  body?: Record<string, unknown>
  query?: Record<string, Stringifiable>
}

export interface RequestDownloadOptions extends RequestOptions {
  fileName?: string
}
