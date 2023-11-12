export function InputRow({ children }: React.PropsWithChildren) {
  return (
    <fieldset className="flex flex-col gap-3 sm:gap-4 xl:flex-row">
      {children}
    </fieldset>
  )
}
