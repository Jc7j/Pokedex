import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { tryCatch } from '~/lib/try-catch'

const prisma = new PrismaClient()

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
        prisma.pokemon.findUnique({
          where: {
            id: pokemonId,
          },
          include: {
            types: {
              include: {
                type: true,
              },
            },
            abilities: {
              include: {
                ability: true,
              },
            },
            eggGroups: {
              include: {
                eggGroup: true,
              },
            },
            evolutionsFrom: {
              include: {
                fromPokemon: {
                  select: {
                    id: true,
                    name: true,
                    pokedexNumber: true,
                    photoUrl: true,
                  },
                },
              },
            },
            evolutionsTo: {
              include: {
                toPokemon: {
                  select: {
                    id: true,
                    name: true,
                    pokedexNumber: true,
                    photoUrl: true,
                  },
                },
              },
            },
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
      } = req.body

      const { error } = await tryCatch(
        prisma.pokemon.update({
          where: {
            id: pokemonId,
          },
          data: {
            name: name || undefined,
            pokedexNumber: pokedexNumber ? Number(pokedexNumber) : undefined,
            photoUrl: photoUrl !== undefined ? photoUrl : undefined,
            description: description !== undefined ? description : undefined,
            heightCm: heightCm ? Number(heightCm) : undefined,
            weightKg: weightKg ? Number(weightKg) : undefined,
            genderFemaleRatio: genderFemaleRatio
              ? Number(genderFemaleRatio)
              : undefined,
            genderMaleRatio: genderMaleRatio
              ? Number(genderMaleRatio)
              : undefined,
            ...(types && {
              types: {
                deleteMany: {},
                create: types.map((typeName: string) => ({
                  type: {
                    connectOrCreate: {
                      where: { name: typeName.toLowerCase() },
                      create: { name: typeName.toLowerCase() },
                    },
                  },
                })),
              },
            }),
            ...(abilities && {
              abilities: {
                deleteMany: {},
                create: abilities.map((abilityName: string) => ({
                  ability: {
                    connectOrCreate: {
                      where: { name: abilityName.toLowerCase() },
                      create: { name: abilityName.toLowerCase() },
                    },
                  },
                })),
              },
            }),
            ...(eggGroups && {
              eggGroups: {
                deleteMany: {},
                create: eggGroups.map((eggGroupName: string) => ({
                  eggGroup: {
                    connectOrCreate: {
                      where: { name: eggGroupName.toLowerCase() },
                      create: { name: eggGroupName.toLowerCase() },
                    },
                  },
                })),
              },
            }),
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
        prisma.$transaction(async (tx) => {
          // Delete all related records first
          await tx.pokemonType.deleteMany({
            where: { pokemonId },
          })

          await tx.pokemonAbility.deleteMany({
            where: { pokemonId },
          })

          await tx.pokemonEggGroup.deleteMany({
            where: { pokemonId },
          })

          await tx.evolution.deleteMany({
            where: {
              OR: [{ fromId: pokemonId }, { toId: pokemonId }],
            },
          })

          await tx.pokemon.delete({
            where: { id: pokemonId },
          })
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
