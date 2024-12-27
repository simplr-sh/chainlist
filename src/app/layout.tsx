import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import { Geist_Mono, Poppins } from 'next/font/google'
import './globals.css'

const geistSans = Poppins({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
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
