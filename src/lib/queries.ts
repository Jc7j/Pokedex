import type { Pokemon } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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

type CreatePokemonData = {
  name: string
  pokedexNumber: string
  photoUrl?: string | null
  description?: string
  heightCm?: string
  weightKg?: string
  genderFemaleRatio?: string
  genderMaleRatio?: string
  types?: string[]
  abilities?: string[]
  eggGroups?: string[]
}

type UpdatePokemonData = CreatePokemonData & {
  id: number
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

async function createPokemon(
  data: CreatePokemonData
): Promise<{ success: boolean; message: string }> {
  const response = await fetch('/api/pokemon', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create pokemon')
  }

  return response.json()
}

export function useCreatePokemon() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPokemon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pokemon'] })
    },
  })
}

async function updatePokemon(
  data: UpdatePokemonData
): Promise<{ success: boolean; message: string }> {
  const { id, ...updateData } = data
  const response = await fetch(`/api/pokemon/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  })

  if (!response.ok) {
    throw new Error('Failed to update pokemon')
  }

  return response.json()
}

export function useUpdatePokemon() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePokemon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pokemon'] })
    },
  })
}
