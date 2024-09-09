"use client"

import MobileNav from "./MobileNav"
import Image from "next/image"
import {user, isSignedIn, UserButton, useUser} from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
// import { Button } from "../../components/ui/button"
 

const Header = () => {
//clerk hook
  const {user, isSignedIn} = useUser();

  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
    <div className="flex items-center">
      <Image
      src={'./wallet.svg'}
      width={30}
      height={20}
      alt="logo"
      className="mx-2"
      />
      FinBuddy
     </div>
 
 <div className="flex gap-2">
     {/* check user signIn or not */}
     {isSignedIn?
      <UserButton style={{ height: '50px' }}/> 
      : 
      <Link href={"/sign-in"}>
       <Button>Login</Button>
        {/* <Button>Get started</Button> */}
      </Link>
     }
    {/* <MobileNav/> */}
    </div>
    </div>
  )
}

export default Header
