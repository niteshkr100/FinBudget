'use client'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const MobileNav = () => {

  const pathname = usePathname();

  return (
     <section className="w-full max-w-[264px] bg-white">
        <Sheet>
        <SheetTrigger asChild>
            <Image
              src="/hum.svg"
              width={36}
              height={36}
              alt="Hamburger icon"
              className="cursor-pointer ml-4 sm:hidden"
            />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white ">
            <SheetHeader className="hidden">
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            </SheetHeader>
            <Link href="/" className='flex items-center gap-2 mb-4'>
                <Image 
                src="/wallet.svg"
                width={32}
                height={32}
                alt='Vmeet logo'
                className='max-sm:size-10'
                />
                <p className='text-[18px]   '>FinBuddy</p>
            </Link>
            <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                <SheetClose asChild>
                    <section className="flex h-full flex-col gap-6 pt-6 text-primary">
                    {sidebarLinks.map((link)=>{
                            // https://chatgpt.com/share/c522af44-7c9d-4217-9cf0-a542c5e01a27
                            // about/nitesh ---> link.route check /about/nitesh (return false)
                            //-----> it check start with /about/ (return true)
                        const isActive = pathname === link.route;

                        return(
                            
                            // <Link> is a React component that extends the HTML <a> element to provide prefetching and client-side navigation between routes. It is the primary way to navigate between routes in Next.js.
                            <SheetClose asChild key={link.route}>
                            <Link
                            href={link.route}
                            key={link.label}
                            //cn allows us to add multiple and dynamic class name.
                            //second parameter is optional.
                            className={cn('flex gap-4 items-center p-4 rounded-lg justify-start',  {'bg-primary text-white': isActive,})}
                            
                            >
                             <link.icon 
                                src={link.icon}
                                alt={link.label}
                             /> {/* Using the icon here */}
                            {/* <Image
                                src={link.icon}
                                alt={link.label}
                                width={20}
                                height={20}
                            /> */}
                            <p className="font-semibold ">
                            {link.name}
                            </p>
                            
                            </Link>
                            </SheetClose>
                        )
                        })
                    }
                    </section>
                </SheetClose>
            </div>
        </SheetContent>
        </Sheet>
     </section>
  )
}

export default MobileNav
