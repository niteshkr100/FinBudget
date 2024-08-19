'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const BudgetProduct = ({budget}) => {

  //define route (better option then Link tag b/c do not render whole page)
  const route = useRouter();

  //calculate percentage of spend
  const calculateProgressPrec =()=>{
      // (spend/amount)*100
      const perc = (budget?.totalSpend/budget?.amount)*100;
      return perc.toFixed(2);
  }

  return (
    <div className='p-5 border rounded-lg hover:shadow-md cursor-pointer h-[160px]' onClick={()=>route.push('/dashboard/expenses/'+ budget?.id)}>{/* box3 */}
    {/* // <Link href={'/dashboard/expenses/'+ budget?.id} className='p-5 border rounded-lg hover:shadow-md cursor-pointer'>box3 */}
    
    {/* box1 */} 
    <div className='flex gap-2 items-center justify-between'>
    {/* box-1a */}
       <div className='flex gap-2 items-center'>
        <h2 className='text-3xl p-3 px-4 bg-slate-100 rounded-full'>{budget?.icon}</h2>
       <div>
        <h2 className='font-bold'>{budget?.name}</h2>
        <h2 className='text-sm text-gray-500'>{budget?.totalItem} Item</h2>
       </div>
       </div>
       {/* box1-b */}
       <h2 className='font-bold text-primary text-lg'>${budget?.amount}</h2>
     </div>
     {/* box-2 */}
       <div className='mt-5'>
       {/* box-2-a */}
          <div className='flex items-center justify-between mb-3'>
            <h2 className='text-xs text-slate-400'>${budget?.totalSpend?budget.totalSpend:0} Spend</h2>
            <h2 className='text-xs text-slate-400'>${budget?.amount - budget?.totalSpend} Remaining</h2>
          </div>
        {/* box-2-b */}
        <div className='w-full bg-slate-300 h-2 rounded-full'>
          <div className='bg-primary h-2 rounded-full' 
          style={{width:`${calculateProgressPrec()}%`}}>
          </div>
        </div>

       </div>
    </div>  
    // </Link>
  )
}

export default BudgetProduct
