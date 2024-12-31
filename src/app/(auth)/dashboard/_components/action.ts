'use server'

import { PostForm } from './AddPost'
import { db } from '@/db'
import { posts, postsLike, postsRating } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function AddPost(data: PostForm & { userId: string }) {
  await db.insert(posts).values({
    title: data.title,
    content: data.content,
    userId: data.userId,
  })

  revalidatePath('/dashboard')

  return { success: true }
}

export async function LikePost({ id, userId }: { id: number; userId: string }) {
  const existingLike = await db
    .select()
    .from(postsLike)
    .where(and(eq(postsLike.postId, id), eq(postsLike.userId, userId)))

  if (existingLike.length > 0) {
    await db.delete(postsLike).where(eq(postsLike.id, existingLike[0].id))
    return { success: true, message: 'You have unliked this post' }
  } else {
    await db.insert(postsLike).values({
      postId: id,
      userId: userId,
    })
    return { success: true, message: 'You have liked this post' }
  }
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
