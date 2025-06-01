import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export function Header() {
  const router = useRouter()

  return (
    <header className="flex flex-col items-center bg-black/70 py-6">
      <Image
        src="/PokemonLogo.png"
        alt="Pokemon Logo"
        width={120}
        height={40}
        className="mb-2.5 h-10 w-auto"
      />

      <nav className="flex items-center gap-[50px]">
        <Link
          href="/"
          className={`relative font-bold text-md text-white transition-colors hover:text-yellow-300 ${
            router.pathname === '/'
              ? 'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-white after:content-[""] hover:after:bg-yellow-300'
              : ''
          }`}
        >
          Home
        </Link>
        <Link
          href="/pokedex"
          className={`relative font-bold text-md text-white transition-colors hover:text-yellow-300 ${
            router.pathname === '/pokedex'
              ? 'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-white after:content-[""] hover:after:bg-yellow-300'
              : ''
          }`}
        >
          Pokedex
        </Link>
      </nav>
    </header>
  )
}
