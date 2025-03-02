import { Spinner } from '@/components/Spinner';

export const LoadingContainer = () => (
  <div className="flex flex-1 items-center justify-center pb-7">
    <Spinner className="w-14 fill-light" />
  </div>
);
