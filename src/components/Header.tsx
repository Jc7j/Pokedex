import Link from 'next/link'
import { useRouter } from 'next/router'

export function Header() {
  const router = useRouter()

  return (
    <header className="flex flex-col items-center bg-black/70 py-6">
      <div className="mb-2.5">
        <img
          src="/PokemonLogo.png"
          alt="Pokemon Logo"
          className="h-10 w-auto"
        />
      </div>

      <nav className="flex items-center gap-[50px]">
        <Link
          href="/"
          className={`relative pb-1 font-bold text-md text-white transition-colors hover:text-yellow-300 ${
            router.pathname === '/'
              ? 'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-white after:content-[""] hover:after:bg-yellow-300'
              : ''
          }`}
        >
          Home
        </Link>
        <Link
          href="/pokedex"
          className={`relative pb-1 font-bold text-md text-white transition-colors hover:text-yellow-300 ${
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
