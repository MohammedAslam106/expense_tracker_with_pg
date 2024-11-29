import { pgEnum, pgTable, real, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./user";
import { categoriesTable } from "./categories";

export const paymentStatus=pgEnum('payment_status',[
    'Paid','Partialy Paid','Unpaid'
])

export const expensesTable=pgTable('expenses',{
    id: uuid().primaryKey().defaultRandom(),
    userId:text('user_id').references(()=>users.id),
    title:varchar('title',{length:200}).notNull(),
    description: text('description').notNull(),
    amount: real('amount').notNull(),
    status: paymentStatus('payment_status').$defaultFn(()=>'Unpaid'),
    createdAt:timestamp('createdAt').$defaultFn(()=> new Date()),
    updatedAt:timestamp('updatedAt').$defaultFn(()=> new Date())
})


// This is many to many relationship between expenses and categories.
export const expenseCategoryRelation=pgTable('expense_category',{
    expenseId:uuid('expense_id').references(()=>expensesTable.id),
    categoryId:uuid('category_id').references(()=>categoriesTable.id)
})

