export const MutationStatus = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
}

export type MutationStatus =
  (typeof MutationStatus)[keyof typeof MutationStatus]
