/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetProduct from './BudgetProduct'
import { Skeleton } from "@/components/ui/skeleton"


const BudgetList = () => {
  
  const [budgetList, setBudgetList] = useState([]);

  //user from clerk
  const {user} = useUser();

  useEffect(()=>{
    user&&getBudgetList();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const getBudgetList = async()=>{

    // fetch data from neon database
    //----------- Used to get budget List---------
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number), //tota sum
      totalItem:sql `count(${Expenses.id})`.mapWith(Number) //number of product
    }).from(Budgets) 
    .leftJoin(Expenses, eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id));


    setBudgetList(result);
    // console.log(result);
    
  }
  
  return (
    <div className='mt-7'>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
   {/* 2 */}
      <CreateBudget refreshData={()=> getBudgetList()}  />
      {budgetList.length > 0 ? ( budgetList.map((budget, index)=>(
       <BudgetProduct budget={budget}/>
      ))
    ): 
    ( [1,2,3,4,5,6].map((item, index)=>(
      <div key={index} className='w-full bg-slate-200 rounded-lg h-[160px] animate-pulse'> 
      
      </div>
    ))
    )
      } 
    
    </div>
    </div>
  )
}

export default BudgetList
