import { ValueOf } from './utils'

export const MutationStatus = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
} as const

export type MutationStatus = ValueOf<typeof MutationStatus>
