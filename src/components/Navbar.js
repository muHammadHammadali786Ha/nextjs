'use client'
import { AuthContext } from "@/context/store"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext, useState, useEffect } from "react"
import { Bars3Icon, XMarkIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline"

const Navbar = () => {
    const [isClient, setIsClient] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        return null;
    }

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm border-b border-gray-100">
            <nav className="flex items-center justify-between p-4 lg:px-8" aria-label="Global">
                {/* Logo with custom design */}
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 flex items-center">
                        <div className="flex items-center">
                            <div className="relative">
                                {/* Custom logo shape */}
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                    </svg>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white"></div>
                            </div>
                            <span className="ml-2 text-xl font-bold text-gray-900">
                                <span className="text-blue-600">Smart</span>Intern
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex lg:gap-x-8 lg:items-center">
                    <Link 
                        href="/" 
                        className="text-sm font-semibold leading-6 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                        Home
                    </Link>

                    {auth?.user?.role === 'employee' && (
                        <Link 
                            href="/dashboard" 
                            className="text-sm font-semibold leading-6 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            Dashboard
                        </Link>
                    )}

                    {auth?.user?.role === 'student' && (
                        <>
                            <Link 
                                href="/student" 
                                className="text-sm font-semibold leading-6 text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                Dashboard
                            </Link>
                            <Link 
                                href="/recommendation" 
                                className="text-sm font-semibold leading-6 text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                Recommendations
                            </Link>
                        </>
                    )}

                    {!auth.token ? (
                        <Link 
                            href="/login" 
                            className="text-sm font-semibold leading-6 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            Login
                        </Link>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link 
                                href="/test" 
                                className="flex items-center text-sm font-semibold leading-6 text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                {/* <ChatBubbleLeftRightIcon className="h-5 w-5 mr-1" /> */}
                                Test
                            </Link>
                            <button
                                onClick={logoutHandler}
                                className="text-sm font-semibold leading-6 text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile menu */}
            <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`} role="dialog" aria-modal="true">
                <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
                <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center">
                            <div className="flex items-center">
                                <div className="relative">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                        </svg>
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white"></div>
                                </div>
                                <span className="ml-2 text-xl font-bold text-gray-900">
                                    <span className="text-blue-600">Smart</span>Intern
                                </span>
                            </div>
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link
                                    href="/"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>

                                {auth?.user?.role === 'employee' && (
                                    <Link
                                        href="/dashboard"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                )}

                                {auth?.user?.role === 'student' && (
                                    <>
                                        <Link
                                            href="/student"
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/recommendation"
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Recommendations
                                        </Link>
                                    </>
                                )}
                            </div>
                            <div className="py-6">
                                {!auth.token ? (
                                    <Link
                                        href="/login"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href="/test"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {/* <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" /> */}
                                            Test
                                        </Link>
                                        <button
                                            onClick={(e) => {
                                                logoutHandler(e);
                                                setMobileMenuOpen(false);
                                            }}
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 w-full text-left"
                                        >
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar