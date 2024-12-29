import { cn } from '@/lib/utils'
import Image from 'next/image'

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
      <div className="flex items-center justify-between w-full max-w-screen-lg mx-auto">
        <p className="font-bold">
          Chainlist by{' '}
          <a
            href="https://github.com/simplr-sh"
            className="underline underline-offset-4"
          >
            Simplr.sh
          </a>
          &nbsp;&nbsp; | &nbsp;2024
        </p>

        <div className="flex items-center gap-8">
          <a href="https://simplr.sh" target="_blank" rel="noopener noreferrer">
            <Image
              src={'/github.svg'}
              alt="GitHub"
              width={24}
              height={24}
              className="dark:invert"
            />
          </a>
          <a
            href="https://x.com/SimplrSh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={'/twitter.svg'}
              alt="Twitter"
              width={24}
              height={24}
              className="dark:invert"
            />
          </a>
          <a
            href="https://medium.com/@simplr.sh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={'/medium.svg'}
              alt="Medium"
              width={24}
              height={24}
              className="dark:invert"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
