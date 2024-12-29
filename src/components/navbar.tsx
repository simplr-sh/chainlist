'use client'

import { cn } from '@/lib/utils'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { PlusIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
import { Input } from './ui/input'

type NavbarProps = {
  className?: string
  searchValue?: string
  onSearch?: (value: string) => void
}

export function Navbar({ className, searchValue, onSearch }: NavbarProps) {
  return (
    <header
      className={cn(
        'flex items-center bg-background/50 justify-between gap-2 p-4 sticky top-0 left-0 right-0',
        'z-20 backdrop-blur',
        className
      )}
    >
      <Link href="/" className="mr-4">
        <Image
          src="/logo.svg"
          alt="Chainlist"
          width={120}
          height={40}
          className="invert dark:invert-0"
        />
      </Link>
      <Input
        className="bg-secondary"
        placeholder="Search chains by name, short name, or chain ID"
        value={searchValue}
        onInput={(e) => {
          if (onSearch) {
            onSearch(e.currentTarget.value)
          }
        }}
      />
      <ThemeToggle />

      <a
        href="https://github.com/ethereum-lists/chains/pulls"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button size="icon" variant={'secondary'} className="shrink-0">
          <PlusIcon />
        </Button>
      </a>
      <a
        href="https://github.com/simplr-sh/chainlist"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button size="icon" variant={'secondary'} className="shrink-0">
          <Image
            src="/github.svg"
            alt="GitHub"
            width={24}
            height={24}
            className="dark:invert"
          />
        </Button>
      </a>

      <div className="shrink-0">
        <ConnectButton />
      </div>
    </header>
  )
}
