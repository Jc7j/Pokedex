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

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
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
  )
}

export default MyApp
