import { SvgIconProps } from '@/types/svg';

export function StarIcon({ className }: SvgIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      fill="none"
      className={className}
    >
      <path
        d="M6.00009 1L7.29109 4.4765L11.0001 4.6285L8.08909 6.9295L9.09009 10.5L6.00009 8.4455L2.91009 10.5L3.91109 6.9295L1.00009 4.6285L4.70909 4.4765L6.00009 1Z"
        fill="currentFill"
      />
    </svg>
  );
}
