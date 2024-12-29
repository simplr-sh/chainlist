import { cn } from '@/lib/utils'

type TdProps = {
  className?: string
  children?: React.ReactNode
  styles?: React.CSSProperties
}

export function Td({ className, styles, children }: TdProps) {
  return (
    <td
      style={{
        width: 200,
        padding: '6px',
        ...styles,
      }}
      className={cn('break-all text-wrap', className)}
    >
      {children}
    </td>
  )
}
