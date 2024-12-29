'use client'

import { ChainsTable } from '@/components/chains-table'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import type { Chain, ChainList } from '@/types/chain'
import Fuse from 'fuse.js'

import { useMemo, useState } from 'react'
import { useDebounce } from 'use-debounce'

export function ChainsListLayout({ chains }: { chains: ChainList }) {
  const [search, setSearch] = useState('')
  const [value] = useDebounce(search, 500)

  const fuse = useMemo(() => {
    return new Fuse<Chain>(chains, {
      shouldSort: true,
      threshold: 0.2,
      location: 0,
      distance: 50,
      minMatchCharLength: 2,
      keys: ['name', 'chainId', 'chain', 'shortName'],
      isCaseSensitive: false,
      includeScore: false,
      includeMatches: false,
    })
  }, [chains])

  const filteredChains = useMemo(
    () =>
      value ? (fuse.search(value).map((obj) => obj.item) as ChainList) : chains,
    [value, chains, fuse]
  )

  return (
    <main className="w-full min-h-screen">
      <Navbar searchValue={search} onSearch={setSearch} />
      <section className="w-full px-4">
        <div className="w-full relative border border-primary/25 rounded-lg overflow-hidden">
          <ChainsTable chainlist={filteredChains} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
