import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { NextApiRequest, NextApiResponse } from 'next'
import { tryCatch } from '~/lib/try-catch'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST': {
      const { file, fileName } = req.body

      if (!file || !fileName) {
        return res.status(400).json({ error: 'File and fileName are required' })
      }

      // Remove data:image/xxx;base64, prefix
      const base64Data = file.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')

      // Generate unique filename
      const timestamp = Date.now()
      const extension = fileName.split('.').pop() || 'jpg'
      const uniqueFileName = `pokemon-${timestamp}.${extension}`

      // Save to public folder using tryCatch
      const filePath = join(process.cwd(), 'public', uniqueFileName)
      const { error } = await tryCatch(
        Promise.resolve(writeFileSync(filePath, new Uint8Array(buffer)))
      )

      if (error) {
        console.error('Upload error:', error)
        return res.status(500).json({ error: 'Failed to upload file' })
      }

      // Return the public URL
      const publicUrl = `/${uniqueFileName}`

      return res.status(200).json({
        success: true,
        url: publicUrl,
        message: 'File uploaded successfully',
      })
    }
    default:
      return res.status(405).json({ error: 'Method not allowed' })
  }
}
