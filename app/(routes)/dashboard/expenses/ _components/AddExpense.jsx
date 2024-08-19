'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { db } from "@/utils/dbConfig"
import { Budgets, Expenses } from "@/utils/schema"
import { useState } from "react"
import { toast } from "sonner"
import moment from 'moment'

const AddExpense = ({budgetId, refreshData}) => {

  const [name, setName] = useState();
  const [amount, setAmount] = useState();

/*
inset expense Data to Database from user
*/
const addNewExpense = async()=>{
    const result = await db.insert(Expenses).values({
        name:name,
        amount:amount,
        budgetId:budgetId,
        createdAt:moment().format('DD/MM/YYYY')
    }).returning({insertedId:Budgets.id})

    // console.log("expense" + result);

    setAmount('');
    setName('');
    if(result){
        refreshData()
        toast("New Expense Added!")
         
    }
    
}

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="text-lg font-bold">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input value={name} placeholder="e.g. Home Decoration" onChange={(e)=>setName(e.target.value)} />
        </div>
        <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input type="number" value={amount} placeholder="e.g. 5000$" onChange={(e)=>setAmount(e.target.value)} />
        </div>
        <Button 
        disabled={!(name&&amount)} 
        className="w-full mt-3"
        onClick={()=>addNewExpense()}
        >Add New Expense
        </Button>
    </div>
  )
}

export default AddExpense
