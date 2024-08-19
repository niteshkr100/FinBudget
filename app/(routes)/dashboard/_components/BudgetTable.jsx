 
 import React, { useEffect } from 'react'
 
const BudgetTable = ({budgetList, refreshData}) => {
    
    
      useEffect(()=>{ 
        console.log(budgetList);
        refreshData()
      }, [budgetList])
    
      return (
        <div className='mt-3 border rounded-lg hover:shadow-md'>
           <div className='grid grid-cols-2 bg-slate-200 p-2 text-center text-sm sm:text-md'>
            <h2 className='font-bold'>Budget</h2>
            <h2 className='font-bold'>Amount</h2>
       
           </div>
           {budgetList.map((budget)=> (
            <div className='grid grid-cols-2 bg-slate-50 p-2 text-center text-sm sm:text-md'>
            <h2>{budget.name}</h2>
            <h2>${budget.amount}</h2>
            </div>
           ))}
           
        </div>
  )
}

export default BudgetTable
