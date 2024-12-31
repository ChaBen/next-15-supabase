import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import AddPost from './_components/AddPost'
import { Suspense } from 'react'
import PostList from './_components/PostList'

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <div>
      <h1>add post</h1>
      {session?.user?.id}
      <Suspense>
        <PostList userId={session?.user?.id as string} />
      </Suspense>
      <AddPost userId={session?.user?.id as string} />
    </div>
  )
}
