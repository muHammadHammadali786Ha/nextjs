'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const router = useRouter();
  
    const menuItems = [
        { name: 'Dashboard Overview', route: '/dashboard' },
        { name: 'Jobs Posting', route: '/dashboard/jobpost' },
        { name: 'Applications', route: '/dashboard/application' },
        { name: 'Interview Schedule', route: '/dashboard/interview' },
        { name: 'Analytics & Insights', route: '/dashboard/analytics' },
        { name: 'Profile Management', route: '/dashboard/profile' },
    ];

    return (
        <div className='flex gap-2'>
            {/* Sidebar */}
            <div className='hidden w-64 md:w-80 md:flex flex-col gap-10 py-5 px-12 bg-[#343A40] text-white min-h-screen rounded-md'>
                <h2 className='text-xl font-bold text-primary'>Employer Dashboard</h2>

                {menuItems.map((item, index) => (
                    <Link    
                        key={index} 
                        className='flex gap-2 cursor-pointer' 
                        href={ item.route }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                        </svg>
                        <span>{item.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Sidebar;
