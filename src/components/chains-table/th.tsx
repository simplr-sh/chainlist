import { cn } from '@/lib/utils'

type ThProps = {
  className?: string
  children?: React.ReactNode
  styles?: React.CSSProperties
}

export function Th({ className, styles, children }: ThProps) {
  return (
    <th
      style={{
        width: 200,
        padding: '16px 4px',
        background: 'hsl(var(--secondary))',
        ...styles,
      }}
      className={cn('border-r border-primary/25', className)}
    >
      {children}
    </th>
  )
}
