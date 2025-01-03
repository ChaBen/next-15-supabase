import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import AddPost from './_components/AddPost'
import { Suspense } from 'react'
import PostListClient from './_components/PostListClient'

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <div className="container p-6">
      <PostListClient userId={session?.user?.id as string} />
      <AddPost userId={session?.user?.id as string} />
    </div>
  )
}
