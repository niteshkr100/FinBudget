import { useEffect, useState } from "react";
import { Pencil } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Expenses } from "@/utils/schema";
import { db } from "@/utils/dbConfig";
import { eq } from "drizzle-orm";
import moment from 'moment'
import { toast } from "sonner";

const EditExpenseList = ({expense, refershData}) => {

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    
 useEffect(()=>{
    if(expense){
        setName(expense.name)
        setAmount(expense.amount)
    }

    // console.log("expense");
    // console.log( expense.id);
 }, [expense])
    
 const onUpdateExpense = async() =>{
    const result = await db.update(Expenses).set({
        name: name,
        amount: amount,
        createdAt:moment().format('DD/MM/YYYY')
    })
    .where(eq(Expenses.id, expense.id))
    .returning();

    if(result){
        refershData()
        toast( name + " Expense Updated")
    }
}
    
  return (
    <div>
      
    <Dialog>
    {/* open dialog box */}
    <DialogTrigger asChild>
    <Pencil className='text-primary cursor-pointer'/>
    </DialogTrigger>

    <DialogContent >
      <DialogHeader>
        <DialogTitle> Edit Expense</DialogTitle>
        <DialogDescription>
        <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input placeholder="e.g. Home Decoration" 
        defaultValue={expense?.name}
        onChange={(e)=>setName(e.target.value)} />
        </div>
        <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input type="number" placeholder="e.g. 5000$" 
        defaultValue={expense?.amount}
        onChange={(e)=>setAmount(e.target.value)} />
        </div>

        </DialogDescription>
      </DialogHeader>
      {/* submit */}
      <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
        {/* button */}
          <Button 
            className="mt-5 w-full" 
            disabled={!(name&&amount)}
            onClick={()=>onUpdateExpense()}
            >
            Update Expense
          </Button>

          </DialogClose>
        </DialogFooter>
    </DialogContent>

  </Dialog>
    </div>
  )
}

export default EditExpenseList
