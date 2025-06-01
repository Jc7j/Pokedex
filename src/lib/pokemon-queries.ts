import type { Pokemon } from '@prisma/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '~/pages/_app'

export type PokemonWithRelations = Pokemon & {
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

export interface PokemonFormProps {
  onBack: () => void
  pokemon?: PokemonWithRelations | null
  mode?: 'create' | 'edit'
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
      // Transform relation data to simple arrays for API
      const apiData = {
        name: data.name,
        pokedexNumber: data.pokedexNumber,
        photoUrl: data.photoUrl,
        description: data.description,
        heightCm: data.heightCm,
        weightKg: data.weightKg,
        genderFemaleRatio: data.genderFemaleRatio,
        genderMaleRatio: data.genderMaleRatio,
        types: data.types?.map((t) =>
          typeof t === 'string' ? t : t.type.name
        ),
        abilities: data.abilities?.map((a) =>
          typeof a === 'string' ? a : a.ability.name
        ),
        eggGroups: data.eggGroups?.map((g) =>
          typeof g === 'string' ? g : g.eggGroup.name
        ),
      }

      const response = await fetch('/api/pokemon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
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

      // Transform relation data to simple arrays for API
      const apiData = {
        name: updateData.name,
        pokedexNumber: updateData.pokedexNumber,
        photoUrl: updateData.photoUrl,
        description: updateData.description,
        heightCm: updateData.heightCm,
        weightKg: updateData.weightKg,
        genderFemaleRatio: updateData.genderFemaleRatio,
        genderMaleRatio: updateData.genderMaleRatio,
        types: updateData.types?.map((t) =>
          typeof t === 'string' ? t : t.type.name
        ),
        abilities: updateData.abilities?.map((a) =>
          typeof a === 'string' ? a : a.ability.name
        ),
        eggGroups: updateData.eggGroups?.map((g) =>
          typeof g === 'string' ? g : g.eggGroup.name
        ),
      }

      const response = await fetch(`/api/pokemon/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
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
