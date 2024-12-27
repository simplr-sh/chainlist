import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'
import { Input } from './ui/input'

type NavbarProps = {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  return (
    <header
      className={cn(
        'flex items-center justify-between gap-4 p-4 sticky top-0 left-0 right-0',
        className
      )}
    >
      <Input placeholder="Search chains" />
      <ThemeToggle />
    </header>
  )
}
