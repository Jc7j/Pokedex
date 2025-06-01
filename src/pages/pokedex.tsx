import { Filter, Plus, Search } from 'lucide-react'
import Head from 'next/head'
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

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-4xl text-white">Pokedex</h1>
        </div>

        {/* Controls Row */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Bar */}
          <div className="relative max-w-sm flex-1">
            <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search pokemon"
              className="border-gray-600 bg-gray-800/80 pl-10 text-white placeholder-gray-400 focus:border-gray-500"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-white" />
            <Select>
              <SelectTrigger className="w-32 border-gray-600 bg-gray-800/80 text-white">
                <SelectValue placeholder="Type" />
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

          <Button className="border border-gray-600 bg-gray-800/20 text-white hover:bg-gray-700">
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pokemonList.map((pokemon) => (
            <div
              key={pokemon.id}
              className="cursor-pointer rounded-lg border border-gray-600 bg-gray-800/80 p-6 shadow-lg transition-all hover:bg-gray-700/80 hover:shadow-xl"
            >
              <div className="mb-4 flex justify-center">
                <div className="text-6xl">{pokemon.image}</div>
              </div>

              <div className="text-center">
                <div className="mb-2 text-gray-400 text-sm">
                  N° {pokemon.number.toString().padStart(2, '0')}
                </div>
                <h3 className="mb-2 font-bold text-lg text-white">
                  {pokemon.name}
                </h3>
                <div className="text-sm text-yellow-400">{pokemon.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
