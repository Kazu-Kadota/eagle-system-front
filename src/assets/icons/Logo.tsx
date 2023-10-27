import { tv, VariantProps } from 'tailwind-variants'

const classNames = tv({
  slots: {
    logo: 'aspect-[222/266]',
    title: 'text-dark font-black leading-none tracking-wide',
  },
  variants: {
    size: {
      sm: {
        logo: 'w-16',
        title: 'mt-0.5 text-base',
      },
      lg: {
        logo: 'w-56',
        title: 'mt-3 text-6xl',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

interface LogoProps extends VariantProps<typeof classNames> {}

export function Logo({ size }: LogoProps) {
  const { logo, title } = classNames({ size })

  return (
    <div className="flex flex-col items-center">
      <svg
        className={logo()}
        viewBox="0 0 222 266"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_i_2_581)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M119.53 128.939C134.968 126.301 161.159 129.345 161.159 143.415C164.541 142.975 179.496 138.118 181.966 128.621C185.026 116.856 163.824 102.067 159.151 98.808L159.029 98.7228L162.999 95.2054C147.868 74.2082 136.329 69.1243 122.342 62.9619C115.534 59.9624 108.146 56.7074 99.4821 51.2376C98.8727 50.9179 98.2586 50.6028 97.6417 50.2863C89.7752 46.2502 81.9237 40.9197 77.0155 23.7961L76.5487 21.9351C72.5789 31.7545 68.5175 54.8429 84.0439 63.9882C67.7236 71.4628 42.5814 85.5325 40.376 108.396C43.4636 104.439 53.2558 95.645 67.7236 92.1276C50.9621 102.68 37.553 141.899 50.9621 168.632C54.0498 155.002 61.019 138.294 65.9592 136.535C63.0186 156.321 66.3121 197.123 103.011 202.047C98.0118 198.09 88.7195 184.812 91.5424 163.355C95.8063 180.356 114.214 210.313 153.736 194.133C116.332 187.802 111.98 142.277 136.24 131.285L119.53 128.939ZM148.443 95.2054L130.799 79.377L136.975 92.5673L139.621 96.9641H144.914L148.443 95.2054Z"
            fill="url(#paint0_linear_2_581)"
          />
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.67871 2H220.671V168.809C206.013 237.116 153.244 238.289 112.494 263.794C79.0736 240.927 18.6821 240.927 1.67871 168.809V2ZM205.427 17.2444H18.6821H17.5095V168.809C23.3727 219.82 72.3308 224.217 112.494 247.67C152.071 220.992 198.977 222.458 205.427 168.809V17.2444Z"
          fill="currentFill"
          className="fill-dark"
          stroke="url(#paint1_linear_2_581)"
          strokeOpacity="0.5"
          strokeWidth="2.3453"
        />
        <defs>
          <filter
            id="filter0_i_2_581"
            x="40.376"
            y="21.9351"
            width="143.541"
            height="181.35"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="1.65002" dy="1.23751" />
            <feGaussianBlur stdDeviation="1.17265" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.570833 0 0 0 0 0.387263 0 0 0 0 0.0309201 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect1_innerShadow_2_581"
            />
          </filter>
          <linearGradient
            id="paint0_linear_2_581"
            x1="91.9513"
            y1="101.622"
            x2="170.484"
            y2="218.401"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop
              offset="1"
              stopColor="currentColor"
              stopOpacity="0.83"
              className="text-dark"
            />
          </linearGradient>
          <linearGradient
            id="paint1_linear_2_581"
            x1="1.67871"
            y1="2"
            x2="196.925"
            y2="213.663"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="currentColor" className="text-primary" />
            <stop
              offset="0.588542"
              stopColor="currentColor"
              className="text-primary"
              stopOpacity="0.45"
            />
            <stop
              offset="1"
              stopColor="currentColor"
              className="text-primary"
            />
          </linearGradient>
        </defs>
      </svg>
      <h1 className={title()}>EAGLE SYSTEM</h1>
    </div>
  )
}
