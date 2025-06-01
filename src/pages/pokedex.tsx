import { ListFilter, Plus, Search } from 'lucide-react'
import Head from 'next/head'
import PokemonCard from '~/components/PokemonCard'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'

const pokemonList = [
  {
    id: 1,
    name: 'Bulbasaur',
    number: 1,
    type: 'Grass/Poison',
    image: '🌱',
  },
  {
    id: 2,
    name: 'Ivysaur',
    number: 2,
    type: 'Grass/Poison',
    image: '🌿',
  },
  {
    id: 3,
    name: 'Venusaur',
    number: 3,
    type: 'Grass/Poison',
    image: '🌺',
  },
  {
    id: 4,
    name: 'Charmander',
    number: 4,
    type: 'Fire',
    image: '🔥',
  },
  {
    id: 5,
    name: 'Charmeleon',
    number: 5,
    type: 'Fire',
    image: '🔥',
  },
  {
    id: 6,
    name: 'Charizard',
    number: 6,
    type: 'Fire/Flying',
    image: '🐉',
  },
  {
    id: 7,
    name: 'Squirtle',
    number: 7,
    type: 'Water',
    image: '💧',
  },
  {
    id: 8,
    name: 'Wartortle',
    number: 8,
    type: 'Water',
    image: '🌊',
  },
  {
    id: 9,
    name: 'Blastoise',
    number: 9,
    type: 'Water',
    image: '🌊',
  },
  {
    id: 25,
    name: 'Pikachu',
    number: 25,
    type: 'Electric',
    image: '⚡',
  },
  {
    id: 26,
    name: 'Raichu',
    number: 26,
    type: 'Electric',
    image: '⚡',
  },
  {
    id: 150,
    name: 'Mewtwo',
    number: 150,
    type: 'Psychic',
    image: '🧠',
  },
]

export default function Pokedex() {
  return (
    <>
      <Head>
        <title>Pokédx - Condorsoft</title>
        <meta name="description" content="Browse the complete Pokédx" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen overflow-hidden rounded-lg bg-black/70">
        <div className="container mx-auto h-full overflow-y-auto px-6 py-8">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="mb-2 font-bold text-4xl text-white">Pokedex</h1>
          </div>

          {/* Controls Row */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative w-80">
                <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search pokemon"
                  className="border-gray-600 bg-gray-800/80 pl-10 text-white placeholder-gray-400 focus:border-gray-500"
                />
              </div>

              {/* Type Filter */}
              <div className="flex items-center">
                <Select>
                  <SelectTrigger className="border-gray-600 bg-gray-800/80 text-white">
                    <div className="flex items-center gap-2">
                      <ListFilter className="h-4 w-4 text-white" />
                      <SelectValue placeholder="Type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="border-gray-600 bg-gray-800">
                    <SelectItem
                      value="all"
                      className="text-white hover:bg-gray-700"
                    >
                      All
                    </SelectItem>
                    <SelectItem
                      value="fire"
                      className="text-white hover:bg-gray-700"
                    >
                      Fire
                    </SelectItem>
                    <SelectItem
                      value="water"
                      className="text-white hover:bg-gray-700"
                    >
                      Water
                    </SelectItem>
                    <SelectItem
                      value="grass"
                      className="text-white hover:bg-gray-700"
                    >
                      Grass
                    </SelectItem>
                    <SelectItem
                      value="electric"
                      className="text-white hover:bg-gray-700"
                    >
                      Electric
                    </SelectItem>
                    <SelectItem
                      value="psychic"
                      className="text-white hover:bg-gray-700"
                    >
                      Psychic
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Create New Button */}
            <Button className="border border-gray-600 bg-gray-800/20 text-white hover:bg-gray-700">
              <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-white">
                <Plus className="h-3 w-3 text-black" />
              </div>
              Create New
            </Button>
          </div>

          {/* Pokemon Grid */}
          <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pokemonList.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
