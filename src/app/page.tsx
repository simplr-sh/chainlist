import { ChainsListLayout } from '@/components/chains-list-layout'
import chains from '@/data/chains.json'

export default function Home() {
  return <ChainsListLayout chains={chains} />
}
