export type WithToken<T extends object = object> = T & {
  token: string;
};
