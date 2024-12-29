'use client'

import { config } from '@/components/rainbowkit-provider'
import { truncateAddress } from '@/lib/utils'
import type { Chain, ChainList } from '@/types/chain'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useMutation } from '@tanstack/react-query'
import { getWalletClient } from '@wagmi/core'
import { CopyIcon, ExternalLinkIcon, Loader2Icon } from 'lucide-react'
import { Fragment, memo } from 'react'
import { TableVirtuoso } from 'react-virtuoso'
import { toast } from 'sonner'
import { useAccount } from 'wagmi'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { ChainStatusBadge } from './chain-status-badge'

const takeRight = (arr: string[], qty = 1) => [...arr].splice(-qty, qty)

export const ChainsTable = memo(({ chainlist }: { chainlist: ChainList }) => {
  const { address, isConnected } = useAccount()

  const { mutate, isPending } = useMutation({
    mutationFn: async (chain: Chain) => {
      const client = await getWalletClient(config)

      client.addChain({
        chain: {
          name: chain.name,
          id: chain.chainId,
          nativeCurrency: {
            name: chain.nativeCurrency.name,
            symbol: chain.nativeCurrency.symbol,
            decimals: chain.nativeCurrency.decimals,
          },
          rpcUrls: {
            default: {
              http: chain.rpc,
            },
          },
          blockExplorers: {
            default: {
              name: 'Block Explorer',
              url: chain.explorers?.[0]?.url ?? '',
            },
          },
        },
      })
    },
    onSuccess: () => {
      toast.success('Chain added successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

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
          <th
            style={{
              width: 250,
              padding: '16px 10px',
              background: 'hsl(var(--secondary))',
              left: 0,
              zIndex: 10,
            }}
            className="border-r border-primary/25 relative md:sticky"
          >
            Name
          </th>
          <th
            style={{
              width: 160,
              padding: '16px 4px',
              background: 'hsl(var(--secondary))',
            }}
            className="border-r border-primary/25"
          >
            Chain ID
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '16px 4px',
            }}
            className="border-r border-primary/25"
          >
            Add Chain
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '16px 4px',
            }}
            className="border-r border-primary/25"
          >
            Chain
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '16px 4px',
            }}
            className="border-r border-primary/25"
          >
            Info URL
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '16px 4px',
            }}
            className="border-r border-primary/25"
          >
            Currency Name
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '16px 4px',
            }}
            className="border-r border-primary/25"
          >
            Currency Symbol
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '16px 4px',
            }}
            className="border-r border-primary/25"
          >
            Currency Decimals
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '16px 4px',
            }}
            className="border-r border-primary/25"
          >
            SLIP44 Code
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '16px 4px',
            }}
            className="border-r border-primary/25"
          >
            Status
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '16px 4px',
            }}
            className="border-r border-primary/25"
          >
            Title
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '16px 4px',
            }}
            className="border-r border-primary/25"
          >
            Registry
          </th>
          <th
            style={{
              width: 250,
              background: 'hsl(var(--secondary))',
              padding: '16px 4px',
            }}
            className="border-r border-primary/25"
          >
            Faucets
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '16px 4px',
            }}
            className="border-r border-primary/25"
          >
            Features
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '16px 4px',
            }}
            className="border-r border-primary/25"
          >
            Network ID
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '16px 4px',
            }}
            className="border-r border-primary/25"
          >
            Red Flags
          </th>
          <th
            style={{
              width: 800,
              background: 'hsl(var(--secondary))',
              padding: '16px 4px',
            }}
            className="border-r border-primary/25"
          >
            HTTPS & WSS RPC URLs
          </th>
        </tr>
      )}
      itemContent={(index, chain) => (
        <Fragment key={chain.chainId}>
          <td
            className="border-r border-primary/25 relative md:sticky"
            style={{
              width: '250px',
              padding: '6px 4px',
              background: 'hsl(var(--secondary))',
              zIndex: 10,
              left: 0,
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
          </td>
          <td
            className="break-all"
            style={{
              width: 160,
              padding: '6px 4px',
            }}
          >
            <span className="break-all w-[95%] text-sm mx-auto text-center truncate text-ellipsis block">
              #{chain.chainId}
            </span>
          </td>
          <td style={{ width: 200, padding: '6px 4px' }}>
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
          </td>
          <td style={{ width: 200, padding: '6px 4px' }}>
            {chain.chain ?? '-'}
          </td>
          <td
            style={{ width: 200, padding: '6px 4px', textWrap: 'wrap' }}
            className="break-all"
          >
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
          </td>
          <td style={{ width: 200, padding: '6px 4px' }} className="text-wrap">
            {chain.nativeCurrency.name ?? '-'}
          </td>
          <td style={{ width: 200, padding: '6px 4px' }} className="break-all">
            {chain.nativeCurrency.symbol ?? '-'}
          </td>
          <td style={{ width: 200, padding: '6px 4px' }} className="break-all">
            {chain.nativeCurrency.decimals ?? '-'}
          </td>
          <td style={{ width: 200, padding: '6px 4px' }} className="break-all">
            {chain.slip44 ? (
              <Badge variant="secondary">{chain.slip44}</Badge>
            ) : (
              '-'
            )}
          </td>
          <td style={{ width: 200, padding: '6px 4px' }} className="break-all">
            <ChainStatusBadge status={chain.status ?? '-'} />
          </td>
          <td style={{ width: 200, padding: '6px 4px' }} className="text-wrap">
            {chain.title ?? '-'}
          </td>
          <td style={{ width: 200, padding: '6px 4px' }} className="break-all">
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
          </td>
          <td style={{ width: 250, padding: '6px 4px' }} className="">
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
          </td>
          <td style={{ width: 200, padding: '6px 4px' }} className="break-all">
            <div className="flex flex-wrap gap-1 items-center justify-center">
              {chain.features?.map(({ name }) => {
                return (
                  <Badge key={name} variant={'secondary'}>
                    {name}
                  </Badge>
                )
              }) ?? '-'}
            </div>
          </td>
          <td
            style={{ width: 200, padding: '6px 4px' }}
            className="break-all font-medium"
          >
            #{chain.networkId ?? '-'}
          </td>
          <td style={{ width: 200, padding: '6px 4px' }} className="break-all">
            {chain.redFlags?.map((flag) => {
              return (
                <Badge key="flag" variant={'destructive'}>
                  {flag}
                </Badge>
              )
            }) ?? 'N/A'}
          </td>
          <td style={{ width: 800, padding: '6px 4px' }} className="break-all">
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
          </td>
        </Fragment>
      )}
    />
  )
})

ChainsTable.displayName = 'ChainsTable'
