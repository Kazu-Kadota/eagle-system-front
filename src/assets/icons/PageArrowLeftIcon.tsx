import { SvgIconProps } from 'src/types/svg'

export function PageArrowLeftIcon({ className }: SvgIconProps) {
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
        d="M5 1L1 5L5 9"
        stroke="currentStroek"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 2L5 5L8 8"
        stroke="currentStroek"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
