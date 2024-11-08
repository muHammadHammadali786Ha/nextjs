'use client'
import React from 'react'
import { AuthContext } from "@/context/store"
    import { useRouter } from "next/navigation"
    import { useContext, useEffect } from "react"
const Dashboard = () => {
    const router = useRouter();
    const {auth} = useContext(AuthContext);

        useEffect(()=>{
            if (!auth.token) {
                router.push('/login')
            }
        },[auth.token,router])
    return (
        
            <div>
                <h1>WelCome to the Dashboard</h1>
            </div>
    )
}

export default Dashboard