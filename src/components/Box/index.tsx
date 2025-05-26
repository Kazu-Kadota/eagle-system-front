import { type VariantProps, tv } from 'tailwind-variants';

const style = tv({
  slots: {
    container: 'w-full bg-light',
    box: 'flex flex-col',
    title:
      'border-b border-b-line-light bg-light-gray px-4 py-2 text-2xl font-extrabold text-dark xl:text-3xl',
  },
  variants: {
    radius: {
      sm: { container: 'rounded-[0.1875rem]', title: 'rounded-t-[0.1875rem]' },
      md: { container: 'rounded-[0.3125rem]', title: 'rounded-t-[0.3125rem]' },
    },
    spacing: {
      sm: { box: 'px-3 pb-5 pt-4 sm:px-4' },
      md: { box: 'px-5 pb-8 pt-6 sm:px-6' },
    },
  },
  defaultVariants: {
    radius: 'md',
    spacing: 'md',
  },
});

type BoxProps = Omit<React.ComponentProps<'div'>, 'title'> &
  VariantProps<typeof style> & {
    title?: string | React.ReactNode;
    containerClassName?: string;
    titleClassName?: string;
  };

export function Box({
  containerClassName,
  className,
  radius,
  children,
  title,
  spacing,
  titleClassName,
  ...rest
}: BoxProps) {
  const {
    container: containerStyle,
    box: boxStyle,
    title: titleStyle,
  } = style({
    radius,
    spacing: title ? 'sm' : spacing,
    className,
  });

  return (
    <>
      <div
        className={containerStyle({ className: containerClassName })}
        {...rest}
      >
        {!!title && (
          <h2 className={titleStyle({ className: titleClassName })}>{title}</h2>
        )}
        <div className={boxStyle({ className })}>{children}</div>
      </div>
    </>
  );
}
