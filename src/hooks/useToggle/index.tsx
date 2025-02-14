import { useCallback, useState } from 'react';

export function useToggle(
  initialValue?: boolean,
): [boolean, () => void, React.Dispatch<React.SetStateAction<boolean>>] {
  const [value, setValue] = useState(initialValue ?? false);

  const toggleValue = useCallback(() => setValue((current) => !current), []);

  return [value, toggleValue, setValue];
}
