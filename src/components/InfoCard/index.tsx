import { twJoin } from 'tailwind-merge';
import { tv, type VariantProps } from 'tailwind-variants';

type InfoProps = {
  label: string;
  value: string;
};

const styles = tv({
  slots: {
    title: 'border-b',
    content: 'flex flex-col',
    card: 'shadow-infoCard flex flex-col rounded-md',
  },
  variants: {
    variant: {
      default: {
        title:
          'border-line-light px-6 py-3 text-xl font-semibold text-dark sm:text-2xl',
        content: 'gap-3 px-6 pb-9 pt-6',
        card: 'bg-card',
      },
      accent: {
        title: 'border-card px-3 py-2 text-base font-bold text-card',
        content:
          'min-h-[5.4rem] gap-2 px-3 pb-5 pt-4 text-xs font-semibold text-card',
        card: 'bg-primary',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type InfoVariantProps = VariantProps<typeof styles>;

const { title, content, card } = styles();

export function InfoRow({ children }: React.PropsWithChildren) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

export function Info({ label, value }: InfoProps) {
  return (
    <p className="!leading-tight">
      <span className="text-sm font-bold text-dark">{label}: </span>
      <span className="text-xs font-light text-placeholder">{value}</span>
    </p>
  );
}

export function InfoTitle({
  children,
  variant,
}: React.PropsWithChildren<InfoVariantProps>) {
  return <h5 className={title({ variant })}>{children}</h5>;
}

export function InfoCol({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.ComponentPropsWithRef<'div'>>) {
  return (
    <div className={twJoin('flex flex-col gap-3', className)} {...props}>
      {children}
    </div>
  );
}

export function InfoContent({
  children,
  className,
  variant,
  ...props
}: React.PropsWithChildren<
  React.ComponentPropsWithRef<'div'> & InfoVariantProps
>) {
  return (
    <div className={content({ variant, className })} {...props}>
      {children}
    </div>
  );
}

export function InfoCard({
  children,
  variant,
  className,
  ...props
}: React.PropsWithChildren<
  React.ComponentPropsWithRef<'div'> & InfoVariantProps
>) {
  return (
    <div {...props} className={card({ variant, className })}>
      {children}
    </div>
  );
}
