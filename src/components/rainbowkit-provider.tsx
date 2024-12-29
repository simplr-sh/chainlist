'use client'

import '@rainbow-me/rainbowkit/styles.css'

import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
  lightTheme,
} from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTheme } from 'next-themes'
import { mainnet } from 'viem/chains'
import { WagmiProvider } from 'wagmi'

export const config = getDefaultConfig({
  appName: 'Chainlist | Simplr.sh',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? '',
  chains: [mainnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
})

const queryClient = new QueryClient()
export const RainbowKitProviderWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { theme } = useTheme()
  const rainbowkitTheme = theme === 'dark' ? darkTheme() : lightTheme()

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          showRecentTransactions={false}
          theme={rainbowkitTheme}
          appInfo={{
            appName: 'Chainlist | Simplr.sh',
            learnMoreUrl: 'https://github.com/simplr-sh/chainlist',
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
