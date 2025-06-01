import type { AppType } from 'next/dist/shared/lib/utils'
import { Inter } from 'next/font/google'
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
      <main
        className={`min-h-screen bg-center bg-cover bg-no-repeat ${inter.className}`}
        style={{ backgroundImage: 'url(/Wallpaper.jpg)' }}
      >
        <div className="min-h-screen">
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
