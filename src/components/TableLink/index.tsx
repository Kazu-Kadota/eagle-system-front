import { copyString } from 'src/utils/clipboard'

interface TableLinkProps {
  text: string
  placeholder?: string
  successMsg: string
}

export function TableLink({ text, placeholder, successMsg }: TableLinkProps) {
  return (
    <span
      onClick={(e) => {
        e.stopPropagation()
        copyString(text, { successMsg })
      }}
      title={placeholder}
      className="cursor-pointer truncate px-1 text-xs hover:underline"
    >
      {text}
    </span>
  )
}
