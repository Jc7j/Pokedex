import type { Pokemon } from '@prisma/client'
import Image from 'next/image'

interface PokemonCardProps {
  pokemon: Pokemon
  onClick?: () => void
}

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  return (
    <button
      type="button"
      className="h-[271px] w-[276px] cursor-pointer rounded-[16px] border border-gray-600 bg-gray-800/80 px-[39px] py-[19px] shadow-lg transition-all hover:bg-gray-700/80 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.()
        }
      }}
      tabIndex={0}
      aria-label={`View details for ${pokemon.name}`}
    >
      <div className="flex h-full flex-col items-center justify-center gap-[30px]">
        {/* Pokemon Image */}
        <div className="flex justify-center">
          <Image
            src="/Pikachu.png"
            alt={pokemon.name}
            width={144}
            height={135}
            className="h-[135px] w-[144px]"
          />
        </div>

        {/* Pokemon Info */}
        <div className="gap-2 text-center">
          <div className="text-white">N° {pokemon.pokedexNumber}</div>
          <h3 className="font-bold text-lg text-white">{pokemon.name}</h3>
          <div className="text-primary">Electric</div>
        </div>
      </div>
    </button>
  )
}
