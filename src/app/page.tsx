import { ChainsTable } from '@/components/chains-table'
import chains from '@/data/chains.json'

export default function Home() {
  return (
    <main className="w-full px-4">
      <div className="w-full relative overflow-x-auto border border-secondary rounded-lg overflow-hidden">
        <ChainsTable chainlist={chains} />
      </div>
    </main>
  )
}
