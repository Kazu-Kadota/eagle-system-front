export type WithToken<T extends object = {}> = T & {
  token: string;
};
