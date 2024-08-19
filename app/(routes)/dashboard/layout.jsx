"use client"
import Siderbar from "./_components/Siderbar";
import DashboardHeader from "./_components/DashboardHeader";
import { db } from "../../../utils/dbConfig";
import { Budgets } from "../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
 

const DashboardLayout = ({children}) => {

  const {user} = useUser();
  const route = useRouter();
  const [budgetData, setBudgetData] = useState([]);


  useEffect(()=>{
    user&&checkUserBudgets();
  }, [user])

  // budget function
  const checkUserBudgets = async() =>{
    // fetch data from database neon
    const result = await db.select().from(Budgets).where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress));

    // console.log("dash");
    // send this data to searchNav
    setBudgetData(result)
    // console.log(result);
    // This checks if result is neither null nor undefined before attempting to access its length property. If result is null or undefined, result?.length will return undefined instead of throwing an error.
    if(result?.length == 0){ //if o budget redirect to budget page
      route.replace("/dashboard/budgets"); //or route.push("/dashboard/budgets")

    }
    
  }

  return (
    <div>
    {/* sidebar component */}
    <div className="fixed md:w-64 hidden md:block">
        <Siderbar/>
    </div>
    {/* page.jsx component render as child */}
    <div className="md:ml-64">
    <DashboardHeader budgetData={budgetData}/>
    {/* search */}
      {children}
    </div>
      
    </div>
  )
}

export default DashboardLayout
