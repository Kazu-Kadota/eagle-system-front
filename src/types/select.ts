export interface SelectItem<T = string> {
  label: string;
  value: T;
  type?: 'success' | 'error' | 'default';
}
