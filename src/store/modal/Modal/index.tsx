import { TimesIcon } from '@/assets/icons/TimesIcon';
import { Button } from '@/components/Button';
import { Clickable } from '@/components/Clickable';
import { Fade } from '@/components/Fade';
import { useModalStore } from '@/store/modal/store';
import { memo } from 'react';

export const Modal = memo(() => {
  const {
    title,
    isOpen,
    disableOverlayClose,
    buttons,
    content,
    showCloseIcon,
    actions,
  } = useModalStore();

  const renderDefaultContent = () => (
    <>
      <h2 className="whitespace-pre-line text-center text-3xl font-semibold leading-tight text-dark">
        {title}
      </h2>
      <div className="flex items-center justify-center gap-3 px-7">
        {!!buttons &&
          buttons.map(({ children, onClick, ...rest }) => (
            <Button
              key={children as string}
              size="sm"
              shadow="base"
              theme="accent"
              className="max-w-[18rem] flex-1"
              onClick={(e) => {
                onClick?.(e as never);
                actions.close();
              }}
              {...rest}
            >
              {children}
            </Button>
          ))}
      </div>
    </>
  );

  return (
    <Fade
      isVisible={isOpen}
      className="fixed inset-0 z-30 flex items-center justify-center px-3 pb-[20vh]"
    >
      <div
        className="fixed inset-0 bg-dark/80"
        onClick={!disableOverlayClose ? actions.close : undefined}
      />
      <div className="relative flex min-h-[14.25rem] w-full flex-col justify-center gap-11 bg-light pb-1 sm:w-[31.625rem]">
        {content || renderDefaultContent()}
        {showCloseIcon && (
          <Clickable
            className="absolute right-0 top-1 z-20 self-end p-2"
            onClick={actions.close}
          >
            <TimesIcon className="z-10 w-4 fill-dark" />
          </Clickable>
        )}
      </div>
    </Fade>
  );
});

Modal.displayName = 'Modal';
