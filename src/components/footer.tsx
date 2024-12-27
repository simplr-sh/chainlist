import { cn } from '@/lib/utils'

type FooterProps = {
  className?: string
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        'flex items-center justify-between gap-4 p-4 sticky top-0 left-0 right-0',
        className
      )}
    >
      <p>Chainlist by Simplr.sh</p>
    </footer>
  )
}
