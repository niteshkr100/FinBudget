 /* eslint-disable react-hooks/exhaustive-deps */
 import React, { useEffect } from 'react'
 
 const ExpenseTable = ({expensesList, refreshData}) => {
     
     
       useEffect(()=>{ 
        //  console.log(expensesList);
         refreshData()
       }, [expensesList])
     
       return (
        <div className='mt-7 border rounded-lg hover:shadow-md'>
        <div className='grid grid-cols-3 bg-slate-200 p-2 text-center text-sm sm:text-md'>
         <h2 className='font-bold'>Name</h2>
         <h2 className='font-bold'>Amount</h2>
         <h2 className='font-bold'>Date</h2>
          
        </div>
        {expensesList.map((expense)=> (
         <div className='grid grid-cols-3 bg-slate-50 p-2 text-center text-sm sm:text-md'>
         <h2>{expense.name}</h2>
         <h2>${expense.amount}</h2>
         <h2>{expense.createdAt}</h2>
         </div>
        ))}
        
     </div>
   )
 }
 
 export default ExpenseTable
 