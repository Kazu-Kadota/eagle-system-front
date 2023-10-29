import { useEffect, useRef, useState } from 'react'

type Canceller = { id?: number }
type Stage = 'from' | 'enter' | 'leave'

function setAnimationFrameTimeout(callback: () => void, timeout: number = 0) {
  const startTime = performance.now()
  const canceller: Canceller = {}

  const call = () => {
    canceller.id = requestAnimationFrame((now) => {
      if (now - startTime > timeout) callback()
      else call()
    })
  }

  call()

  return canceller
}

const clearAnimationFrameTimeout = (canceller: Canceller) =>
  canceller.id && cancelAnimationFrame(canceller.id)

export function useTransition(state: boolean, timeout: number) {
  const [stage, setStage] = useState<Stage>(state ? 'enter' : 'from')

  const timer = useRef<Canceller>({})
  const [shouldMount, setShouldMount] = useState(state)

  useEffect(() => {
    clearAnimationFrameTimeout(timer.current)

    if (state) {
      setStage('from')
      setShouldMount(true)
      timer.current = setAnimationFrameTimeout(() => {
        setStage('enter')
      })
    } else {
      setStage('leave')
      timer.current = setAnimationFrameTimeout(() => {
        setShouldMount(false)
      }, timeout)
    }

    return () => {
      clearAnimationFrameTimeout(timer.current)
    }
  }, [state, timeout])

  return { stage, shouldMount }
}
