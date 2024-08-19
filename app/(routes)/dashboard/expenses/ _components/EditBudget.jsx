import { PenBox, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import EmojiPicker from 'emoji-picker-react';
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
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";


const EditBudget = ({budgetInfo, refershData}) => {

    const [emojiIcon, setEmojiIcon] = useState();
    const [openEmojiPicker, setEmojiPicker] = useState(false);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");

   //we use useEffect to update data b/c by directy write data of budgetInfo in useState. Its value is not access before component render and value is not display.
// By using useEffect Hook after Rendering the component data is set. so, data do not miss
useEffect(()=>{
    if(budgetInfo){
        setEmojiIcon(budgetInfo.icon)
        setName(budgetInfo.name)
        setAmount(budgetInfo.amount)
    }
}, [budgetInfo]); //if buggetInfo available then  call useEffect
const onUpdateBudget = async() =>{
    const result = await db.update(Budgets).set({
        name: name,
        amount: amount,
        icon: emojiIcon,
    })
    .where(eq(Budgets.id, budgetInfo.id))
    .returning();

    if(result){
        refershData()
        toast("Budget Updated")
    }
}

  return (

    <div>
     <Dialog>
    {/* open dialog box */}
    <DialogTrigger asChild>
    <Button className="flex items-center gap-2">
     <PenBox/>Edit
     </Button>
    </DialogTrigger>

    <DialogContent >
      <DialogHeader>
        <DialogTitle> Edit Budget</DialogTitle>
        <DialogDescription>
        <div className="mt-5">
        <Button variant="outline" size="lg" onClick={()=>setEmojiPicker(!openEmojiPicker)} className="text-lg">
        {emojiIcon}
        </Button>
        <div className="absolute z-10">
        {/* open take value if it is true it will show or it is false it will hidden */}
        <EmojiPicker
        open={openEmojiPicker} //true(show) or false(hidden)
        onEmojiClick={(e)=>{
          setEmojiIcon(e.emoji)
          setEmojiPicker(false)
               }}/> 
        </div>
        </div>
        <div className="mt-2">
        <h2 className="text-black font-medium my-1">Budget Name</h2>
        <Input placeholder="e.g. Home Decoration" 
        defaultValue={budgetInfo?.name}
        onChange={(e)=>setName(e.target.value)} />
        </div>
        <div className="mt-2">
        <h2 className="text-black font-medium my-1">Budget Amount</h2>
        <Input type="number" placeholder="e.g. 5000$" 
        defaultValue={budgetInfo?.amount}
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
            onClick={()=>onUpdateBudget()}
            >
            Update Budget
          </Button>

          </DialogClose>
        </DialogFooter>
    </DialogContent>

  </Dialog>
    </div>
  )
}

export default EditBudget
