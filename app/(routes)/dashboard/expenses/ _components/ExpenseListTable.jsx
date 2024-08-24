import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import React, { useEffect } from 'react'
import { toast } from "sonner"
import EditExpenseList from "./EditExpenseList"

const ExpenseListTable = ({expensesList, refreshData, getBudgetInfo}) => {

  const deleteExpense = async(expense)=>{
    const result= await db.delete(Expenses)
    .where(eq(Expenses.id, expense.id))
    .returning()
    
    // console.log(result);
    if(result){
      refreshData()
      toast("Expense is deleted!")
    }
  }

  useEffect(()=>{
    console.log("ex");
    

    console.log(expensesList);
  })

  return (
    <div className='mt-3 border rounded-lg hover:shadow-md'>
       <div className='grid grid-cols-4 bg-slate-200 p-2 text-center text-sm sm:text-md'>
        <h2 className='font-bold'>Name</h2>
        <h2 className='font-bold'>Amount</h2>
        <h2 className='font-bold'>Date</h2>
        <h2 className='font-bold'>Action</h2>
       </div>
       {expensesList.map((expense)=> (
        <div className='grid grid-cols-4 bg-slate-50 p-2 text-center text-sm sm:text-md' key={expense.id}>
        <h2>{expense.name}</h2>
        <h2>${expense.amount}</h2>
        <h2>{expense.createdAt}</h2>
        <h2 className='flex justify-center items-center gap-2'>
            <EditExpenseList expense={expense} refershData={()=>getBudgetInfo()}/>
            <Trash className='text-red-600 cursor-pointer'
                onClick={()=>deleteExpense(expense)}
            />
          </h2>
        </div>
       ))}
       
    </div>
  )
}

export default ExpenseListTable
