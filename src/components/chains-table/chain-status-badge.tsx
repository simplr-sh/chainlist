import { Badge } from '@/components/ui/badge'

type ChainStatusBadgeProps = {
  status: string
}

export function ChainStatusBadge({ status }: ChainStatusBadgeProps) {
  switch (status) {
    case 'active':
    case '-':
      return (
        <Badge variant="default" className="bg-green-400">
          Active
        </Badge>
      )
    case 'inactive':
      return <Badge variant="destructive">Inactive</Badge>
    case 'deprecated':
      return (
        <Badge variant="destructive" className="bg-red-400 text-black">
          Deprecated
        </Badge>
      )
    case 'incubating':
      return (
        <Badge variant="outline" className="bg-orange-400 text-black">
          Incubating
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}
