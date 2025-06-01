import type { NextApiRequest, NextApiResponse } from 'next'
import { tryCatch } from '~/lib/try-catch'
import { db } from '~/server/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req
  const { id } = query

  switch (method) {
    case 'GET': {
      const pokemonId = Number.parseInt(id as string, 10)

      if (Number.isNaN(pokemonId)) {
        return res.status(400).json({ error: 'Invalid pokemon ID' })
      }

      const { data: pokemon, error } = await tryCatch(
        db.pokemon.findUnique({
          where: {
            id: pokemonId,
          },
        })
      )

      if (error) {
        console.error('Error fetching pokemon:', error)
        return res.status(500).json({ error: 'Failed to fetch pokemon' })
      }

      if (!pokemon) {
        return res.status(404).json({ error: 'Pokemon not found' })
      }

      return res.status(200).json(pokemon)
    }

    case 'PUT': {
      const pokemonId = Number.parseInt(id as string, 10)

      if (Number.isNaN(pokemonId)) {
        return res.status(400).json({ error: 'Invalid pokemon ID' })
      }

      const {
        name,
        pokedexNumber,
        photoUrl,
        description,
        heightCm,
        weightKg,
        genderFemaleRatio,
        genderMaleRatio,
        types,
        abilities,
        eggGroups,
        evolutionMethod,
        evolutionPhotoUrl,
      } = req.body

      // Prepare evolution data
      const evolutionData = evolutionMethod
        ? {
            method: evolutionMethod,
            photoUrl: evolutionPhotoUrl || null,
          }
        : null

      const { error } = await tryCatch(
        db.pokemon.update({
          where: {
            id: pokemonId,
          },
          data: {
            ...(name !== undefined && { name }),
            ...(pokedexNumber !== undefined && {
              pokedexNumber: Number(pokedexNumber),
            }),
            ...(photoUrl !== undefined && { photoUrl }),
            ...(description !== undefined && { description }),
            ...(heightCm !== undefined && {
              heightCm: heightCm ? Number(heightCm) : null,
            }),
            ...(weightKg !== undefined && {
              weightKg: weightKg ? Number(weightKg) : null,
            }),
            ...(genderFemaleRatio !== undefined && {
              genderFemaleRatio: genderFemaleRatio
                ? Number(genderFemaleRatio)
                : null,
            }),
            ...(genderMaleRatio !== undefined && {
              genderMaleRatio: genderMaleRatio ? Number(genderMaleRatio) : null,
            }),
            ...(types !== undefined && { types }),
            ...(abilities !== undefined && { abilities }),
            ...(eggGroups !== undefined && { eggGroups }),
            ...(evolutionData !== null && { evolution: evolutionData }),
          },
        })
      )

      if (error) {
        console.error('Error updating pokemon:', error)
        return res.status(500).json({ error: 'Failed to update pokemon' })
      }

      return res
        .status(200)
        .json({ success: true, message: 'Pokemon updated successfully' })
    }

    case 'DELETE': {
      const pokemonId = Number.parseInt(id as string, 10)

      if (Number.isNaN(pokemonId)) {
        return res.status(400).json({ error: 'Invalid pokemon ID' })
      }

      const { error } = await tryCatch(
        db.pokemon.delete({
          where: { id: pokemonId },
        })
      )

      if (error) {
        console.error('Error deleting pokemon:', error)
        return res.status(500).json({ error: 'Failed to delete pokemon' })
      }

      return res
        .status(200)
        .json({ success: true, message: 'Pokemon deleted successfully' })
    }

    default:
      break
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
  res.status(405).json({ error: `Method ${method} not allowed` })
}
