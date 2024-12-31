'use server'

import { PostForm } from './AddPost'
import { db } from '@/db'
import { posts, postsRating } from '@/db/schema'
import { eq } from 'drizzle-orm'
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
export async function RatingPost({
  id,
  userId,
}: {
  id: number
  userId: string
}) {
  await db.insert(postsRating).values({
    postId: id,
    userId: userId,
    rating: Math.floor(Math.random() * 5) + 1,
  })
  revalidatePath('/dashboard')

  return { success: true }
}

export async function DeletePost(id: number) {
  await db.delete(posts).where(eq(posts.id, id))
  revalidatePath('/dashboard')

  return { success: true }
}
