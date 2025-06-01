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
            include: {
              types: {
                include: {
                  type: true,
                },
              },
            },
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
          include: {
            types: {
              include: {
                type: true,
              },
            },
          },
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
        evolutionFromId,
        evolutionMethod,
        evolutionPhotoUrl,
      } = req.body

      if (!name || !pokedexNumber) {
        return res
          .status(400)
          .json({ error: 'Name and Pokedex number are required' })
      }

      const { error } = await tryCatch(
        db.$transaction(async (tx) => {
          const newPokemon = await tx.pokemon.create({
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
              types: {
                create:
                  types?.map((typeName: string) => ({
                    type: {
                      connectOrCreate: {
                        where: { name: typeName.toLowerCase() },
                        create: { name: typeName.toLowerCase() },
                      },
                    },
                  })) || [],
              },
              abilities: {
                create:
                  abilities?.map((abilityName: string) => ({
                    ability: {
                      connectOrCreate: {
                        where: { name: abilityName.toLowerCase() },
                        create: { name: abilityName.toLowerCase() },
                      },
                    },
                  })) || [],
              },
              eggGroups: {
                create:
                  eggGroups?.map((eggGroupName: string) => ({
                    eggGroup: {
                      connectOrCreate: {
                        where: { name: eggGroupName.toLowerCase() },
                        create: { name: eggGroupName.toLowerCase() },
                      },
                    },
                  })) || [],
              },
            },
          })

          // Create evolution if data provided
          if (evolutionFromId && evolutionMethod) {
            await tx.evolution.create({
              data: {
                fromId: Number(evolutionFromId),
                toId: newPokemon.id,
                method: evolutionMethod,
                evolutionPhotoUrl: evolutionPhotoUrl || null,
              },
            })
          }

          return newPokemon
        })
      )

      if (error) {
        console.error('Error creating pokemon:', error)
        return res.status(500).json({ error: 'Failed to create pokemon' })
      }

      return res
        .status(201)
        .json({ success: true, message: 'Pokemon created successfully' })
    }

    default:
      break
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).json({ error: `Method ${method} not allowed` })
}
