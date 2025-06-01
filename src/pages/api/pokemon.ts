import type { NextApiRequest, NextApiResponse } from 'next'
import { tryCatch } from '~/lib/try-catch'
import { db } from '~/server/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req

  switch (method) {
    case 'GET': {
      if (query.action === 'count') {
        const { data, error } = await tryCatch(db.pokemon.count())

        if (error) {
          console.error('Error counting pokemon:', error)
          return res.status(500).json({ error: 'Failed to count pokemon' })
        }

        return res.status(200).json({ count: data })
      }

      if (query.action === 'random') {
        const skip = query.skip ? Number(query.skip) : 0

        const { data, error } = await tryCatch(
          db.pokemon.findFirst({
            skip: skip,
          })
        )

        if (error) {
          console.error('Error fetching random pokemon:', error)
          return res
            .status(500)
            .json({ error: 'Failed to fetch random pokemon' })
        }

        if (!data) {
          return res.status(404).json({ error: 'Pokemon not found' })
        }

        return res.status(200).json(data)
      }

      // Default GET - fetch all pokemon
      const { data, error } = await tryCatch(
        db.pokemon.findMany({
          orderBy: {
            pokedexNumber: 'asc',
          },
        })
      )

      if (error) {
        console.error('Error fetching pokemon:', error)
        return res.status(500).json({ error: 'Failed to fetch pokemon' })
      }

      return res.status(200).json(data)
    }

    case 'POST': {
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

      if (!name || !pokedexNumber) {
        return res
          .status(400)
          .json({ error: 'Name and Pokedex number are required' })
      }

      const evolutionData = evolutionMethod
        ? {
            method: evolutionMethod,
            photoUrl: evolutionPhotoUrl || null,
          }
        : null

      const { data, error } = await tryCatch(
        db.pokemon.create({
          data: {
            name,
            pokedexNumber: Number(pokedexNumber),
            photoUrl: photoUrl || null,
            description: description || null,
            heightCm: heightCm ? Number(heightCm) : null,
            weightKg: weightKg ? Number(weightKg) : null,
            genderFemaleRatio: genderFemaleRatio
              ? Number(genderFemaleRatio)
              : null,
            genderMaleRatio: genderMaleRatio ? Number(genderMaleRatio) : null,
            types: types || null,
            abilities: abilities || null,
            eggGroups: eggGroups || null,
            evolution: evolutionData,
          },
        })
      )

      if (error) {
        console.error('Error creating pokemon:', error)
        return res.status(500).json({ error: 'Failed to create pokemon' })
      }

      return res
        .status(201)
        .json({ success: true, message: 'Pokemon created successfully', data })
    }

    default:
      break
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).json({ error: `Method ${method} not allowed` })
}
