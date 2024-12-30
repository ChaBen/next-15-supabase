'use server'

import { PostForm } from './AddPost'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { revalidatePath } from 'next/cache'

export async function AddPost(data: PostForm & { userId: string }) {
  const newPost = await db.insert(posts).values({
    title: data.title,
    content: data.content,
    userId: data.userId,
  })

  revalidatePath('/dashboard')

  return { success: true }
}
