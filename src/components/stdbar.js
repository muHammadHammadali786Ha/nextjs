'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaUser, 
  FaFileAlt, 
  FaBriefcase, 
  FaChartBar, 
  FaCalendarAlt,
  FaSearch,
  FaBookmark,
  FaCog
} from 'react-icons/fa';

const Stdbar = () => {
  const pathname = usePathname();
  const studentItems = [
    { name: 'Profile', route: '/student/profile', icon: <FaUser className="w-5 h-5" /> },
    { name: 'My Applications', route: '/student/application', icon: <FaFileAlt className="w-5 h-5" /> },
    // { name: 'Job Search', route: '/student/search', icon: <FaSearch className="w-5 h-5" /> },
    { name: 'Saved Jobs', route: '/student/save', icon: <FaBookmark className="w-5 h-5" /> },
    { name: 'Interview Schedule', route: '/student/interview', icon: <FaCalendarAlt className="w-5 h-5" /> },
    { name: 'Career Insights', route: '/student/analytics', icon: <FaChartBar className="w-5 h-5" /> },
    { name: 'Settings', route: '/student/settings', icon: <FaCog className="w-5 h-5" /> },
  ];

  return (
    <div className="hidden md:flex md:w-64 lg:w-72 flex-col bg-white border-r border-gray-200 min-h-screen">
      {/* Sidebar Header */}
      <div className="p-6 pb-2">
        <h2 className="text-2xl font-bold text-gray-800">
        <Link href="/student" >                                        
          <span className="text-blue-600">JobSeeker</span> Dashboard
                                </Link>
        </h2>
        <p className="text-sm text-gray-500 mt-1">Manage your career journey</p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {studentItems.map((item, index) => (
          <Link
            key={index}
            href={item.route}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
              pathname === item.route
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className={`${pathname === item.route ? 'text-blue-500' : 'text-gray-500'}`}>
              {item.icon}
            </span>
            <span>{item.name}</span>
            {pathname === item.route && (
              <span className="ml-auto h-2 w-2 rounded-full bg-blue-500"></span>
            )}
          </Link>
        ))}
      </nav>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <FaUser className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium text-gray-800">Student Profile</p>
            <p className="text-sm text-gray-500">View account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stdbar;