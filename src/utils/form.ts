import type { FieldValues, UseFormHandleSubmit } from 'react-hook-form';

export const submitFormPromise = <T extends FieldValues>(
  handleSubmit: UseFormHandleSubmit<T>,
) =>
  new Promise<T | null>((resolve) =>
    handleSubmit(resolve, () => resolve(null))(),
  );
