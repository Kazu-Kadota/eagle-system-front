import { PersonIcon } from '@/assets/icons/PersonIcon';
import type { ProcessPart } from '@/models/process';
import { tv, type VariantProps } from 'tailwind-variants';

type Props = {
  part?: ProcessPart;
  className?: string;
};

const styles = tv({
  slots: {
    container: 'flex items-center',
    icon: '',
    text: 'font-semibold uppercase',
  },
  variants: {
    size: {
      sm: {
        container: 'gap-1',
        icon: 'w-3',
        text: 'text-sm',
      },
      xl: {
        container: 'gap-2',
        icon: 'w-4',
        text: 'text-xl',
      },
    },
    polarity: {
      ativo: {
        container: 'text-dark-purple',
      },
      passivo: {
        container: 'text-error',
      },
      neutro: {
        container: 'text-primary',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

export function ProcessPolarityItem({
  part,
  size,
  className,
}: Props & VariantProps<typeof styles>) {
  const classNames = styles({ polarity: part?.polaridade as never, size });

  return (
    <div className={classNames.container({ className })}>
      <PersonIcon className={classNames.icon()} />
      <p className={classNames.text()}>
        {
          {
            ativo: 'Autor',
            passivo: 'Réu',
            neutro: 'Neutro',
          }[part?.polaridade ?? '']
        }
      </p>
    </div>
  );
}
