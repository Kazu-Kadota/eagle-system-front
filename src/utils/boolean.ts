export const fromStringBoolean = (value: string) => value === 'true'

export const toStringBoolean = (value: boolean) => (value ? 'true' : 'false')

export const onChangeStringBoolean =
  (onChange: (value: boolean) => void) => (value: string) =>
    onChange(fromStringBoolean(value))
