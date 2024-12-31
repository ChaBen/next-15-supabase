import { Button } from '@/components/ui/button'
import { db } from '@/db'
import { posts, user } from '@/db/schema'
import { postsRating } from '@/db/schema/posts'
import { eq, sql, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { DeletePost, RatingPost } from './action'

export default async function PostList({ userId }: { userId: string }) {
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

  console.log(data)

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <p>{item.content}</p>
          <p>{item.user.name}</p>
          <p>{item.user.email}</p>
          <div className="flex items-center gap-2">
            <p>
              Rating: {item.rating.avg} ({item.rating.count})
            </p>
            <form
              action={async () => {
                'use server'
                await RatingPost({
                  id: Number(item.id),
                  userId: userId,
                })
              }}
            >
              <Button>Raking 5</Button>
            </form>
            <form
              action={async () => {
                'use server'
                await DeletePost(Number(item.id))
              }}
            >
              <Button>Delete</Button>
            </form>
          </div>
        </div>
      ))}
    </div>
  )
}
