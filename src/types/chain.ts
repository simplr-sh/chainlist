export type MiniChainList = Array<MiniChain>

export type MiniChain = {
  name: string
  chainId: number
  shortName: string
  networkId: number
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpc: string[]
  faucets: string[]
  infoURL: string
}

export type ChainList = Array<Chain>

export type Chain = {
  name: string
  chain: string
  icon?: string
  rpc: Array<string>
  features?: Array<{
    name: string
  }>
  faucets: Array<string>
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  infoURL: string
  shortName: string
  chainId: number
  networkId: number
  slip44?: number
  ens?: {
    registry: string
  }
  explorers?: Array<{
    name: string
    url: string
    standard: string
    icon?: string
  }>
  title?: string
  status?: string
  redFlags?: Array<string>
  parent?: {
    type: string
    chain: string
    bridges?: Array<{
      url: string
    }>
  }
}
