import { memo } from 'react'
import { Button } from 'src/components'
import { useTransition } from 'src/hooks'
import { cn } from 'src/utils/classNames'
import { useModalStore } from '..'

const transitionDuration = 150

export const Modal = memo(() => {
  const { title, isOpen, buttons, actions } = useModalStore()
  const { shouldMount, stage } = useTransition(isOpen, transitionDuration)

  if (!shouldMount) {
    return null
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center transition-opacity',
        stage === 'enter' ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div className="fixed inset-0 bg-dark/80" onClick={actions.close} />
      <div className="flex min-h-[31.625rem] w-[14.25rem] flex-col justify-center gap-12 bg-light">
        <h2 className="text-center text-4xl font-semibold text-dark">
          {title}
        </h2>
        <div className="grid grid-cols-2 items-center gap-3">
          {buttons.map((button) => (
            <Button {...button} key={button.children as string} />
          ))}
        </div>
      </div>
    </div>
  )
})
