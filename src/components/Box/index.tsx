import { VariantProps, tv } from 'tailwind-variants'

const style = tv({
  slots: {
    container: 'w-full overflow-hidden bg-light',
    box: 'flex flex-col px-5 pb-8',
  },
  variants: {
    radius: {
      sm: { container: 'rounded-[0.1875rem]' },
      md: { container: 'rounded-[0.3125rem]' },
    },
    hasTitle: {
      true: { box: 'pt-4' },
      false: { box: 'pt-6 sm:px-6' },
    },
  },
  defaultVariants: {
    radius: 'md',
    hasTitle: false,
  },
})

type BoxProps = React.ComponentProps<'div'> &
  VariantProps<typeof style> & {
    containerClassName?: string
  }

export function Box({
  containerClassName,
  className,
  radius,
  children,
  title,
  ...rest
}: BoxProps) {
  const { container, box } = style({ radius, hasTitle: !!title, className })

  return (
    <>
      <div className={container({ className: containerClassName })} {...rest}>
        {!!title && (
          <h2 className="border-b border-b-line-light bg-light-gray px-4 py-2 text-3xl font-extrabold text-dark">
            {title}
          </h2>
        )}
        <div className={box({ className })}>{children}</div>
      </div>
    </>
  )
}
