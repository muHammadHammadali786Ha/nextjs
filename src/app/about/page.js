    'use client'

    import { AuthContext } from "@/context/store"
    import { useRouter } from "next/navigation"
    import { useContext, useEffect } from "react"

    // import React from 'react'

    const page = () => {
        const router = useRouter(); 
        const {auth} = useContext(AuthContext);

        useEffect(()=>{
            if (!auth.token) {
                router.push('/login')
            }
        },[auth.token,router])
    return (
        <div >
            <h1>About Page</h1>
        </div>
    )
    }

    export default page