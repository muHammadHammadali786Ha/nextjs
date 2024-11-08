'use client'
import { AuthContext } from "@/context/store"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"


const Navbar = () => {

    const router = useRouter();
    
    const {logout,auth} = useContext(AuthContext);
    
    const logoutHandler = () =>{
        logout();
        router.push('/login');
    }

    return (
        <div className="flex justify-between items-center h-10 " suppressHydrationWarning={true}>
            <div className="font-bold">
                <h1 className="xs:text-xl sm:text-2xl"> <strong className="text-[#28A745]">Internship</strong> Provider</h1>
            </div>

            <div className="hidden md:flex gap-4 text-[1.1rem] font-bold" >
                <Link href={'/'} className="px-1 xmd:px-3 py-2 hover:text-[#28A745]">Home</Link>
                <Link href={'/about'} className="px-1 xmd:px-3 py-2 hover:text-[#28A745]">About</Link>
            {auth.token && 
            <div className="hidden md:flex gap-4 text-[1.1rem] font-bold">
                <Link href={'/dashboard'} className="px-1 xmd:px-3 py-2 hover:text-[#28A745]">Dashboard</Link>
                <Link href={'/'} className="px-1 xmd:px-3 py-2 hover:text-[#28A745]">Contact</Link>
            </div> 
            }
                {!auth.token?<Link href={'/login'} className="px-3 py-2 ">Login</Link>:
                <p onClick={logoutHandler} className="px-3 py-2 cursor-pointer">Logout</p>
                }
            </div>

            <div className="flex flex-col justify-center items-center gap-1 md:hidden">
                <div className="h-1 px-3 bg-gray-950"></div>
                <div className="h-1 px-3 bg-gray-950"></div>
                <div className="h-1 px-3 bg-gray-950"></div>
            </div>
        </div>
    )
}

export default Navbar

// bg-[#28A745] hover:bg-[#218838] rounded-md