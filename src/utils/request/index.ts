import {
  requestAuthCreator,
  requestDownloadAuthCreator,
} from './requestAuthCreator';
import requestCreator from './requestCreator';

export const request = {
  get: requestCreator('GET'),
  post: requestCreator('POST'),
  put: requestCreator('PUT'),
  delete: requestCreator('DELETE'),
};

export const requestAuth = {
  get: requestAuthCreator('GET'),
  post: requestAuthCreator('POST'),
  put: requestAuthCreator('PUT'),
  delete: requestAuthCreator('DELETE'),
};

export const requestDownloadAuth = {
  get: requestDownloadAuthCreator('GET'),
  post: requestDownloadAuthCreator('POST'),
};
