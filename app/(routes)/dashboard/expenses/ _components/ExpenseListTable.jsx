import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import React, { useEffect } from 'react'
import { toast } from "sonner"
import EditExpenseList from "./EditExpenseList"
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ExpenseListTable = ({expensesList, refreshData, getBudgetInfo}) => {
  const [loader, setLoader] = useState(false);

  const deleteExpense = async(expense)=>{
    const result= await db.delete(Expenses)
    .where(eq(Expenses.id, expense.id))
    .returning()
    
    // console.log(result);
    if(result){
      refreshData()
      toast("Expense is deleted!")
    }
  }

  useEffect(()=>{
    console.log("ex");
    console.log(expensesList);
  })

  //pdf------
  const downloadPDF = () =>{
    //select element
    const capture = document.querySelector('.extable');
    setLoader(true);//to show downloading

    //html2canvas return promise
    html2canvas(capture).then((canvas)=>{
      const imgData = canvas.toDataURL('img/png');//type of data
      //pdf format
      const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      });;//format
      // const componentWidth = doc.internal.pageSize.getWidth();//size of width
      // const componentHeight = doc.internal.pageSize.getHeight();//size of height
       // Define fixed size for the image in PDF
      const imgWidth = 200; // Width in mm
      const imgHeight = 60; // Height in mm
      doc.addImage(imgData, 'PNG', 5, 50, imgWidth, imgHeight);
      setLoader(false);
      doc.save('receipt.pdf');
    })
  }

  return (
    <div>
    <div className='extable mt-3 border rounded-lg hover:shadow-md'>
       <div className='grid grid-cols-4 bg-slate-200 p-2 text-center text-sm sm:text-md'>
        <h2 className='font-bold'>Name</h2>
        <h2 className='font-bold'>Amount</h2>
        <h2 className='font-bold'>Date</h2>
        <h2 className='font-bold'>Action</h2>
       </div>
       {expensesList.map((expense)=> (
        <div className='grid grid-cols-4 bg-slate-50 p-2 text-center text-sm sm:text-md' key={expense.id}>
        <h2>{expense.name}</h2>
        <h2>${expense.amount}</h2>
        <h2>{expense.createdAt}</h2>
        <h2 className='flex justify-center items-center gap-2'>
            <EditExpenseList expense={expense} refershData={()=>getBudgetInfo()}/>
            <Trash className='text-red-600 cursor-pointer'
                onClick={()=>deleteExpense(expense)}
            />
          </h2>
        </div>
       ))}
       
    </div>
    <Button className="mt-5" onClick={downloadPDF}>
          {loader?(
            <span>Downloading</span>
          ):(
            <span>Download Pdf</span>
          )}
    </Button>
    </div>
  )
}

export default ExpenseListTable
