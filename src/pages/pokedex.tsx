import { ListFilter, Plus, Search } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import PokemonCard from '~/components/PokemonCard'
import { PokemonForm } from '~/components/PokemonForm'
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui'
import { getMany } from '~/lib/pokemon-queries'

export default function Pokedex() {
  const [searchTerm, setSearchTerm] = useQueryState('search', {
    defaultValue: '',
    parse: (value) => value || '',
    serialize: (value) => value,
  })

  const [typeFilter, setTypeFilter] = useQueryState('type', {
    defaultValue: 'all',
    parse: (value) => value || 'all',
    serialize: (value) => (value === 'all' ? '' : value),
  })

  const [showCreateForm, setShowCreateForm] = useState(false)

  const { data: pokemonList = [], error } = getMany()

  const filteredPokemon = pokemonList.filter((pokemon) => {
    const matchesSearch =
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.pokedexNumber.toString().includes(searchTerm)

    const matchesType =
      typeFilter === 'all' ||
      pokemon.types.some(
        (pokemonType) =>
          pokemonType.type.name.toLowerCase() === typeFilter.toLowerCase()
      )

    return matchesSearch && matchesType
  })

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-400 text-xl">
          Error loading Pokemon: {error.message}
        </div>
      </div>
    )
  }

  if (showCreateForm) {
    return <PokemonForm onBack={() => setShowCreateForm(false)} />
  }

  return (
    <div className="overflow-hidden rounded-lg bg-black/70">
      <div className="container mx-auto overflow-y-auto px-6 py-8">
        {/* Page Title */}
        <h1 className="mb-4 font-bold text-4xl text-white">Pokedex</h1>

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

            <div className="flex items-center">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="flex items-center gap-2 border-gray-600 bg-gray-800/80 text-white">
                  <ListFilter className="h-4 w-4 text-white" />
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
          </div>

          {/* Create New Button */}
          <Button onClick={() => setShowCreateForm(true)}>
            <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-white">
              <Plus className="h-3 w-3 text-black" />
            </div>
            Create New
          </Button>
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </div>
  )
}
