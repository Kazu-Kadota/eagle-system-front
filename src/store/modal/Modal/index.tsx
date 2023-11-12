import { memo } from 'react'
import { Button, Fade } from 'src/components'
import { useModalStore } from '..'

export const Modal = memo(() => {
  const { title, isOpen, disableOverlayClose, buttons, actions } =
    useModalStore()

  return (
    <Fade
      isVisible={isOpen}
      className="fixed inset-0 flex items-center justify-center pb-20"
    >
      <div
        className="fixed inset-0 bg-dark/80"
        onClick={!disableOverlayClose ? actions.close : undefined}
      />
      <div className="relative flex min-h-[14.25rem] w-[31.625rem] flex-col justify-center gap-12 bg-light">
        <h2 className="text-center text-4xl font-semibold text-dark">
          {title}
        </h2>
        <div className="flex items-center justify-center gap-3 px-7">
          {buttons.map(({ children, onClick, ...rest }) => (
            <Button
              key={children as string}
              size="sm"
              shadow="base"
              theme="accent"
              className="max-w-[18rem] flex-1"
              onClick={(e) => {
                onClick?.(e as never)
                actions.close()
              }}
              {...rest}
            >
              {children}
            </Button>
          ))}
        </div>
      </div>
    </Fade>
  )
})
