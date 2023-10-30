import { VariantProps, tv } from 'tailwind-variants'

const style = tv({
  base: 'flex w-full flex-col bg-light px-5 pb-8 pt-6 sm:px-6',
  variants: {
    radius: {
      sm: 'rounded-sm',
      md: 'rounded-md',
    },
  },
})

type BoxProps = React.ComponentProps<'div'> & VariantProps<typeof style>

export function Box({ className, radius, ...rest }: BoxProps) {
  return <div className={style({ radius, className })} {...rest} />
}
