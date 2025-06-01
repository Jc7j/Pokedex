import type { AppType } from 'next/dist/shared/lib/utils'
import { useRouter } from 'next/router'
import { Header } from '~/components/Header'

import '~/styles/globals.css'

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter()

  const showDarkOverlay = router.pathname === '/pokedex'

  return (
    <main
      className="min-h-screen bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: 'url(/Wallpaper.jpg)' }}
    >
      <div className={`min-h-screen ${showDarkOverlay ? 'bg-black/70' : ''}`}>
        <Header />

        <Component {...pageProps} />
      </div>
    </main>
  )
}

export default MyApp
