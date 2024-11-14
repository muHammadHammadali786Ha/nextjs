'use client'
import { AuthContext } from "@/context/store"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useState, useEffect } from "react"


const Navbar = () => {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    const { logout, auth } = useContext(AuthContext);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const logoutHandler = (e) => {
        e.preventDefault();
        logout();
        router.push('/login');
    }

    if (!isClient) {
        return null; // Or a loading spinner, or fallback UI
    }
    return (
        <div className="flex justify-between items-center h-10 ">
            <div className="font-bold">
                <h1 className="xs:text-xl sm:text-2xl"> <b className="text-[#28A745]">Internship</b> Provider</h1>
            </div>

            <div className="hidden md:flex gap-4 text-[1.1rem] font-bold" >
                <Link href={'/'} className="px-1 xmd:px-3 py-2 hover:text-[#28A745]">Home</Link>
                <Link href={'/about'} className="px-1 xmd:px-3 py-2 hover:text-[#28A745]">About</Link>
                {auth?.user?.role === 'employee' &&
                    <div className="hidden md:flex gap-4 text-[1.1rem] font-bold">
                        <Link href={'/dashboard'} className="px-1 xmd:px-3 py-2 hover:text-[#28A745]">Dashboard</Link>
                        {/* <Link href={'/'} className="px-1 xmd:px-3 py-2 hover:text-[#28A745]">Contact</Link> */}
                    </div>

                }

                {auth?.user?.role === 'student' &&
                    <div className="hidden md:flex gap-4 text-[1.1rem] font-bold">
                        <Link href={'/dashboard'} className="px-1 xmd:px-3 py-2 hover:text-[#28A745]">Student_Dashboard</Link>
                        {/* <Link href={'/'} className="px-1 xmd:px-3 py-2 hover:text-[#28A745]">Contact</Link> */}
                    </div>
                }
                {!auth.token ? <Link href={'/login'} className="px-3 py-2">Login</Link> :
                    <div className="flex gap-3">
                        <Link href={'/'} className="px-1 xmd:px-3 py-2 hover:text-[#28A745]">Contact</Link>
                    <p onClick={logoutHandler} className="px-3 py-2 cursor-pointer">Logout</p>
                    </div>
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