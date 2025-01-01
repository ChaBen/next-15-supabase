import { insertPostSchema } from '@/db/schema/posts'
import { z } from 'zod'

export const createPostSchema = insertPostSchema
  .pick({
    title: true,
    content: true,
    userId: true,
  })
  .refine((data) => data.title || data.content, {
    message: 'Either Title or Content must be provided',
    path: ['title', 'content'],
  })

export const paginationSchema = z.object({
  limit: z.number({ coerce: true }).optional().default(10),
  page: z.number({ coerce: true }).optional().default(1),
})

export type ErrorResponse = {
  success: false
  error: string
  isFormError?: boolean
}
