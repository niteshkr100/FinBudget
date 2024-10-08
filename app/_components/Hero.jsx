'use client'

import { useUser } from "@clerk/nextjs";
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Footer from "./Footer";
import Foot from "./Foot"

const Hero = () => {

//  const route = useRouter();
 const user = useUser();

//  console.log(user)

 
  return (
  <section className="bg-gray-50 flex items-center flex-col">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        {/* Manage Your Expense */}
        Manage Your Money
        <strong className="font-extrabold text-primary block sm:block">
         {/* Save your Money. */}
         Build Your Wealth
          </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
     Start creating your budget and save money.
      </p>


      <div className="mt-8 flex flex-wrap justify-center gap-4">
      {user?.isSignedIn? 
      (
        <Link
          className="cursor-pointer block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
           href={"/dashboard/budgets"}
        >
          Get Started
        </Link>)
       :
      (<a
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          href="/sign-in"
            
        >
            Create Budget
        </a>)
        }
        

        {/* <a
          className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
          href="#"
        >
          Learn More
        </a> */}
      </div>
    </div>
  </div>
  <Image
    src={'/dash.jpg'}
    width={1000}
    height={700}
    alt="dashbord"
    className="mt-0 rounded-xl border-2  mb-1 sm:mt-5"
  />
  <Footer/>
  {/* <Foot/> */}
</section>
  )
}

export default Hero
