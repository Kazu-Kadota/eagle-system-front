import { useState } from 'react'
import { EyeHiddenIcon, EyeIcon } from 'src/assets/icons'
import { VariantProps, tv } from 'tailwind-variants'

const iconSlotsStyle = tv({
  slots: {
    containerIcon: 'outline-none hover:opacity-60',
    icon: 'fill-dark',
  },
  variants: {
    size: {
      sm: { containerIcon: 'px-1', icon: 'w-5' },
      md: { containerIcon: 'px-2', icon: 'w-6' },
      base: { containerIcon: 'px-3', icon: 'w-7' },
    },
  },
  defaultVariants: {
    size: 'base',
  },
})

interface PasswordInputProps
  extends Omit<React.ComponentProps<'input'>, 'size'>,
    VariantProps<typeof iconSlotsStyle> {}

export function PasswordInput({ size, ...props }: PasswordInputProps) {
  const [passwordShown, setPasswordShown] = useState(false)

  const { icon: iconStyle, containerIcon: containerIconStyle } = iconSlotsStyle(
    { size },
  )

  return (
    <>
      <input {...props} type={passwordShown ? 'text' : 'password'} />
      <button
        onClick={() => setPasswordShown(!passwordShown)}
        type="button"
        className={containerIconStyle()}
      >
        {passwordShown ? (
          <EyeHiddenIcon className={iconStyle()} />
        ) : (
          <EyeIcon className={iconStyle()} />
        )}
      </button>
    </>
  )
}
