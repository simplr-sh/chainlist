'use client'

import { useAddChainMutation } from '@/hooks/use-add-chain-mutation'
import { takeRight, truncateAddress } from '@/lib/utils'
import type { ChainList } from '@/types/chain'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { CopyIcon, ExternalLinkIcon, Loader2Icon } from 'lucide-react'
import { Fragment, memo } from 'react'
import { TableVirtuoso } from 'react-virtuoso'
import { toast } from 'sonner'
import { useAccount } from 'wagmi'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { ChainStatusBadge } from './chain-status-badge'
import { Td } from './td'
import { Th } from './th'

export const ChainsTable = memo(({ chainlist }: { chainlist: ChainList }) => {
  const { address, isConnected } = useAccount()

  const { mutate, isPending } = useAddChainMutation()

  return (
    <TableVirtuoso
      style={{ height: '85vh' }}
      data={chainlist}
      components={{
        Table: ({ style, ...props }) => (
          <table
            {...props}
            style={{
              ...style,
              width: '100%',
              tableLayout: 'fixed',
              textAlign: 'center',
            }}
            className="text-xs sm:text-sm md:text-base"
          />
        ),
      }}
      fixedHeaderContent={() => (
        <tr className="border-b border-primary/25">
          <Th
            styles={{
              width: 250,
              left: 0,
            }}
            className="relative md:sticky"
          >
            Chain Name
          </Th>
          <Th
            styles={{
              width: 160,
            }}
          >
            Chain ID
          </Th>
          <Th>Add Chain</Th>
          <Th>Chain</Th>
          <Th>Info URL</Th>
          <Th>Currency Name</Th>
          <Th>Currency Symbol</Th>
          <Th>Currency Decimals</Th>
          <Th>SLIP44 Code</Th>
          <Th>Status</Th>
          <Th>Title</Th>
          <Th>Registry</Th>
          <Th>Faucets</Th>
          <Th>Features</Th>
          <Th>Network ID</Th>
          <Th>Red Flags</Th>
          <Th
            styles={{
              width: 800,
            }}
          >
            HTTPS & WSS RPC URLs
          </Th>
        </tr>
      )}
      itemContent={(index, chain) => (
        <Fragment key={chain.chainId}>
          <Td
            className="border-r border-primary/25 relative md:sticky"
            styles={{
              width: '250px',
              background: 'hsl(var(--secondary))',
              left: 0,
              // zIndex: 2,
            }}
          >
            <div className="w-full flex items-center justify-center gap-2 md:gap-3">
              <Avatar className="shrink-0 p-0 !rounded-sm w-10 md:w-12 h-10 md:h-12">
                <AvatarImage
                  src={chain.icon}
                  className="object-contain !rounded-sm"
                />
                <AvatarFallback className="font-bold !rounded-sm bg-primary/5">
                  {chain.chain.substring(0, 3).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="w-full shrink flex flex-col gap-0.5 sm:gap-1">
                <p className="text-left font-semibold leading-snug text-wrap w-full max-w-[90%] block">
                  {chain.name ?? '-'}
                </p>
                <p className="truncate text-sm text-left font-medium text-ellipsis w-[20ch]">
                  {chain.shortName ?? '-'}
                </p>
              </div>
            </div>
          </Td>
          <Td
            styles={{
              width: 160,
            }}
          >
            <span className="break-all w-[95%] text-sm mx-auto text-center truncate text-ellipsis block">
              #{chain.chainId}
            </span>
          </Td>
          <Td>
            <div className="flex items-center justify-center">
              {address && isConnected ? (
                <Button
                  type="button"
                  variant={'default'}
                  size={'sm'}
                  className="shrink-0"
                  onClick={() => mutate(chain)}
                  disabled={isPending}
                >
                  {isPending && (
                    <Loader2Icon className="w-4 h-4 mr-1 animate-spin" />
                  )}
                  {isPending ? 'Adding Chain...' : 'Add Chain'}
                </Button>
              ) : (
                <ConnectButton />
              )}
            </div>
          </Td>
          <Td>{chain.chain ?? '-'}</Td>
          <Td>
            {chain.infoURL && URL.canParse(chain.infoURL) ? (
              <a
                href={chain.infoURL}
                className="hover:underline underline-offset-4 inline-flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {takeRight(new URL(chain.infoURL).hostname.split('.'), 2).join(
                  '.'
                )}
                <ExternalLinkIcon className="w-3 h-3 shrink-0" />
              </a>
            ) : (
              '-'
            )}
          </Td>
          <Td>{chain.nativeCurrency.name ?? '-'}</Td>
          <Td>{chain.nativeCurrency.symbol ?? '-'}</Td>
          <Td>{chain.nativeCurrency.decimals ?? '-'}</Td>
          <Td>
            {chain.slip44 ? (
              <Badge variant="secondary">{chain.slip44}</Badge>
            ) : (
              '-'
            )}
          </Td>
          <Td>
            <ChainStatusBadge status={chain.status ?? '-'} />
          </Td>
          <Td>{chain.title ?? '-'}</Td>
          <Td>
            <a
              href={
                chain.explorers?.[0]?.url &&
                `${chain.explorers?.[0]?.url}/address/${chain.ens?.registry}`
              }
              className=""
              target="_blank"
              rel="noopener noreferrer"
            >
              {chain.ens?.registry ? (
                <div className="inline-flex items-center gap-1 hover:underline underline-offset-4">
                  {truncateAddress(chain.ens?.registry, 6)}
                  <ExternalLinkIcon className="w-3 h-3 shrink-0" />
                </div>
              ) : (
                '-'
              )}
            </a>
          </Td>
          <Td styles={{ width: 250 }}>
            <div className="flex flex-wrap gap-1">
              {chain.faucets.length ? (
                chain.faucets
                  .filter((_, i) => i < 2)
                  .map((faucet) => {
                    return (
                      <Badge
                        key={faucet}
                        variant={'secondary'}
                        className="text-left"
                      >
                        {new URL(faucet).hostname}&nbsp;
                        <CopyIcon
                          className="w-3 h-3 shrink-0 cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(faucet)
                            toast.success('Copied to clipboard')
                          }}
                        />
                        &nbsp;
                        <ExternalLinkIcon
                          className="w-3 h-3 shrink-0 cursor-pointer"
                          onClick={() => {
                            window.open(faucet, '_blank')
                          }}
                        />
                      </Badge>
                    )
                  })
              ) : (
                <span className="mx-auto">-</span>
              )}
            </div>
          </Td>
          <Td>
            <div className="flex flex-wrap gap-1 items-center justify-center">
              {chain.features?.map(({ name }) => {
                return (
                  <Badge key={name} variant={'secondary'}>
                    {name}
                  </Badge>
                )
              }) ?? '-'}
            </div>
          </Td>
          <Td className="font-medium">#{chain.networkId ?? '-'}</Td>
          <Td>
            {chain.redFlags?.map((flag) => {
              return (
                <Badge key="flag" variant={'destructive'}>
                  {flag}
                </Badge>
              )
            }) ?? 'N/A'}
          </Td>
          <Td styles={{ width: 800 }}>
            <div className="flex flex-wrap gap-1">
              {chain.rpc.map((url) => {
                const _url = new URL(url)
                return (
                  <Badge
                    key={url}
                    variant={
                      url.startsWith('https://') ? 'secondary' : 'outline'
                    }
                  >
                    <span className="p-0.5 px-1 bg-primary/75 text-secondary text-[10px] rounded-sm">
                      {_url.protocol.replace(':', '')}
                    </span>
                    &nbsp;&nbsp;
                    {takeRight(_url.hostname.split('.'), 2).join('.')}
                    &nbsp;&nbsp;
                    <CopyIcon
                      className="w-3 h-3 shrink-0 cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(url)
                        toast.success('Copied to clipboard')
                      }}
                    />
                  </Badge>
                )
              })}
            </div>
          </Td>
        </Fragment>
      )}
    />
  )
})

ChainsTable.displayName = 'ChainsTable'
