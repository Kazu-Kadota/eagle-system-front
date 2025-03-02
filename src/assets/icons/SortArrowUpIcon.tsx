import type { SvgIconProps } from '@/types/svg';

export function SortArrowUpIcon({ className }: SvgIconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="m280-400 200-200 200 200H280Z" />
    </svg>
  );
}
