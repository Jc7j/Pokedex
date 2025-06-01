import type { AppType } from 'next/dist/shared/lib/utils'
import { NuqsAdapter } from 'nuqs/adapters/next/pages'
import { Header } from '~/components/Header'

import '~/styles/globals.css'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <NuqsAdapter>
      <main
        className="min-h-screen bg-center bg-cover bg-no-repeat"
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
