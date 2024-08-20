 "use client"

import Image from 'next/image'
import {   LayoutDashboard, LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
 

function Siderbar() {
// give url of curent path
  const path = usePathname();
//route
 

  useEffect(()=>{
    // we can route url on consoling it
  //  console.log(path);
   
  })


  const menuList = [
    {
        id: 1,
        name:'Dashboard',
        icon:LayoutDashboard,
        path:'/dashboard'
    },
    {
        id: 2,
        name:'Budgets',
        icon:PiggyBank,
        path:'/dashboard/budgets'
    },
    {
        id: 3,
        name:'Expenses',
        icon:ReceiptText,
        path:'/dashboard/expenses'
    },
    {
        id: 4,
        name:'Upgrade',
        icon:ShieldCheck,
        path:'/dashboard/upgrade'
    },
  ]
   const route = useRouter();
   const website = () =>{
    route.push("/")
   }
  return (
    <div className='h-screen p-5 border shadow-sm'>
    {/* icon */}
    <div className='flex items-center cursor-pointer' onClick={website}>
      <Image
        src={'/wallet.svg'}
        width={50}
        height={40}
        alt='logo'
        className='mx-5'
      />
      <p>FinBuddy</p>
      </div>
    {/* list */}
    <div className='mt-5'>
    {menuList.map((list)=>(
       <Link href={list.path} key={list.id}>
        <h2 key={list.id}
        // added dynamic style with backtick, if path(next js) == click we on path manulist then show colorstyle
        className={`flex gap-2 items-center text-gray-500 font-medium mb-2 p-5 cursor-pointer rounded-md hover:bg-blue-100 hover:text-primary
        ${path == list.path&&'text-primary bg-blue-100'}
        ` }>
             <list.icon/>
            {list.name}
        </h2>
        </Link>
    ))}
    </div>
    <div className='fixed bottom-10 p-5 flex items-center gap-2'>
        <UserButton/>
        Profile
  
    </div>
    </div>
  )
}


export default Siderbar
