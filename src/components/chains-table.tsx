'use client'

import { truncateAddress } from '@/lib/utils'
import type { ChainList } from '@/types/chain'
import { CopyIcon, ExternalLinkIcon } from 'lucide-react'
import { memo } from 'react'
import { TableVirtuoso } from 'react-virtuoso'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

const takeRight = (arr: string[], qty = 1) => [...arr].splice(-qty, qty)

export const ChainsTable = memo(({ chainlist }: { chainlist: ChainList }) => {
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
              fontSize: 14,
              tableLayout: 'fixed',
              textAlign: 'center',
            }}
            className="font-medium"
          />
        ),
      }}
      fixedHeaderContent={() => (
        <tr className="border-b border-primary/25">
          <th
            style={{
              width: 120,
              padding: '10px',
              background: 'hsl(var(--secondary))',
              position: 'sticky',
              left: 0,
              zIndex: 1,
            }}
            // className="border-r border-primary/25"
          >
            Chain ID
          </th>
          <th
            style={{
              width: 250,
              padding: '10px',
              background: 'hsl(var(--secondary))',
              position: 'sticky',
              left: 120,
              zIndex: 1,
            }}
            className="border-r border-primary/25"
          >
            Name
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
            className="border-r border-primary/25"
          >
            Short Name
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
            className="border-r border-primary/25"
          >
            Info URL
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
            className="border-r border-primary/25"
          >
            Currency Name
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
            className="border-r border-primary/25"
          >
            Currency Symbol
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
            className="border-r border-primary/25"
          >
            Currency Decimals
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
            className="border-r border-primary/25"
          >
            SLIP44 Code
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
            className="border-r border-primary/25"
          >
            Status
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
            className="border-r border-primary/25"
          >
            Title
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
            className="border-r border-primary/25"
          >
            Registry
          </th>
          <th
            style={{
              width: 250,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
            className="border-r border-primary/25"
          >
            Faucets
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
            className="border-r border-primary/25"
          >
            Features
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
            className="border-r border-primary/25"
          >
            Network ID
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
            className="border-r border-primary/25"
          >
            Red Flags
          </th>
          <th
            style={{
              width: 400,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
            className="border-r border-primary/25"
          >
            HTTPS RPC URLs
          </th>
          <th
            style={{
              width: 400,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
          >
            WSS RPC URLs
          </th>
        </tr>
      )}
      itemContent={(index, chain) => (
        <>
          <td
            // className="border-b border-r border-primary/25"
            style={{
              width: 120,
              padding: '10px',
              background: 'hsl(var(--secondary))',
              position: 'sticky',
              left: 0,
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            #{chain.chainId}
          </td>
          <td
            className="border-r border-primary/25"
            style={{
              width: '250px !important',
              padding: '10px',
              background: 'hsl(var(--secondary))',
              position: 'sticky',
              left: 120,
            }}
          >
            <div className="w-full flex items-center justify-center gap-2">
              <Avatar className="shrink-0 border border-primary/25 p-1 !rounded-sm bg-primary/5 w-12 h-12">
                <AvatarImage
                  src={chain.icon}
                  className="object-contain !rounded-sm"
                />
                <AvatarFallback className="font-bold !rounded-sm !bg-transparent">
                  {chain.chain.substring(0, 3).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="w-full shrink flex flex-col gap-0.5">
                <p className="text-left font-bold leading-snug">
                  {chain.name ?? '-'}
                </p>
                <p className="truncate text-left font-medium text-ellipsis w-[20ch]">
                  {chain.chain ?? '-'}
                </p>
              </div>
            </div>
          </td>
          <td style={{ width: 200, padding: '10px' }}>
            {chain.shortName ?? '-'}
          </td>
          <td
            style={{ width: 200, padding: '10px', textWrap: 'wrap' }}
            className="break-all"
          >
            {chain.infoURL && URL.canParse(chain.infoURL) ? (
              <a
                href={chain.infoURL}
                className="hover:underline underline-offset-4 inline-flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {new URL(chain.infoURL).hostname}
                <ExternalLinkIcon className="w-3 h-3 shrink-0" />
              </a>
            ) : (
              '-'
            )}
          </td>
          <td style={{ width: 200, padding: '10px' }} className="text-wrap">
            {chain.nativeCurrency.name ?? '-'}
          </td>
          <td style={{ width: 200, padding: '10px' }} className="break-all">
            {chain.nativeCurrency.symbol ?? '-'}
          </td>
          <td style={{ width: 200, padding: '10px' }} className="break-all">
            {chain.nativeCurrency.decimals ?? '-'}
          </td>
          <td style={{ width: 200, padding: '10px' }} className="break-all">
            {chain.slip44 ?? '-'}
          </td>
          <td style={{ width: 200, padding: '10px' }} className="break-all">
            {showStatusBadge(chain.status ?? '-')}
          </td>
          <td style={{ width: 200, padding: '10px' }} className="text-wrap">
            {chain.title ?? '-'}
          </td>
          <td style={{ width: 200, padding: '10px' }} className="break-all">
            <a
              href="/"
              className="hover:underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              {chain.ens?.registry ? (
                <div className="inline-flex items-center gap-1">
                  {truncateAddress(chain.ens?.registry, 6)}
                  <ExternalLinkIcon className="w-3 h-3 shrink-0" />
                </div>
              ) : (
                '-'
              )}
            </a>
          </td>
          <td style={{ width: 250, padding: '10px' }} className="">
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
                        <CopyIcon className="w-3 h-3 shrink-0" />
                        &nbsp;
                        <ExternalLinkIcon className="w-3 h-3 shrink-0" />
                      </Badge>
                    )
                  })
              ) : (
                <span className="mx-auto">-</span>
              )}
            </div>
          </td>
          <td style={{ width: 200, padding: '10px' }} className="break-all">
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
            style={{ width: 200, padding: '10px' }}
            className="break-all font-bold"
          >
            {chain.networkId ?? '-'}
          </td>
          <td style={{ width: 200, padding: '10px' }} className="break-all">
            {chain.redFlags?.map((flag) => {
              return (
                <Badge key="flag" variant={'destructive'}>
                  {flag}
                </Badge>
              )
            }) ?? 'N/A'}
          </td>
          <td style={{ width: 400, padding: '10px' }} className="break-all">
            <div className="flex flex-wrap gap-1">
              {chain.rpc
                .filter((url) => url.startsWith('https://'))
                .filter((_, i) => i < 2)
                .map((url) => {
                  const _url = new URL(url)
                  return (
                    <Badge key={url} variant={'secondary'}>
                      {takeRight(_url.hostname.split('.'), 2).join('.')}&nbsp;
                      <CopyIcon className="w-3 h-3 shrink-0" />
                      &nbsp;
                      <ExternalLinkIcon className="w-3 h-3 shrink-0" />
                    </Badge>
                  )
                })}
              {/* &nbsp;+{' '}
              {chain.rpc.filter((url) => url.startsWith('https://')).length - 2}{' '}
              RPC URLs */}
            </div>
          </td>
          <td style={{ width: 400, padding: '10px' }} className="break-all">
            <div className="flex flex-wrap gap-1">
              {chain.rpc
                .filter((url) => url.startsWith('wss://'))
                .filter((_, i) => i < 2)
                .map((url) => {
                  const _url = new URL(url)
                  return (
                    <Badge key={url} variant={'secondary'}>
                      {takeRight(_url.hostname.split('.'), 2).join('.')}&nbsp;
                      <CopyIcon className="w-3 h-3 shrink-0" />
                      &nbsp;
                      <ExternalLinkIcon className="w-3 h-3 shrink-0" />
                    </Badge>
                  )
                })}
              {/* &nbsp; +{' '}
              {chain.rpc.filter((url) => url.startsWith('wss://')).length - 2}{' '}
              RPC URLs */}
            </div>
          </td>
        </>
      )}
    />
  )
})

ChainsTable.displayName = 'ChainsTable'

function showStatusBadge(status: string) {
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
