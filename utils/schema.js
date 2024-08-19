import { pgTable, serial, text, varchar, numeric, integer, references } from 'drizzle-orm/pg-core';

// This schema model of budget goes export to dbConfig.jsx for pushing to database neon at neon
export const Budgets = pgTable('budgets',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:varchar('amount').notNull(),
    icon:varchar('icon'),
    createdBy:varchar('createdBy').notNull()
})

// expenses model
export const Expenses = pgTable('expenses',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:numeric('amount').notNull().default(0),
    budgetId:integer('budgetId').references(()=>Budgets.id),
    createdAt:varchar('createdAt').notNull()

})

// npm run db:push  (to push data to neon table)
// npm run db:studio  (to see database at drizzle studio)
// NEXT_PUBLIC_POSTGRES_DATABASE_URL (write this in .env for using .env.local file instead of .env)