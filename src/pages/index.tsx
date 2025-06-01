import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '~/components/ui'
import { type PokemonWithRelations, getRandom } from '~/lib/pokemon-queries'
import { tryCatch } from '~/lib/try-catch'

export default function Home() {
  const randomPokemonMutation = getRandom()
  const [currentPokemon, setCurrentPokemon] =
    useState<PokemonWithRelations | null>(null)
  const [noPokemonFound, setNoPokemonFound] = useState(false)

  useEffect(() => {
    async function loadInitialPokemon() {
      const { data, error } = await tryCatch(
        fetch('/api/pokemon?action=random&skip=0').then((res) => {
          if (!res.ok) throw new Error('Failed to fetch initial pokemon')
          return res.json()
        })
      )
      if (data) {
        setCurrentPokemon(data)
      } else {
        setNoPokemonFound(true)
        if (error) {
          console.error('Failed to load initial pokemon:', error)
        }
      }
    }

    loadInitialPokemon()
  }, [])

  async function handleSearch() {
    const { data, error } = await tryCatch(randomPokemonMutation.mutateAsync())
    if (data) {
      setCurrentPokemon(data)
      setNoPokemonFound(false)
    } else {
      setNoPokemonFound(true)
      if (error) {
        console.error('Failed to fetch random pokemon:', error)
      }
    }
  }

  if (!currentPokemon && !noPokemonFound) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-white text-xl">Loading Pokemon...</div>
      </div>
    )
  }

  const isSearchLoading = randomPokemonMutation.isPending
  const showNoPokemon = noPokemonFound && !currentPokemon

  return (
    <>
      <Head>
        <title>Pokédx - Condorsoft</title>
        <meta
          name="description"
          content="Pokédx interface for Condorsoft technical test"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center p-4">
        <div className="relative w-full max-w-4xl">
          <Image
            src="/Pokedex.png"
            alt="Pokédx Device"
            width={713}
            height={520}
            className="h-auto w-full"
            priority
          />

          {/* Left screen - Pokemon info or No Pokemon message */}
          <div className="absolute top-[23%] left-[3.5%] h-[42%] w-[40%]">
            {showNoPokemon ? (
              <div className="flex h-full items-center justify-center overflow-hidden rounded-lg border border-gray-400 bg-gray-50 p-3">
                <div className="text-center text-black text-xs">
                  <p className="font-bold text-sm">No Pokemon Added</p>
                  <p className="mt-2 text-[10px]">
                    Add some Pokemon to get started!
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full overflow-hidden rounded-lg border border-gray-400 bg-gray-50 p-3">
                <div className="h-full space-y-2 text-black text-xs">
                  <div className="flex items-center justify-between border-gray-400 border-b pb-1">
                    <h2 className="font-bold text-base">
                      {currentPokemon?.name}
                    </h2>
                    <p className="text-sm">
                      N° {currentPokemon?.pokedexNumber}
                    </p>
                  </div>
                  <p className="font-semibold text-sm capitalize">
                    {currentPokemon?.types ?? 'n/a'}
                  </p>
                  <p className="py-1 text-xs leading-tight">
                    {currentPokemon?.description || 'No description available.'}
                  </p>
                  <div className="absolute right-3 bottom-3 left-3 flex justify-between text-xs">
                    <div>
                      <p className="font-semibold">Height</p>
                      <p>
                        {currentPokemon?.heightCm
                          ? `${Math.floor(currentPokemon.heightCm / 30.48)}'${Math.round(
                              (currentPokemon.heightCm % 30.48) / 2.54
                            )
                              .toString()
                              .padStart(2, '0')}"`
                          : 'Unknown'}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">Weight</p>
                      <p>
                        {currentPokemon?.weightKg
                          ? `${(currentPokemon.weightKg * 2.205).toFixed(1)} lbs`
                          : 'Unknown'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right screen - Pokemon image or placeholder */}
          <div className="absolute top-[23%] right-[3.5%] h-[42%] w-[40%]">
            <div className="flex h-full items-center justify-center rounded-lg border border-gray-400 bg-white p-4">
              <div className="text-center">
                {showNoPokemon ? (
                  <p className="mx-auto flex h-32 w-32 items-center justify-center text-6xl">
                    ?
                  </p>
                ) : currentPokemon?.photoUrl ? (
                  <Image
                    src={currentPokemon.photoUrl}
                    alt={currentPokemon.name}
                    width={128}
                    height={128}
                    className="h-32 w-32 object-contain"
                  />
                ) : (
                  <p className="mx-auto flex h-32 w-32 items-center justify-center text-6xl">
                    ⚡
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Search button */}
          <div className="absolute bottom-[28%] left-[11%]">
            <Button
              variant="default"
              size="sm"
              onClick={handleSearch}
              disabled={showNoPokemon || isSearchLoading}
              className={`rounded-md px-6 py-2 font-bold text-black text-sm ${
                showNoPokemon
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50'
              }`}
            >
              {isSearchLoading ? 'Searching...' : 'Search'}
            </Button>
          </div>

          {/* Action buttons */}
          <div className="absolute right-[11%] bottom-[28%] flex gap-2">
            <Link href="/pokemon">
              <Button
                variant="default"
                size="sm"
                className="rounded-md bg-orange-400 px-4 py-2 font-bold text-sm text-white hover:bg-orange-500"
              >
                {showNoPokemon ? 'Add Pokemon' : 'View more'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
