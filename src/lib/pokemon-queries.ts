import type { Pokemon } from '@prisma/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '~/pages/_app'

type PokemonWithTypes = Pokemon & {
  types: Array<{ type: { name: string } }>
}

type PokemonWithRelations = Pokemon & {
  types: Array<{ type: { name: string } }>
  abilities: Array<{ ability: { name: string } }>
  eggGroups: Array<{ eggGroup: { name: string } }>
  evolutionsFrom: Array<{
    method: string | null
    fromPokemon: {
      id: number
      name: string
      pokedexNumber: number
      photoUrl: string | null
    }
  }>
  evolutionsTo: Array<{
    method: string | null
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

export function getMany() {
  return useQuery({
    queryKey: ['pokemon'],
    queryFn: async (): Promise<PokemonWithTypes[]> => {
      const response = await fetch('/api/pokemon')
      if (!response.ok) {
        throw new Error('Failed to fetch pokemon')
      }
      return response.json()
    },
  })
}

export function getOne(id: number | null) {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: async (): Promise<PokemonWithRelations> => {
      const response = await fetch(`/api/pokemon/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch pokemon')
      }
      return response.json()
    },
    enabled: !!id,
  })
}

export function create() {
  return useMutation({
    mutationFn: async (
      data: CreatePokemonData
    ): Promise<{ success: boolean; message: string }> => {
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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pokemon'] })
    },
  })
}

export function update() {
  return useMutation({
    mutationFn: async (
      data: UpdatePokemonData
    ): Promise<{ success: boolean; message: string }> => {
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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pokemon'] })
    },
  })
}

export function deletePokemon() {
  return useMutation({
    mutationFn: async (
      id: number
    ): Promise<{ success: boolean; message: string }> => {
      const response = await fetch(`/api/pokemon/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete pokemon')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pokemon'] })
    },
  })
}
