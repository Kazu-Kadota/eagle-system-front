import { cn } from '@/utils/classNames';

interface SpinnerProps {
  className?: string;
}

export const Spinner = ({ className }: SpinnerProps) => (
  <svg
    viewBox="0 0 20 20"
    className={cn('animate-spin', className)}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10,1V3a7,7,0,1,1-7,7H1a9,9,0,1,0,9-9Z" fill="currentFill" />
  </svg>
);
