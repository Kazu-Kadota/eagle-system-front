import type { SvgIconProps } from '@/types/svg';

export function SortArrowDownIcon({ className }: SvgIconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="M480-360 280-560h400L480-360Z" />
    </svg>
  );
}
