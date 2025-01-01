import { insertPostSchema } from '@/db/schema/posts'

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
