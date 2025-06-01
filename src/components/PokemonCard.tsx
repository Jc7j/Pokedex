import type { Pokemon } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface PokemonCardProps {
  pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link
      href={`/pokemon/${pokemon.id}`}
      className="group flex h-[271px] w-[276px] cursor-pointer flex-col items-center justify-center gap-[30px] rounded-[16px] bg-gray-800/80 px-[39px] py-[19px] shadow-lg transition-all hover:scale-105 hover:bg-gray-700/80 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900"
      aria-label={`View details for ${pokemon.name}, Pokémon number ${pokemon.pokedexNumber}`}
    >
      <Image
        src={pokemon.photoUrl ?? '/Pikachu.png'}
        alt={pokemon.name}
        width={144}
        height={135}
        className="h-[135px] w-[144px]"
      />

      <div className="gap-2 text-center">
        <p className="text-white">N° {pokemon.pokedexNumber}</p>
        <h3 className="font-bold text-lg text-white">{pokemon.name}</h3>
        <p className="text-primary capitalize">{pokemon.types ?? 'n/a'}</p>
      </div>
    </Link>
  )
}
