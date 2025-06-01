import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppType } from 'next/dist/shared/lib/utils'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { NuqsAdapter } from 'nuqs/adapters/next/pages'
import { Header } from '~/components/Header'

import '~/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const queryClient = new QueryClient()

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <main className={`relative min-h-screen ${inter.className}`}>
          <Image
            src="/Wallpaper.jpg"
            alt="Pokemon wallpaper background"
            fill
            className="object-cover"
            style={{ zIndex: -1 }}
            priority
            quality={75}
          />

          <div className="relative z-10 min-h-screen">
            <Header />

            <div className="mx-auto mt-10 max-w-[90%]">
              <Component {...pageProps} />
            </div>
          </div>
        </main>
      </NuqsAdapter>
    </QueryClientProvider>
  )
}

export default MyApp
