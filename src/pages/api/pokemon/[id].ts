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
    default:
      break
  }

  res.setHeader('Allow', ['GET'])
  res.status(405).json({ error: `Method ${method} not allowed` })
}
