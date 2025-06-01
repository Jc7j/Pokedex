import type { Pokemon } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

type PokemonWithTypes = Pokemon & {
  types: Array<{ type: { name: string } }>
}

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

async function fetchPokemon(): Promise<PokemonWithTypes[]> {
  const response = await fetch('/api/pokemon')
  if (!response.ok) {
    throw new Error('Failed to fetch pokemon')
  }
  return response.json()
}

export function usePokemon() {
  return useQuery({
    queryKey: ['pokemon'],
    queryFn: fetchPokemon,
  })
}

async function fetchPokemonById(id: number): Promise<PokemonWithRelations> {
  const response = await fetch(`/api/pokemon/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch pokemon')
  }
  return response.json()
}

export function usePokemonById(id: number | null) {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemonById(id!),
    enabled: !!id,
  })
}
