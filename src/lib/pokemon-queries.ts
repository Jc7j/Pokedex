import type { Pokemon } from '@prisma/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '~/pages/_app'
import type { PokemonEvolution } from '~/server/types'

export type PokemonWithRelations = Pokemon & {
  evolution: PokemonEvolution | null
}

export function getMany() {
  return useQuery({
    queryKey: ['pokemon'],
    queryFn: async (): Promise<PokemonWithRelations[]> => {
      const response = await fetch('/api/pokemon')
      if (!response.ok) {
        throw new Error('Failed to fetch pokemon')
      }
      return response.json()
    },
  })
}

export function getCount() {
  return useQuery({
    queryKey: ['pokemon', 'count'],
    queryFn: async (): Promise<{ count: number }> => {
      const response = await fetch('/api/pokemon?action=count')
      if (!response.ok) {
        throw new Error('Failed to fetch pokemon count')
      }
      return response.json()
    },
  })
}

export function getRandom() {
  return useMutation({
    mutationFn: async (): Promise<PokemonWithRelations> => {
      // First get the count
      const countResponse = await fetch('/api/pokemon?action=count')
      if (!countResponse.ok) {
        throw new Error('Failed to fetch pokemon count')
      }
      const { count } = await countResponse.json()

      // Generate random skip value
      const randomSkip = Math.floor(Math.random() * count)

      // Get random pokemon
      const response = await fetch(
        `/api/pokemon?action=random&skip=${randomSkip}`
      )
      if (!response.ok) {
        throw new Error('Failed to fetch random pokemon')
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
      data: Partial<PokemonWithRelations>
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
      data: Partial<PokemonWithRelations> & { id: number }
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
