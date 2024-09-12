/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { useEffect, useState } from "react";
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetProduct from "../../budgets/_components/BudgetProduct";
import AddExpense from "../ _components/AddExpense"
import ExpenseListTable from "../ _components/ExpenseListTable"
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"
import EditBudget from "../ _components/EditBudget"
  


const ExpensesUi = ( {params}) => {

 const [budgetInfo, setBudgetInfo] = useState();
 const [expensesList, setExpensesList] = useState([]);
 

  //user from clerk
  const {user} = useUser();
  //route
  const route =  useRouter();

useEffect(()=>{
  //call when params get available
   user&&getBudgetInfo(); //budget call

     // it only work after render happen b/c it is possible that At the time of rendering component data of params is not available
    //and useEffect always render after the component render. so, we are able to see params
    if (params) {
        console.log(params.id);
      } else {
        console.log('params not yet available');
      }
}, [user])

/**
 * Get Budget Information
 */
// Fetch data from database and modified it by left joint
const getBudgetInfo = async()=>{

    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number), //tota sum
      totalItem:sql `count(${Expenses.id})`.mapWith(Number) //number of product
    }).from(Budgets) 
    .leftJoin(Expenses, eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
    .where(eq(Budgets.id, params.id))
    .groupBy(Budgets.id)

    //store result in variable
    setBudgetInfo(result[0]);
    // console.log("budget")
    // console.log(result);

    getExpensesList(); //expense call
}
/**
 * Get Expense Information
 */
  const getExpensesList = async() =>{

    const result = await db.select().from(Expenses)
    .where(eq(Expenses.budgetId, params.id))
    .orderBy(desc(Expenses.id));

    //  console.log("Expense")
    //  console.log(result);
     setExpensesList(result)
  }
 /**
  * Used to delete Budget
  */
 const deleteBudget = async() =>{

    const deleteExpenseResult = await db.delete(Expenses)
    .where(eq(Expenses.budgetId, params.id))
    .returning();

    if(deleteExpenseResult){
    const result = await db.delete(Budgets)
    .where(eq(Budgets.id, params.id))
    .returning();
   
    // console.log(result);

    route.push("/dashboard/budgets")
    }
    
 }


  return (
    <div className="p-10">
     <h2 className="text-3xl font-bold flex justify-between items-center">Add Expenses

     <div className="flex gap-2">
     {/* edit */}
     <EditBudget budgetInfo={budgetInfo} refershData={()=>getBudgetInfo()}/>
     {/* delete */}
     <AlertDialog>
        <AlertDialogTrigger asChild>
        <Button className="flex gap-2" variant="destructive">
        <Trash/> <span className="hidden sm:inline">Delete</span>
        </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your budgets
                and remove your data from our servers.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=>deleteBudget()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
     </AlertDialog>
     </div>
        </h2>
     
     <div className="grid grid-cols-1 md:grid-cols-2 mt-7 gap-3">
     {
        (budgetInfo)? ( <BudgetProduct budget={budgetInfo}/>):
        (<div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"> </div>)
     }
     {
        (budgetInfo)? 
        ( <AddExpense budgetId={params.id} refreshData={()=>getBudgetInfo()}/>):
        (<div className="h-[200px] w-full bg-slate-200 rounded-lg animate-pulse"> </div>)
     }
     </div>

     {/* expense table */}
     <div className="mt-4">
        <h2 className="font-bold text-lg">Latest Expense</h2>
        {expensesList?.length > 0 ? 
        ( 
          <ExpenseListTable expensesList={expensesList} refreshData={()=>getBudgetInfo()} getBudgetInfo={getBudgetInfo}/>
        )
        :
        (<img src={'https://cdni.iconscout.com/illustration/premium/thumb/expense-managing-app-illustration-download-in-svg-png-gif-file-formats--management-budget-accounting-business-concept-pack-illustrations-3561011.png?f=webp'}
            width={"50%"}
            height={"50%"}
            alt="list image"
        />)
        }
        
     </div>
    </div>
  )
}

export default ExpensesUi
