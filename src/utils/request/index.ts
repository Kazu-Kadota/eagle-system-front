import requestCreator from './requestCreator'

export const request = {
  get: requestCreator('GET'),
  post: requestCreator('POST'),
  put: requestCreator('PUT'),
  delete: requestCreator('DELETE'),
}
