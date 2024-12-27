'use client'

import type { ChainList } from '@/types/chain'
import { CopyIcon } from 'lucide-react'
import { TableVirtuoso } from 'react-virtuoso'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

export function ChainsTable({ chainlist }: { chainlist: ChainList }) {
  const chains = chainlist.map((chain) => ({
    ...chain,
    chainId: chain.chainId,
    name: chain.name,
    chain: chain.chain,
    icon: chain.icon,
    shortName: chain.shortName,
  }))

  return (
    <TableVirtuoso
      style={{ height: '90vh' }}
      data={chains}
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
          />
        ),
      }}
      fixedHeaderContent={() => (
        <tr>
          <th
            style={{
              width: 100,
              padding: '10px',
              background: 'hsl(var(--secondary))',
              position: 'sticky',
              left: 0,
              zIndex: 1,
            }}
          >
            Chain ID
          </th>
          <th
            style={{
              width: 250,
              padding: '10px',
              background: 'hsl(var(--secondary))',
              position: 'sticky',
              left: 100,
              zIndex: 1,
            }}
          >
            Name
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
          >
            Short Name
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
          >
            Info URL
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
          >
            Currency Name
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
          >
            Currency Symbol
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
          >
            Currency Decimals
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
          >
            SLIP44 Code
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
          >
            Status
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
          >
            Title
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
          >
            Registry
          </th>
          <th
            style={{
              width: 250,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
          >
            Faucets
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
          >
            Features
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
          >
            Network ID
          </th>
          <th
            style={{
              width: 200,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
          >
            Red Flags
          </th>
          <th
            style={{
              width: 400,
              background: 'hsl(var(--secondary))',
              padding: '10px',
            }}
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
            style={{
              width: 100,
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
            style={{
              width: '250px !important',
              padding: '10px',
              background: 'hsl(var(--secondary))',
              position: 'sticky',
              left: 100,
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
                className="hover:underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                {new URL(chain.infoURL).hostname}
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
            {chain.status ?? '-'}
          </td>
          <td style={{ width: 200, padding: '10px' }} className="text-wrap">
            {chain.title ?? '-'}
          </td>
          <td style={{ width: 200, padding: '10px' }} className="break-all">
            {chain.ens?.registry ?? '-'}
          </td>
          <td style={{ width: 250, padding: '10px' }} className="">
            <div className="flex flex-wrap gap-1">
              {chain.faucets.length ? (
                chain.faucets.map((faucet) => {
                  return (
                    <Badge
                      key={faucet}
                      variant={'default'}
                      className="text-left"
                    >
                      {new URL(faucet).hostname}&nbsp;
                      <CopyIcon className="w-4 h-4" />
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
                  <Badge key={name} variant={'default'}>
                    {name}
                  </Badge>
                )
              }) ?? '-'}
            </div>
          </td>
          <td style={{ width: 200, padding: '10px' }} className="break-all">
            {chain.networkId ?? '-'}
          </td>
          <td style={{ width: 200, padding: '10px' }} className="break-all">
            {chain.redFlags?.map((flag) => {
              return (
                <Badge key="flag" variant={'destructive'}>
                  {flag}
                </Badge>
              )
            }) ?? '-'}
          </td>
          <td style={{ width: 400, padding: '10px' }} className="break-all">
            <div className="flex flex-wrap gap-1">
              {chain.rpc
                .filter((url) => url.startsWith('https://'))
                .filter((_, i) => i < 2)
                .map((url) => {
                  const _url = new URL(url)
                  return (
                    <Badge key={url} variant={'default'}>
                      {_url.hostname}&nbsp;
                      <CopyIcon className="w-4 h-4" />
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
                    <Badge key={url} variant={'default'}>
                      {_url.hostname}&nbsp;
                      <CopyIcon className="w-4 h-4" />
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
}
