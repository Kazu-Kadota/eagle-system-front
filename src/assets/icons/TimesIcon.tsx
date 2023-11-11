import { SvgIconProps } from 'src/types/svg'

export function TimesIcon({ className }: SvgIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 27 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 27L25.5 2M25.5 27L2 2"
        stroke="currentFill"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
