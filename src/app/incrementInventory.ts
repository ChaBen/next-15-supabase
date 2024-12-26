'use server'

import { db } from '@/db'
import { inventory } from '@/db/schema'
import { AnyColumn, eq, sql } from 'drizzle-orm'

const increment = (column: AnyColumn, value = 1) => {
  return sql`${column} + ${value}`
}

export async function incrementInventory() {
  await db
    .update(inventory)
    .set({
      quantity: increment(inventory.quantity, 1230),
    })
    .where(eq(inventory.id, 1))
}
