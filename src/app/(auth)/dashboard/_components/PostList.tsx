import { db } from '@/db'
import { posts, user } from '@/db/schema'
import { eq } from 'drizzle-orm'

export default async function PostList() {
  const data = await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      user: {
        name: user.name,
        email: user.email,
      },
    })
    .from(posts)
    .innerJoin(user, eq(posts.userId, user.id))

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <p>{item.content}</p>
          <p>{item.user.name}</p>
          <p>{item.user.email}</p>
        </div>
      ))}
    </div>
  )
}
