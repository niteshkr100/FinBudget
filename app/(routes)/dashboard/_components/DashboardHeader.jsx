'use client'
import { UserButton } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import BudgetProduct from "../budgets/_components/BudgetProduct";

import Displayterm from "../search/page";
import { useRouter } from "next/navigation";
import InputTerm from "../search/_components/InputTerm"

const DashboardHeader = ({budgetData}) => {

  const [search, setSearch] = useState('');
  const [budgetSearchList, setbudgetSearchList] = useState([]);

  const router = useRouter();

  useEffect(()=>{
    search&&
    console.log(search);
  },[search])

   // Effect to log budgetSearchList changes
   useEffect(() => {
    // console.log("Updated budgetSearchList:", budgetSearchList);
    
    setSearch("")
  }, [budgetSearchList]);


  const searchTerm=()=>{
      const result = budgetData.filter((budget)=>{
        return budget.name.toLowerCase().includes(search.toLowerCase())
      })
      // console.log('Search Result:');
  
      // console.log(result);
      if(result){
        setbudgetSearchList(result);
      }
      // setbudgetSearchList(result);
      // console.log(budgetSearchList);
      
      // Update the URL with the search keyword
      router.push(`/dashboard/search?query=${encodeURIComponent(search)}`);
  }
  
  return (
    <div>
       <div className="p-5 pl-8  border-b shadow-sm flex justify-between items-center">
      <div>
      <div className="flex items-center  ">
      <input
      autoComplete="off"
      type="text"
      placeholder="Search Budget"
      className="p-2 border text-black rounded-l-md focus:outline-none focus:border-[0.5px] focus:border-slate-500 w-80"
      value={search}
       onChange={(e)=>setSearch(e.target.value)}
      />
      <button onClick={()=>searchTerm()} className="bg-primary text-white p-2 rounded-r-md border-solid border-2 border-indigo-600">Search</button>
    </div>

      </div>
      <div>
        <UserButton/>
      </div>
    </div>
    {/* <BudgetProduct budget={budgetSearchList}/> */}
     {/* <Displayterm budgetSearchList={budgetSearchList}/> */}
      
    </div>
  )
}

export default DashboardHeader
 

 





