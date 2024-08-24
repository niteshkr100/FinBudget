'use client'

import { PiggyBank, Receipt, Wallet } from "lucide-react"
import { useEffect, useState } from "react";

 
const CardInfo = ({budgetList}) => {

    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);

//     useEffect(()=>{
//         CalculateCardInfo()
     
//     },[budgetList])

//     //calculate cardInfo data
//    const CalculateCardInfo = () =>{
//         // console.log(budgetList);

//     let totalBudget_ = 0;
//     let totalSpend_ = 0;
//       budgetList.forEach(element => {
//         totalBudget_ = totalBudget_ + Number(element.amount);
//         totalSpend_ =  totalSpend_ + element.totalSpend;
//       });
//       console.log(totalBudget_, totalSpend_);
//       setTotalBudget(totalBudget_);
//       setTotalSpend(totalSpend_);

//    }
     
// calculate cardInfo data
const CalculateCardInfo = useCallback(() => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    budgetList.forEach((element) => {
        totalBudget_ = totalBudget_ + Number(element.amount);
        totalSpend_ =  totalSpend_ + element.totalSpend;
    });
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  }, [budgetList]);

  useEffect(() => {
    CalculateCardInfo();
  }, [budgetList, CalculateCardInfo]);


  return (
    <div>
    {budgetList?.length>0 ? 
    (<div className="mt-7 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5">
       <div className="border rounded-lg p-7 flex items-center justify-between">
           <div>
              <h2 className="text-sm">Total Budgets</h2>
              <h2 className="font-bold text-2xl">${totalBudget}</h2>
           </div>
           <PiggyBank className="bg-primary text-white p-3 h-12 w-12 rounded-full"/>
       </div>
       <div className="border rounded-lg p-7 flex items-center justify-between">
           <div>
              <h2 className="text-sm">Total Spend</h2>
              <h2 className="font-bold text-2xl">${totalSpend}</h2>
           </div>
           <Receipt className="bg-primary text-white p-3 h-12 w-12 rounded-full"/>
       </div>
       <div className="border rounded-lg p-7 flex items-center justify-between">
           <div>
              <h2 className="text-sm">No. of Budgets</h2>
              <h2 className="font-bold text-2xl">{budgetList.length}</h2>
           </div>
           <Wallet className="bg-primary text-white p-3 h-12 w-12 rounded-full"/>
       </div>
  
    </div>)
    :
    (<div className="mt-7 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1,2,3].map((item, index)=>(
            <div className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg">

            </div>
        ))}
    </div>)
    }
    
    </div>
  )
}

export default CardInfo
