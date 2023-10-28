export type ApiErrorType = {
  error?: {
    message: string
  }
  message?: string
  name?: string
}

export default class ApiError extends Error {
  data: ApiErrorType

  constructor(data: ApiErrorType) {
    super(data?.error?.message || data?.message || data?.name)
    this.data = data
  }
}
