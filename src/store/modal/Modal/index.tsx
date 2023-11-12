import { memo } from 'react'
import { Button, Fade } from 'src/components'
import { useModalStore } from '..'

export const Modal = memo(() => {
  const { title, isOpen, buttons, actions } = useModalStore()

  return (
    <Fade
      isVisible={isOpen}
      className="fixed inset-0 flex items-center justify-center pb-20"
    >
      <div className="fixed inset-0 bg-dark/80" onClick={actions.close} />
      <div className="relative flex min-h-[14.25rem] w-[31.625rem] flex-col justify-center gap-12 bg-light">
        <h2 className="text-center text-4xl font-semibold text-dark">
          {title}
        </h2>
        <div className="grid grid-cols-2 items-center gap-3 px-7">
          {buttons.map(({ children, onClick, ...rest }) => (
            <Button
              key={children as string}
              size="sm"
              shadow="base"
              theme="accent"
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
