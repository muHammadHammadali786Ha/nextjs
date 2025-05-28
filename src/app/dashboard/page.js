'use client'
import React from 'react'
import { AuthContext } from "@/context/store"
import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import { FiBriefcase, FiUsers, FiUser, FiSettings, FiLogOut } from 'react-icons/fi'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '@/utils/motion'

const Dashboard = () => {
    const router = useRouter();
    const { auth, logout } = useContext(AuthContext);

    useEffect(() => {
        if (!auth.token) {
            router.push('/login')
        }
    }, [auth.token, router])

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        router.push('/login');
    }

    const dashboardCards = [
        {
            title: "Job Postings",
            description: "Create and manage your job postings",
            icon: <FiBriefcase className="w-6 h-6" />,
            color: "bg-green-50",
            textColor: "text-green-600",
            buttonColor: "bg-green-600 hover:bg-green-700",
            action: () => router.push('/dashboard/jobpost')
        },
        {
            title: "Applications",
            description: "View and manage applications from candidates",
            icon: <FiUsers className="w-6 h-6" />,
            color: "bg-blue-50",
            textColor: "text-blue-600",
            buttonColor: "bg-blue-600 hover:bg-blue-700",
            action: () => router.push('/dashboard/applications')
        },
        {
            title: "Profile",
            description: "Update your profile information",
            icon: <FiUser className="w-6 h-6" />,
            color: "bg-yellow-50",
            textColor: "text-yellow-600",
            buttonColor: "bg-yellow-600 hover:bg-yellow-700",
            action: () => router.push('/dashboard/profile')
        },
        {
            title: "Settings",
            description: "Manage your account settings",
            icon: <FiSettings className="w-6 h-6" />,
            color: "bg-purple-50",
            textColor: "text-purple-600",
            buttonColor: "bg-purple-600 hover:bg-purple-700",
            action: () => router.push('/dashboard/settings')
        }
    ]

    return (
        <motion.div 
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div 
                    variants={fadeIn('down', 'tween', 0.2, 1)}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Welcome, {auth.user?.username || 'User'}</h1>
                        <p className="mt-2 text-lg text-gray-600">Manage your recruitment activities</p>
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogout}
                        className="mt-4 sm:mt-0 flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        <FiLogOut className="mr-2" />
                        Logout
                    </motion.button>
                </motion.div>

                {/* Dashboard Cards */}
                <motion.div 
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {dashboardCards.map((card, index) => (
                        <motion.div
                            key={index}
                            variants={fadeIn('up', 'tween', index * 0.1, 1)}
                            whileHover={{ y: -5 }}
                            className={`${card.color} p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-transparent hover:border-gray-200`}
                        >
                            <motion.div 
                                whileHover={{ rotate: 10 }}
                                className={`${card.textColor} mb-4`}
                            >
                                {card.icon}
                            </motion.div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h2>
                            <p className="text-gray-600 mb-6">{card.description}</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={card.action}
                                className={`${card.buttonColor} text-white px-4 py-2 rounded-lg transition duration-200 flex items-center`}
                            >
                                {card.title === 'Job Postings' ? 'Manage' : card.title === 'Applications' ? 'View' : 'Update'}
                                <motion.svg 
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="w-4 h-4 ml-2" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </motion.svg>
                            </motion.button>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Recent Activity Section */}
                <motion.div 
                    variants={fadeIn('up', 'tween', 0.4, 1)}
                    className="mt-12 bg-white rounded-xl shadow-sm p-6"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Activity</h2>
                    <div className="space-y-4">
                        {[
                            {
                                icon: <FiBriefcase className="text-blue-600" />,
                                bg: "bg-blue-100",
                                title: "New job posted",
                                desc: "Software Engineer - Full Time",
                                time: "2 hours ago"
                            },
                            {
                                icon: <FiUsers className="text-green-600" />,
                                bg: "bg-green-100",
                                title: "New application received",
                                desc: "From John Doe for Frontend Developer",
                                time: "1 day ago"
                            },
                            {
                                icon: <FiSettings className="text-purple-600" />,
                                bg: "bg-purple-100",
                                title: "Profile updated",
                                desc: "Changed your contact information",
                                time: "3 days ago"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + (index * 0.1) }}
                                className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                            >
                                <div className={`${item.bg} p-2 rounded-full mr-4`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-gray-800 font-medium">{item.title}</p>
                                    <p className="text-gray-500 text-sm">{item.desc}</p>
                                    <p className="text-gray-400 text-xs mt-1">{item.time}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Dashboard