import { ErrorResponse } from '@/types/shared.types'
import client from './index'

export async function getPosts({
  limit,
  page,
}: {
  limit: number
  page: number
}) {
  const res = await client.posts.$get({
    query: {
      limit: limit.toString(),
      page: page.toString(),
    },
  })
  if (!res.ok) {
    const data = (await res.json()) as unknown as ErrorResponse
    throw new Error(data.error)
  }
  const data = await res.json()

  return data
}

export async function createPostRating({
  id,
  userId,
}: {
  id: number
  userId: string
}) {
  const res = await client.posts.rating.$post({
    json: { id, userId },
  })

  if (!res.ok) {
    const data = (await res.json()) as unknown as ErrorResponse
    throw new Error(data.error)
  }
  const data = await res.json()

  return data
}
