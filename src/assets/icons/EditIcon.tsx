import { SvgIconProps } from '@/types/svg';

export function EditIcon({ className }: SvgIconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M17.4351 1.51903L18.4886 2.57212C18.8211 2.90654 19.0078 3.35893 19.0078 3.83047C19.0078 4.30201 18.8211 4.7544 18.4886 5.08882L9.2934 14.281C9.12711 14.4459 8.90268 14.5388 8.66848 14.5398H5.46356V11.3359C5.46455 11.1018 5.55753 10.8775 5.72246 10.7112L14.9176 1.51903C15.2522 1.1866 15.7047 1 16.1764 1C16.6481 1 17.1006 1.1866 17.4351 1.51903V1.51903Z"
        stroke="currentStroke"
        strokeWidth="1.14574"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.962 11.8624V17.2171C17.962 17.6905 17.7739 18.1445 17.439 18.4792C17.1042 18.814 16.65 19.002 16.1765 19.002H2.78547C2.31193 19.002 1.85779 18.814 1.52295 18.4792C1.18811 18.1445 1 17.6905 1 17.2171V3.83043C1 3.35704 1.18811 2.90305 1.52295 2.56832C1.85779 2.23358 2.31193 2.04553 2.78547 2.04553H8.14188"
        stroke="currentStroke"
        strokeWidth="1.14574"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
