import { Link as RRDLink, LinkProps as RRDLinkProps } from 'react-router-dom'
import { cn } from 'src/utils/classNames'

interface LinkProps extends RRDLinkProps {}

export function Link({ className, ...rest }: LinkProps) {
  return <RRDLink className={cn('hover:opacity-60', className)} {...rest} />
}
