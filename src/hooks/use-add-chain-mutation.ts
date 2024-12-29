import { config } from '@/components/rainbowkit-provider'
import type { Chain } from '@/types/chain'
import { useMutation } from '@tanstack/react-query'
import { getWalletClient } from '@wagmi/core'
import { toast } from 'sonner'

export function useAddChainMutation() {
  return useMutation({
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
}
