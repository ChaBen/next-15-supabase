'use server'

import { PostForm } from './AddPost'
import { db } from '@/db'
import { posts, postsLike, postsRating } from '@/db/schema'
import { auth } from '@/lib/auth'
import { eq, and } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function AddPost(data: PostForm & { userId: string }) {
  await db.insert(posts).values({
    title: data.title,
    content: data.content,
    userId: data.userId,
  })

  revalidatePath('/dashboard')

  return { success: true }
}

export async function withAuth(userId?: string) {
  if (!userId) {
    redirect('/auth/login')
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/auth/login')
  }
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

export async function DeletePost(id: number, userId: string) {
  await withAuth(userId)

  const result = await db
    .delete(posts)
    .where(and(eq(posts.id, id), eq(posts.userId, userId)))
    .returning({ deletedId: posts.id })

  if (!result.length) {
    throw new Error('권한이 없거나 존재하지 않는 게시물입니다.')
  }

  revalidatePath('/dashboard')

  return { success: true }
}
