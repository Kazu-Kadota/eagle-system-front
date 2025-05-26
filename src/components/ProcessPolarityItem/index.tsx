import { getPartInfo } from '@/app/(protected)/analises/pessoas/consultar/process-modal';
import { PersonIcon } from '@/assets/icons/PersonIcon';
import type { ProcessPart } from '@/models/process';
import { useMemo } from 'react';
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
      Ativo: {
        container: 'text-dark-purple',
      },
      Passivo: {
        container: 'text-error',
      },
      Neutro: {
        container: 'text-primary',
      },
      Desconhecido: {
        container: 'text-placeholder',
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
  const { polo, papel } = useMemo(
    () => getPartInfo(part?.detalhes_partes?.tipo_especifico ?? ''),
    [part],
  );
  const classNames = styles({ polarity: polo, size });

  return (
    <div className={classNames.container({ className })}>
      <PersonIcon className={classNames.icon()} />
      <p className={classNames.text()}>{papel}</p>
    </div>
  );
}
