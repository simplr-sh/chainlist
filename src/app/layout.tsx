import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const geistSans = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Chainlist | Simplr.sh',
  description: 'Ethereum Chainlist by Simplr.sh',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      url: '/favicon.png',
      sizes: '512x512',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
