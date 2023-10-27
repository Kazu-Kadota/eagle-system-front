import { useState } from 'react'
import { EyeHiddenIcon, EyeIcon } from 'src/assets/icons'

export function PasswordInput(props: React.ComponentProps<'input'>) {
  const [passwordShown, setPasswordShown] = useState(false)

  return (
    <>
      <input {...props} type={passwordShown ? 'text' : 'password'} />
      <button
        onClick={() => setPasswordShown(!passwordShown)}
        type="button"
        className="px-3 outline-none hover:opacity-60"
      >
        {passwordShown ? (
          <EyeHiddenIcon className="fill-dark w-7" />
        ) : (
          <EyeIcon className="fill-dark w-7" />
        )}
      </button>
    </>
  )
}
