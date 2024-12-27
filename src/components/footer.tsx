import { cn } from '@/lib/utils'

type FooterProps = {
  className?: string
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        'flex items-center justify-center gap-4 p-4 bg-secondary mt-6',
        className
      )}
    >
      <p>Chainlist by Simplr.sh</p>
    </footer>
  )
}
