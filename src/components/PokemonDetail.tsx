import type { Pokemon } from '@prisma/client'
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { Button, Label } from '~/components/ui'

interface PokemonDetailProps {
  pokemon: Pokemon & {
    types: Array<{ type: { name: string } }>
    evolutionsTo: Array<{
      toPokemon: {
        id: number
        name: string
        pokedexNumber: number
        photoUrl: string | null
      }
    }>
  }
  onBack?: () => void
  onEdit?: () => void
}

export function PokemonDetail({ pokemon, onBack, onEdit }: PokemonDetailProps) {
  return (
    <div className="mx-auto max-w-6xl rounded-lg bg-black/70 p-8">
      <div className=" flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 text-white hover:bg-gray-700"
        >
          <ArrowLeft className="h-8 w-8" />
        </Button>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="flex items-center gap-2"
            onClick={onEdit}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Button size="sm" className="flex items-center gap-2 ">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 py-2 lg:grid-cols-2">
        <div className="flex items-center justify-center">
          <Image
            src={pokemon.photoUrl || '/Pikachu.png'}
            alt={pokemon.name}
            width={476}
            height={447}
            className="object-contain"
          />
        </div>

        <div className="space-y-4 rounded-lg bg-gray-800/60 p-4 text-white">
          <div>
            {/* Name and Number */}
            <div className="flex justify-between">
              <h1 className="font-semibold text-4xl text-white">
                {pokemon.name}
              </h1>
              <p className="text-lg">N° {pokemon.pokedexNumber}</p>
            </div>

            {/* Type */}
            <p className="text-primary">
              {pokemon.types.map((pokemonType, index) => (
                <span key={index}>{pokemonType.type.name}</span>
              ))}
            </p>
          </div>
          {/* Description */}
          <p className="text-white leading-relaxed">
            {pokemon.description || 'No description available.'}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <Label>Height</Label>
              <p>
                {pokemon.heightCm
                  ? `${Math.floor(pokemon.heightCm / 30.48)}' ${Math.round(
                      (pokemon.heightCm % 30.48) / 2.54
                    )
                      .toString()
                      .padStart(2, '0')}"`
                  : 'Unknown'}
              </p>
            </div>
            <div>
              <Label>Weight</Label>
              <p>
                {pokemon.weightKg
                  ? `${(pokemon.weightKg * 2.205).toFixed(1)} lbs`
                  : 'Unknown'}
              </p>
            </div>
            <div>
              <Label>Gender Ratio</Label>
              <p>
                {pokemon.genderMaleRatio
                  ? `${(pokemon.genderMaleRatio * 100).toFixed(1)}%`
                  : '0%'}{' '}
                /{' '}
                {pokemon.genderFemaleRatio
                  ? `${(pokemon.genderFemaleRatio * 100).toFixed(1)}%`
                  : '0%'}
              </p>
            </div>
            <div>
              <Label>Abilities</Label>
              <p>Chlorophyll, Overgrow</p>
            </div>
            <div>
              <Label>Egg Groups</Label>
              <p>Monster, Grass</p>
            </div>
          </div>

          {/* Evolution */}
          {pokemon.evolutionsTo.length > 0 && (
            <div className="space-y-4">
              <div>
                <Label>Evolutions</Label>
                <p className="text-gray-300">
                  {pokemon.name} evolves into{' '}
                  {pokemon.evolutionsTo[0]?.toPokemon.name || 'unknown Pokemon'}{' '}
                  using a stone
                </p>
              </div>

              {/* Evolution Visual */}
              <div className="flex items-center gap-4">
                <Image
                  src={pokemon.photoUrl || '/Pikachu.png'}
                  alt={pokemon.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
                <div className="text-2xl text-white">→</div>
                <Image
                  src={
                    pokemon.evolutionsTo[0]?.toPokemon.photoUrl ||
                    '/Pikachu.png'
                  }
                  alt={
                    pokemon.evolutionsTo[0]?.toPokemon.name ||
                    'Evolution Pokemon'
                  }
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
