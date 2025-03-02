import { twJoin, twMerge, type ClassNameValue } from 'tailwind-merge';

export function cn(...classes: ClassNameValue[]) {
  return twJoin(...classes);
}

export function twCn(...classes: ClassNameValue[]) {
  return twMerge(...classes);
}
