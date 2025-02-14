import { SvgIconProps } from '@/types/svg';

export function PageArrowRightIcon({ className }: SvgIconProps) {
  return (
    <svg
      width="9"
      height="10"
      viewBox="0 0 9 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 1L8 5L4 9"
        stroke="currentStroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 2L4 5L1 8"
        stroke="currentStroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
