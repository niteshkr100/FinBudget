/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql} from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import React, {useEffect, useState } from 'react'
import ExpenseTable from "./_ExpenseTable/ExpenseTable"
import { useUser } from '@clerk/nextjs'
import ExpenseTimeChart from "./_ExpenseTable/ExpenseTimeChart"

const page = () => {
    const [expenseList, setExpenseList] = useState([]);

    const {user} = useUser();

// dashboard all expense
   const getAllExpenses = async() =>{
    const result = await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt:Expenses.createdAt
    }).from(Budgets)
    .rightJoin(Expenses, eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(Expenses.id))

    //store data in expenseList
    setExpenseList(result)
    // console.log(result);
  }

  useEffect(()=>{
    getAllExpenses();
  })

  return (
    <div className='p-10'>
       <h2 className='font-bold text-3xl mb-7'>My Expense</h2>
       {expenseList.length > 0 ?
        (<ExpenseTable expensesList={expenseList} refreshData={()=>getAllExpenses()}/>):
        (<div className="h-[330px] w-full bg-slate-200 rounded-lg animate-pulse"> </div>)
       }
       
       <h2 className='font-bold text-lg mt-7'>Activity</h2>
       <ExpenseTimeChart expensesList={expenseList}/>
    </div>
  )
}

export default page
