import type { Pokemon } from '@prisma/client'
import { ListFilter, Plus, Search } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { CreatePokemon } from '~/components/CreatePokemon'
import PokemonCard from '~/components/PokemonCard'
import { PokemonDetail } from '~/components/PokemonDetail'
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui'

type PokemonWithRelations = Pokemon & {
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

const pokemonList: Pokemon[] = [
  {
    id: 1,
    name: 'Bulbasaur',
    pokedexNumber: 1,
    photoUrl: '/Pikachu.png',
    description:
      'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
    heightCm: 70,
    weightKg: 6.9,
    genderFemaleRatio: 0.125,
    genderMaleRatio: 0.875,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Ivysaur',
    pokedexNumber: 2,
    photoUrl: '/Pikachu.png',
    description:
      'When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.',
    heightCm: 100,
    weightKg: 13.0,
    genderFemaleRatio: 0.125,
    genderMaleRatio: 0.875,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 25,
    name: 'Pikachu',
    pokedexNumber: 25,
    photoUrl: '/Pikachu.png',
    description:
      'When it is angered, it immediately discharges the energy stored in the pouches in its cheeks.',
    heightCm: 40,
    weightKg: 6.0,
    genderFemaleRatio: 0.5,
    genderMaleRatio: 0.5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 26,
    name: 'Raichu',
    pokedexNumber: 26,
    photoUrl: '/Pikachu.png',
    description:
      'Its long tail serves as a ground to protect itself from its own high-voltage power.',
    heightCm: 80,
    weightKg: 30.0,
    genderFemaleRatio: 0.5,
    genderMaleRatio: 0.5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function Pokedex() {
  const [selectedPokemonId, setSelectedPokemonId] = useQueryState('pokemon', {
    defaultValue: null,
    parse: (value) => (value ? Number.parseInt(value, 10) : null),
    serialize: (value) => value?.toString() ?? '',
  })

  const [searchTerm, setSearchTerm] = useQueryState('search', {
    defaultValue: '',
    parse: (value) => value || '',
    serialize: (value) => value,
  })

  const [showCreateForm, setShowCreateForm] = useState(false)

  const selectedPokemon = selectedPokemonId
    ? pokemonList.find((p) => p.id === selectedPokemonId)
    : null

  const filteredPokemon = pokemonList.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.pokedexNumber.toString().includes(searchTerm)
  )

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemonId(pokemon.id)
  }

  const handleBackToList = () => {
    setSelectedPokemonId(null)
  }

  const handleCreateNew = () => {
    setShowCreateForm(true)
  }

  const handleBackFromCreate = () => {
    setShowCreateForm(false)
  }

  if (selectedPokemon) {
    const pokemonWithRelations: PokemonWithRelations = {
      ...selectedPokemon,
      types: [{ type: { name: 'Electric' } }],
      evolutionsTo:
        selectedPokemon.id === 25
          ? [
              {
                toPokemon: {
                  id: 26,
                  name: 'Raichu',
                  pokedexNumber: 26,
                  photoUrl: '/Pokedex.png',
                },
              },
            ]
          : [],
    }

    return (
      <PokemonDetail pokemon={pokemonWithRelations} onBack={handleBackToList} />
    )
  }

  // Show create form
  if (showCreateForm) {
    return <CreatePokemon onBack={handleBackFromCreate} />
  }

  return (
    <div className="overflow-hidden rounded-lg bg-black/70">
      <div className="container mx-auto overflow-y-auto px-6 py-8">
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
          <Button onClick={handleCreateNew}>
            <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-white">
              <Plus className="h-3 w-3 text-black" />
            </div>
            Create New
          </Button>
        </div>

        {/* Pokemon Grid */}
        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => handlePokemonClick(pokemon)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
