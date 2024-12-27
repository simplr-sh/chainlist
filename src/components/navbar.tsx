'use client'

import { cn } from '@/lib/utils'
import { GithubIcon, PlusIcon } from 'lucide-react'
import Image from 'next/image'
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
        'flex items-center bg-background/50 justify-between gap-4 p-4 sticky top-0 left-0 right-0',
        'z-20 backdrop-blur',
        className
      )}
    >
      <Image
        src="/logo.svg"
        alt="Chainlist"
        width={120}
        height={40}
        className="invert dark:invert-0"
      />
      <Input
        placeholder="Search chains"
        value={searchValue}
        onInput={(e) => {
          if (onSearch) {
            onSearch(e.currentTarget.value)
          }
        }}
      />
      <ThemeToggle />
      <Button size="icon" variant={'outline'} className="shrink-0">
        <PlusIcon />
      </Button>
      <Button size="icon" variant={'outline'} className="shrink-0">
        <GithubIcon />
      </Button>
      <Button variant={'outline'} className="shrink-0">
        Connect Wallet
      </Button>
    </header>
  )
}
