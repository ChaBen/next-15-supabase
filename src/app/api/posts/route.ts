import { db } from '@/db'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { posts, postsLike, postsRating, user } from '@/db/schema'
import { eq, sql, desc } from 'drizzle-orm'
import { withAuth } from '@/app/_middleware/withAuth'
import { zValidator } from '@hono/zod-validator'
import { createPostSchema } from '@/types/shared.types'

const app = new Hono().basePath('/api/posts')

app.get('/', async (c) => {
  try {
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
      .orderBy(desc(posts.createdAt))
      .execute()

    return c.json(
      {
        success: true,
        data,
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

app.get('/rating', async (c) => {
  return c.json({
    message: '리뷰가 조회되었습니다.',
  })
})

app.post(
  '/rating',
  withAuth,
  zValidator('json', createPostSchema),
  async (c) => {
    const body = await c.req.json()
    await db.insert(postsRating).values({
      postId: body.id,
      userId: body.userId,
      rating: Math.floor(Math.random() * 5) + 1,
    })

    return c.json(
      {
        message: '리뷰가 생성되었습니다.',
        data: body,
      },
      200,
    )
  },
)

app.post('/create', async (c) => {
  const body = await c.req.json()
  return c.json({
    message: '게시물이 생성되었습니다',
    data: body,
  })
})

export const GET = handle(app)
export const POST = handle(app)
