'use client'
import React from 'react'
import { AuthContext } from "@/context/store"
import { useRouter } from "next/navigation"
import { useContext, useEffect,useState } from "react"
import { 
  FiBriefcase, 
  FiFileText, 
  FiUser, 
  FiSettings, 
  FiBell,
  FiSearch,
  FiBarChart2,
  FiBookmark,
  FiCalendar,
  FiClock
} from 'react-icons/fi'
import { toast } from 'react-toastify'
import axios from 'axios'

const Dashboard = () => {
    const router = useRouter();
    const { auth } = useContext(AuthContext);
    const [details, setDetails] = useState({
        applications:null
    })

    const fetchdata = async () => {
        // console.log("Fetching data...");
        // console.log(auth.token);
        
        const response = await axios.post('http://localhost:7001/api/v1/users/applicants',{}, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json',
                }
            });
        // console.log(response.data);
        setDetails({
            applications: response.data.applications
        })
        
    }


    useEffect(() => {
        if (!auth.token) {
            router.push('/login')
        }

        fetchdata()
    }, [auth.token, router,])

    const dashboardCards = [
        {
            title: "Job Search",
            description: "Browse and apply for internships",
            icon: <FiBriefcase className="w-6 h-6" />,
            color: "bg-blue-50",
            textColor: "text-blue-600",
            buttonColor: "bg-blue-600 hover:bg-blue-700",
            action: () => router.push('/jobs')
        },
        {
            title: "My Applications",
            description: "Track your submitted applications",
            icon: <FiFileText className="w-6 h-6" />,
            color: "bg-green-50",
            textColor: "text-green-600",
            buttonColor: "bg-green-600 hover:bg-green-700",
            action: () => router.push('/student/application')
        },
        {
            title: "Profile",
            description: "Update your personal information",
            icon: <FiUser className="w-6 h-6" />,
            color: "bg-purple-50",
            textColor: "text-purple-600",
            buttonColor: "bg-purple-600 hover:bg-purple-700",
            action: () => router.push('/student/profile')
        },
        {
            title: "Saved Jobs",
            description: "View your bookmarked positions",
            icon: <FiBookmark className="w-6 h-6" />,
            color: "bg-yellow-50",
            textColor: "text-yellow-600",
            buttonColor: "bg-yellow-600 hover:bg-yellow-700",
            action: () => toast.info('Saved jobs feature coming soon!')
        },
        {
            title: "Notifications",
            description: "View application updates",
            icon: <FiBell className="w-6 h-6" />,
            color: "bg-red-50",
            textColor: "text-red-600",
            buttonColor: "bg-red-600 hover:bg-red-700",
            action: () => router.push('/notifications')
        },
        {
            title: "Career Insights",
            description: "Get personalized recommendations",
            icon: <FiBarChart2 className="w-6 h-6" />,
            color: "bg-indigo-50",
            textColor: "text-indigo-600",
            buttonColor: "bg-indigo-600 hover:bg-indigo-700",
            action: () => router.push('/recommendation')
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Welcome back, <span className="text-blue-600">{auth.user?.username || 'Student'}</span>
                    </h1>
                    <div className="relative w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Search dashboard..."
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                                    <FiBriefcase className="h-6 w-6 text-white" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Applications</dt>
                                        <dd className="flex items-baseline">
                                            <div className="text-2xl font-semibold text-gray-900">{details.applications}</div>
                                            <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                                <span>+3 from last week</span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                                    <FiFileText className="h-6 w-6 text-white" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Interviews</dt>
                                        <dd className="flex items-baseline">
                                            <div className="text-2xl font-semibold text-gray-900">3</div>
                                            <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                                <span>+1 from last week</span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                                    <FiBookmark className="h-6 w-6 text-white" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Saved Jobs</dt>
                                        <dd className="flex items-baseline">
                                            <div className="text-2xl font-semibold text-gray-900">8</div>
                                            <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                                <span>+2 from last week</span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                                    <FiBell className="h-6 w-6 text-white" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Notifications</dt>
                                        <dd className="flex items-baseline">
                                            <div className="text-2xl font-semibold text-gray-900">5</div>
                                            <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                                <span>+1 from yesterday</span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Cards */}
                <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {dashboardCards.map((card, index) => (
                        <div 
                            key={index} 
                            className={`${card.color} overflow-hidden shadow rounded-lg transition-transform hover:scale-105`}
                        >
                            <div className="px-4 py-5 sm:p-6">
                                <div className="flex items-center">
                                    <div className={`${card.textColor} flex-shrink-0`}>
                                        {card.icon}
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <h3 className={`text-lg font-medium ${card.textColor}`}>{card.title}</h3>
                                        <p className="mt-1 text-sm text-gray-500">{card.description}</p>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <button
                                        type="button"
                                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${card.buttonColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                                        onClick={card.action}
                                    >
                                        Go to {card.title}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity */}
                <div className="mt-10">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            <li>
                                <a href="#" className="block hover:bg-gray-50">
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-blue-600 truncate">
                                                Application submitted for Software Engineer Intern
                                            </p>
                                            <div className="ml-2 flex-shrink-0 flex">
                                                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    New
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-2 sm:flex sm:justify-between">
                                            <div className="sm:flex">
                                                <p className="flex items-center text-sm text-gray-500">
                                                    <FiBriefcase className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                                    Tech Company Inc.
                                                </p>
                                                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                    <FiCalendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                                    Applied on <time dateTime="2023-01-30">January 30, 2023</time>
                                                </p>
                                            </div>
                                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                <FiClock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                                2 days ago
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block hover:bg-gray-50">
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-blue-600 truncate">
                                                Interview scheduled for Product Design Intern
                                            </p>
                                            <div className="ml-2 flex-shrink-0 flex">
                                                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                    Upcoming
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-2 sm:flex sm:justify-between">
                                            <div className="sm:flex">
                                                <p className="flex items-center text-sm text-gray-500">
                                                    <FiBriefcase className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                                    Design Studio
                                                </p>
                                                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                    <FiCalendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                                    Scheduled for <time dateTime="2023-02-15">February 15, 2023</time>
                                                </p>
                                            </div>
                                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                <FiClock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                                1 week from now
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard