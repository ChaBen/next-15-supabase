// 'use client'

import { desc } from 'drizzle-orm'
import { db } from '@/db'
import { products } from '@/db/schema'
import { incrementInventory } from './incrementInventory'
import { Button } from '@/components/ui/button'

export default async function Home() {
  const data = await db
    .select()
    .from(products)
    .orderBy(desc(products.updatedAt))
  // const { data } = useQuery({
  //   queryKey: ['wines'],
  //   queryFn: async () =>
  //     await db.select().from(products).orderBy(desc(products.updatedAt)),
  // })

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <form action={incrementInventory}>
        <Button type="submit">Add</Button>
      </form>
    </div>
  )
}
