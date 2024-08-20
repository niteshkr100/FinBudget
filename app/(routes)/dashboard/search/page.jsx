'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BudgetProduct from '../budgets/_components/BudgetProduct'
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs';

const Displayterm = ({ budgetSearchList }) => {

  const searchParams = useSearchParams();
  const query = searchParams.get('query') || ''; // Access the query parameter

  const [budgetList, setBudgetList] = useState([]);

  // user data from cleark
  const user = useUser();
  // console.log(user.user?.primaryEmailAddress?.emailAddress);
  
  // Query keyword
  useEffect(() => {
    if (query) {
      console.log('Search Query:', query); // Logs the search term
      
      //call budget function when query is available
      getBudgetList()
    }

   

  }, [query]);

 
//Fetch data from database
const getBudgetList = async()=>{

  // fetch data from neon database
  //----------- Used to get budget List---------
  const result = await db.select({
    ...getTableColumns(Budgets),
    totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number), //tota sum
    totalItem:sql `count(${Expenses.id})`.mapWith(Number) //number of product
  }).from(Budgets) 
  .leftJoin(Expenses, eq(Budgets.id,Expenses.budgetId))
  .where(eq(Budgets.createdBy, user?.user?.primaryEmailAddress?.emailAddress))
  .groupBy(Budgets.id)
  .orderBy(desc(Budgets.id));

  // console.log("sear");
  // console.log(result);


  //rectified require data
  const resultRequire = result.filter((budget)=>{
    return budget.name.toLowerCase().includes(query.toLowerCase())
  })
  
  console.log(resultRequire);
  //store require data with useState hook
  setBudgetList(resultRequire);
  
}

  
  return (
    <div className='p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
      {budgetList?.length > 0 ? (
        budgetList.map((budget, index) => (
          <BudgetProduct key={index} budget={budget} />
        ))
      ) : (
        <h2 className='font-bold text-3xl'>Not Found</h2>
      )
      }
    </div>
  )
}

export default Displayterm;

 


 // useEffect(() => {
  //   if (query.query) {
  //     setSearchQuery(query.query);
  //     console.log('Search Query:', query.query); // logs 'car'
  //   }
  // }, [query.query]);