/* eslint-disable react-hooks/exhaustive-deps */
'use client'
// --------------------------dashboard----------------------------------

import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
//  [[...rest]]/page.jsx for signin auth
//  import greetingTime from 'greeting-time'
import CardInfo from "./_components/CardInfo"
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql} from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import BarChartDashboard from "./_components/BarChartDashboard"
import PieChartDashboard from "./_components/PieChartDashboard"
import BudgetTable from "./_components/BudgetTable"


const Page = () => {

  const [budgetList, setBudgetList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const {user} = useUser();
  // const [greet, setGreet] = useState("")
  
  useEffect(()=>{
    user&&getBudgetList();
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

    // call all expense  after geting budgetList
    getAllExpenses();
  }

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
  //  const gt = greetingTime(new Date())
  //  setGreet(gt);
 })

  return (
    <div className='p-10'>
       <h2 className='font-bold text-3xl'>Hi, {user?.fullName}✌️</h2>
       <p className='text-slate-500'>Track Your Spending and Stay in Control: View Your Budget and Expense Summary.</p>
       <CardInfo budgetList={budgetList}/>
       <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
          <BarChartDashboard budgetList={budgetList}/>
        </div>
        <div>
           <PieChartDashboard budgetList={budgetList}/>
        </div>
       </div>
       <h2 className='font-bold text-lg mt-5'>All Budget List</h2>
       <BudgetTable budgetList={budgetList} refreshData={()=>getBudgetList()}/>
    </div>
 
  )
}

export default Page
