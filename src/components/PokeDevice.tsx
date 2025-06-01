import type { Pokemon } from '@prisma/client'
import { Button } from '~/components/ui'

export function PokeDevice({ pokemonData }: { pokemonData: Pokemon }) {
  return (
    <div className="relative">
      <img
        src="/Pokedex.png"
        alt="Pokédex Device"
        className="h-auto w-full max-w-3xl"
      />

      <div className="absolute top-[23%] left-[7%] h-[42%] w-[36%]">
        <div className="h-full overflow-hidden rounded-lg border border-gray-300 bg-gray-100 p-3">
          <div className="h-full space-y-1 text-black text-xs">
            <div className="flex items-center justify-between border-gray-300 border-b pb-1">
              <h2 className="font-bold text-base">{pokemonData.name}</h2>
              <p className="text-sm">N° {pokemonData.pokedexNumber}</p>
            </div>
            <p className="font-semibold text-sm">Electric</p>
            <p className="py-1 text-xs leading-tight">
              {pokemonData.description}
            </p>
            <div className="absolute right-3 bottom-3 left-3 flex justify-between text-xs">
              <div>
                <p className="font-semibold">Height</p>
                <p>{pokemonData.heightCm}</p>
              </div>
              <div>
                <p className="font-semibold">Weight</p>
                <p>{pokemonData.weightKg}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-[23%] right-[7%] h-[42%] w-[36%]">
        <div className="flex h-full items-center justify-center rounded-lg border border-gray-300 bg-white p-4">
          <div className="text-center">
            <p className="mx-auto flex h-32 w-32 items-center justify-center text-6xl">
              ⚡
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[28%] left-[12%]">
        <Button
          variant="default"
          size="sm"
          className="rounded-md bg-yellow-400 px-6 py-2 font-bold text-black hover:bg-yellow-500"
        >
          Search
        </Button>
      </div>

      <div className="absolute right-[12%] bottom-[28%] flex gap-2">
        <Button
          variant="default"
          size="sm"
          className="rounded-md bg-orange-400 px-4 py-2 font-bold text-white hover:bg-orange-500"
        >
          View more
        </Button>
        <Button
          variant="default"
          size="sm"
          className="rounded-md bg-orange-400 px-4 py-2 font-bold text-white hover:bg-orange-500"
        >
          Details
        </Button>
      </div>
    </div>
  )
}
