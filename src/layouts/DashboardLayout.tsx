import React from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, DollarSign, LayoutDashboard, LogOut, CheckCircle } from 'lucide-react';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const studentNavigation: SidebarItem[] = [
  { name: 'Dashboard', href: '/student-dashboard', icon: LayoutDashboard },
  { name: 'My Grades', href: '/student-dashboard', icon: GraduationCap },
  { name: 'Fee Status', href: '/student-dashboard', icon: DollarSign },
  { name: 'Resource Center', href: '/student-dashboard', icon: BookOpen },
];

const staffNavigation: SidebarItem[] = [
  { name: 'Dashboard', href: '/staff-dashboard', icon: LayoutDashboard },
  { name: 'Mark Entry', href: '/staff-dashboard', icon: CheckCircle },
];

export const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isStudent = location.pathname.includes('/student-dashboard');
  const navigation = isStudent ? studentNavigation : staffNavigation;

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-navyDark text-white flex flex-col">
        <div className="p-6 flex flex-col items-center border-b border-navy/50 text-center">
          <img
            src="/logo.png"
            alt="Missie Christian College Logo"
            className="w-40 h-auto mb-4 object-contain"
          />
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${
                  isActive
                    ? 'bg-navy text-white'
                    : 'text-gray-300 hover:bg-navy/50 hover:text-white'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-brightRed' : 'text-gray-400'}`} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-navy/50">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-navy/50 hover:text-white transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-400" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm h-16 flex items-center px-8">
          <h2 className="text-xl font-semibold text-gray-800">
            {isStudent ? 'Student Portal' : 'Staff Portal'}
          </h2>
        </header>
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
