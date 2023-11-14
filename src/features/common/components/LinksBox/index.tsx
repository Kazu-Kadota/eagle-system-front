import { StarIcon } from 'src/assets/icons/StartIcon'
import { Box, Link } from 'src/components'
import { cn } from 'src/utils/classNames'

export interface LinkBoxItem {
  label: string
  path: string
}

interface LinksBoxProps {
  title: string
  links: LinkBoxItem[]
}

export function LinksBox({ title, links }: LinksBoxProps) {
  return (
    <Box
      spacing="sm"
      containerClassName={cn(
        'max-w-lg',
        links.length > 1 ? ' min-h-[11rem]' : 'min-h-[7rem]',
      )}
      radius="sm"
    >
      <div className="mb-2 flex items-center gap-1">
        <StarIcon className="w-7 fill-primary" />
        <h3 className="text-2xl font-bold text-dark">{title}</h3>
      </div>
      {links.map((link) => (
        <Link
          key={link.label}
          to={link.path}
          className="mt-1 pl-3 text-base text-link"
        >
          {link.label}
        </Link>
      ))}
    </Box>
  )
}
