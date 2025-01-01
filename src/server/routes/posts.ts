import { Hono } from 'hono'
import { posts, postsRating, user } from '@/db/schema'
import { eq, sql, desc, countDistinct } from 'drizzle-orm'
import { withAuth } from '../middleware/withAuth'
import { zValidator } from '@hono/zod-validator'
import { db } from '@/db'
import { paginationSchema } from '@/types/shared.types'

export const postRouter = new Hono()
  .get('/', zValidator('query', paginationSchema), async (c) => {
    try {
      const { limit, page } = c.req.valid('query')

      const offset = (page - 1) * limit

      const [count] = await db
        .select({ count: countDistinct(posts.id) })
        .from(posts)

      const data = await db
        .select({
          id: posts.id,
          title: posts.title,
          content: posts.content,
          user: {
            name: user.name,
            email: user.email,
          },
          rating: {
            avg: sql<number>`ROUND(COALESCE(AVG(${postsRating.rating}), 0), 1)`,
            count: sql<number>`COUNT(${postsRating.rating})`,
          },
          createdAt: posts.createdAt,
        })
        .from(posts)
        .innerJoin(user, eq(posts.userId, user.id))
        .leftJoin(postsRating, eq(posts.id, postsRating.postId))
        .groupBy(
          posts.id,
          posts.title,
          posts.content,
          user.name,
          user.email,
          posts.createdAt,
        )
        .limit(limit)
        .offset(offset)
        .orderBy(desc(posts.createdAt))

      return c.json(
        {
          success: true,
          data,
          count: count.count,
          limit,
          page,
        },
        200,
      )
    } catch (error: any) {
      return c.json(
        {
          success: false,
          error: error.message,
        },
        500,
      )
    }
  })
  .post('/rating', withAuth, async (c) => {
    const body = await c.req.json()

    await db
      .insert(postsRating)
      .values({
        postId: body.id,
        userId: body.userId,
        rating: Math.floor(Math.random() * 5) + 1,
      })
      .execute()

    return c.json(
      {
        message: '리뷰가 생성되었습니다.',
        data: body,
      },
      200,
    )
  })
