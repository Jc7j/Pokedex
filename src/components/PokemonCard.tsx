import type { Pokemon } from '@prisma/client'
import Image from 'next/image'
import { Button } from '~/components/ui'

interface PokemonCardProps {
  pokemon: Pokemon
  onClick?: () => void
}

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  return (
    <Button
      variant="ghost"
      className="group h-[271px] w-[276px] cursor-pointer flex-col gap-[30px] rounded-[16px] bg-gray-800/80 px-[39px] py-[19px] shadow-lg transition-all hover:scale-105 hover:bg-gray-700/80 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
      aria-label={`View details for ${pokemon.name}, Pokémon number ${pokemon.pokedexNumber}`}
    >
      <Image
        src="/Pikachu.png"
        alt={pokemon.name}
        width={144}
        height={135}
        className="h-[135px] w-[144px]"
      />

      <div className="gap-2 text-center">
        <p className="text-white">N° {pokemon.pokedexNumber}</p>
        <h3 className="font-bold text-lg text-white">{pokemon.name}</h3>
        <p className="text-primary">Electric</p>
      </div>
    </Button>
  )
}
