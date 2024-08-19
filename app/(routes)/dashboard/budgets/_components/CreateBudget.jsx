"use client"

import { useState } from "react";
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
import { Button } from "@/components/ui/button"
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner"


const CreateBudget = ({refreshData }) => {

  const [emojiIcon, setEmojiIcon] = useState('🙂');
  const [openEmojiPicker, setEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  //user data from clerk useUser hook
  const {user} = useUser();
  // console.log(user);
  
  //on click create button send data to database neon
  const onCreateBudget = async() =>{
    const email = user?.primaryEmailAddress?.emailAddress;
    console.log(email);

    const result = await db.insert(Budgets).values({
      name:name,
      amount:amount,
      createdBy:email,
      icon:emojiIcon
    }).returning({insertedId:Budgets.id})

    if(result){
      refreshData() // (1)Call refreshData after a successful budget creation
      toast("New Budget created!")
    }else{
      toast(error);
    }
  }

    // Function to handle key down event
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && name && amount) {
        onCreateBudget();
        e.preventDefault(); // prevent the form from submitting
      }
    }

  return (
    <div>
    <Dialog>
    {/* open dialog box */}
    <DialogTrigger asChild>
    <div className='bg-slate-100 p-10 rounded-md flex flex-col items-center border-2 border-dashed cursor-pointer hover:shadow-md'>
    <h2 className='text-3xl'>+</h2>
    <h2>Create New Budget</h2>
    </div>
    </DialogTrigger>

    <DialogContent onKeyDown={handleKeyDown}>
      <DialogHeader>
        <DialogTitle>Create New Budget</DialogTitle>
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
        <Input placeholder="e.g. Home Decoration" onChange={(e)=>setName(e.target.value)} />
        </div>
        <div className="mt-2">
        <h2 className="text-black font-medium my-1">Budget Amount</h2>
        <Input type="number" placeholder="e.g. 5000$" onChange={(e)=>setAmount(e.target.value)} />
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
            onClick={onCreateBudget}
            >
            Create Budget
          </Button>

          </DialogClose>
        </DialogFooter>
    </DialogContent>

  </Dialog>
    </div>
  )
}

export default CreateBudget
