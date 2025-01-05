import { CSPostHogProvider } from '@/components/cs-posthog-provider'
import { RainbowKitProviderWrapper } from '@/components/rainbowkit-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const geistSans = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: 'normal',
})

export const metadata: Metadata = {
  title: 'Chainlist | Simplr.sh',
  description:
    'A simple, information-rich application for browsing and managing EVM chains',
  metadataBase: new URL('https://chainlist.simplr.sh'),
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      url: '/favicon.png',
      sizes: '512x512',
    },
  ],
  openGraph: {
    title: 'Chainlist | Simplr.sh',
    description:
      'A simple, information-rich application for browsing and managing EVM chains',
    url: 'https://chainlist.simplr.sh',
    siteName: 'Chainlist | Simplr.sh',
    images: [{ url: '/og-image.jpg', width: 1280, height: 640 }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    title: 'Chainlist | Simplr.sh',
    description:
      'A simple, information-rich application for browsing and managing EVM chains',
    card: 'summary_large_image',
    images: [{ url: '/og-image.jpg', width: 1280, height: 640 }],
    creator: '@SimplrSh',
    site: '@SimplrSh',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <CSPostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <RainbowKitProviderWrapper>{children}</RainbowKitProviderWrapper>
            <Toaster position="top-right" closeButton richColors />
          </ThemeProvider>
        </CSPostHogProvider>
      </body>
    </html>
  )
}
