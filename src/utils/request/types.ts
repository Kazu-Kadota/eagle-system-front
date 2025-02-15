import { type Stringifiable } from 'query-string';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface RequestOptions {
  body?: Record<string, unknown>;
  query?: Record<string, Stringifiable>;
  token?: string;
}

export interface RequestDownloadOptions extends RequestOptions {
  fileName?: string;
}
