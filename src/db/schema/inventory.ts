import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { products } from './products'

export const inventory = pgTable('inventory', {
  id: serial('id').primaryKey(),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').notNull().default(0),
  status: text('status').notNull().default('available'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})

export type Inventory = typeof inventory.$inferSelect
export type InsertInventory = typeof inventory.$inferInsert
