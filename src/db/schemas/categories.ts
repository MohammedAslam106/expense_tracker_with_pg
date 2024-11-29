import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./user";


export const categoriesTable=pgTable('category',{
    id:uuid('id').primaryKey().$defaultFn(()=>crypto.randomUUID()),
    userId:text('user_id').references(()=>users.id),
    title:varchar('title',{length:200}).notNull(),
    description:text('description').notNull(),
    createdAt:timestamp().$defaultFn(()=> new Date()),
    updatedAt:timestamp().$defaultFn(()=> new Date())
})
