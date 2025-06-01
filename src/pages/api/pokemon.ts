import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { tryCatch } from '~/lib/try-catch'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case 'GET': {
      const { data, error } = await tryCatch(
        prisma.pokemon.findMany({
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
    default:
      break
  }

  res.setHeader('Allow', ['GET'])
  res.status(405).json({ error: `Method ${method} not allowed` })
}
