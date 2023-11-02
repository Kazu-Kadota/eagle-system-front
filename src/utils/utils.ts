export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const padNumber = (value: number) => String(value).padStart(2, '0');
