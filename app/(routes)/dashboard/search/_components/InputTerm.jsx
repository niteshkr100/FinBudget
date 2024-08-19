 'use client'
import { UserButton, useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql} from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useRouter } from "next/navigation";
import Displayterm from "../page"
const InputTerm = () => {

    const [search, setSearch] = useState('');
    const [budgetData, setBudgetData] = useState([]);
    const [budgetSearchList, setBudgetSearchList] = useState([]);
    const [show, setShow] = useState(false);
  
    const router = useRouter();
    const user = useUser();
    // console.log(user);
    
    // console.log(user?.user?.primaryEmailAddress?.emailAddress);

    useEffect(()=>{
    //   console.log(search);
    },[search])
    
    /**
     * Get all budget
     */
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
    
       
        // console.log(result);
        if(result){
            setBudgetData(result)
            // console.log(result);
        }
        
        searchTerm ()
      }


      const searchTerm = () => {
        const result = budgetData.filter((budget) =>
          budget.name.toLowerCase().includes(search.toLowerCase())
        );
        // console.log("Search Result:", result);

        router.push("/dashboard/search");

        setBudgetSearchList(result);
        console.log(result);
        // console.log(budgetSearchList)

      };

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
      <button onClick={()=>{getBudgetList(), setShow(!show)}} className="bg-primary text-white p-2 rounded-r-md border-solid border-2 border-indigo-600">Search</button>
    </div>

      </div>
      <div>
        <UserButton/>
      </div>
    </div>
    {/* {show&&<Displayterm budgetSearchList={budgetSearchList}/>} */}
      
    </div>
  )
}

export default InputTerm
