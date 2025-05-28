'use client'
import { AuthContext } from '@/context/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { 
  FiUser, 
  FiBriefcase, 
  FiFileText, 
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiHome
} from 'react-icons/fi';

const Sidebar = () => {
    const { auth, logout } = useContext(AuthContext);
    const router = useRouter();

    const employerMenu = [
        { name: 'Dashboard', route: '/dashboard', icon: <FiHome className="w-5 h-5" /> },
        { name: 'Profile', route: '/dashboard/profile', icon: <FiUser className="w-5 h-5" /> },
        { name: 'Interviews', route: '/dashboard/interview', icon: <FiUser className="w-5 h-5" /> },
        { name: 'Post Jobs', route: '/dashboard/jobpost', icon: <FiBriefcase className="w-5 h-5" /> },
        { name: 'Applications', route: '/dashboard/application', icon: <FiFileText className="w-5 h-5" /> },
    ];

    const studentMenu = [
        { name: 'Dashboard', route: '/dashboard', icon: <FiHome className="w-5 h-5" /> },
        { name: 'Profile', route: '/dashboard/profile', icon: <FiUser className="w-5 h-5" /> },
        { name: 'My Skills', route: '/dashboard/skills', icon: <FiBarChart2 className="w-5 h-5" /> },
        { name: 'Job Board', route: '/dashboard/jobs', icon: <FiBriefcase className="w-5 h-5" /> },
        { name: 'Applications', route: '/dashboard/application', icon: <FiFileText className="w-5 h-5" /> },
        { name: 'Analytics', route: '/dashboard/analytics', icon: <FiBarChart2 className="w-5 h-5" /> },
    ];

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const menuItems = auth.user.role === 'employee' ? employerMenu : studentMenu;

    return (
        <div className="hidden md:flex md:w-64 lg:w-72 flex-col bg-white border-r border-gray-200 min-h-screen">
            {/* Sidebar Header */}
            <div className="p-6 pb-2">
                <h2 className="text-xl font-bold text-gray-800">
                    {auth.user?.role === 'employee' ? 'Employer' : 'Student'} Dashboard
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    {auth.user?.username || 'Welcome back'}
                </p>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-4 py-6 space-y-1">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.route}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                            router.pathname === item.route
                                ? 'bg-blue-50 text-blue-600 font-medium'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <span className={`${router.pathname === item.route ? 'text-blue-500' : 'text-gray-500'}`}>
                            {item.icon}
                        </span>
                        <span>{item.name}</span>
                        {router.pathname === item.route && (
                            <span className="ml-auto h-2 w-2 rounded-full bg-blue-500"></span>
                        )}
                    </Link>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-gray-200 space-y-2">
                <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                >
                    <FiSettings className="w-5 h-5 text-gray-500" />
                    <span>Settings</span>
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors text-left"
                >
                    <FiLogOut className="w-5 h-5 text-gray-500" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;