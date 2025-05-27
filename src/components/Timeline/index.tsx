import { DocumentCheckIcon } from '@/assets/icons/DocumentCheckIcon';
import dayjs from 'dayjs';

export type TimelineItem = { date: string; content: string[] };

type Props = {
  items: TimelineItem[];
};

export function Timeline({ items }: Props) {
  return (
    <div className="relative flex flex-col gap-6 overflow-y-auto">
      <div className="absolute inset-y-0 bottom-10 left-1/2 top-10 -translate-x-1/2 border-[3px] border-light-gray sm:left-44 sm:translate-x-0" />
      {items.map((item) => (
        <div
          key={item.date}
          className="relative flex flex-col items-center sm:flex-row"
        >
          <div className="absolute left-2 right-2 top-1/2 hidden -translate-y-1/2 border-[3px] border-light-gray sm:block" />

          <div className="shadow-infoCard relative m-2 flex min-h-16 w-36 flex-col items-center justify-center gap-0.5 border-[1.5px] border-card bg-primary text-center text-card">
            <p className="text-base/tight font-extrabold md:text-lg/tight">
              {dayjs(item.date, 'YYYY-MM-DD HH:MM:SS').format('DD/MM/YYYY')}
            </p>
            <p className="text-sm/tight font-normal uppercase md:text-base/tight">
              {dayjs(item.date, 'YYYY-MM-DD HH:MM:SS').format('dddd')}
            </p>
          </div>

          <div className="shadow-infoCard relative m-1 flex size-8 items-center justify-center rounded-full border-[1.5px] border-card bg-line-light">
            <DocumentCheckIcon className="size-5 text-primary" />
          </div>

          <div className="shadow-infoCard relative m-2 flex min-h-20 flex-1 flex-col justify-center gap-4 border-[1.5px] bg-card px-5 py-4 text-center text-sm/none font-medium text-primary sm:text-left sm:text-base/none md:text-lg/none">
            {item.content.map((text, index) => (
              <span key={text + index}>{text}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
