import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, LogIn } from 'lucide-react';

export const Login: React.FC = () => {
  const [loginType, setLoginType] = useState<'student' | 'staff'>('student');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginType === 'student') {
      navigate('/student-dashboard');
    } else {
      navigate('/staff-dashboard');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url('/login-bg.jpg')` }}
    >
      {/* Dark Navy Overlay */}
      <div className="absolute inset-0 bg-navyDark/80 mix-blend-multiply"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight flex flex-col">
            <span className="text-navyDark">Missie Christian</span>
            <span className="text-brightRed">College</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500 font-medium italic">"Best of the Rest"</p>
        </div>

        {/* Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-lg mb-8">
          <button
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              loginType === 'student'
                ? 'bg-white text-navy shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setLoginType('student')}
          >
            Student/Parent
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              loginType === 'staff'
                ? 'bg-white text-navy shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setLoginType('staff')}
          >
            Staff
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {loginType === 'student' ? 'Student ID' : 'Staff Email'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-navy focus:border-navy sm:text-sm"
                placeholder={loginType === 'student' ? 'e.g. MCC-2024-001' : 'staff@missie.edu'}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-navy focus:border-navy sm:text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-navy focus:ring-navy border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-navy hover:text-navyDark">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-navyDark bg-gold hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-colors"
          >
            <LogIn className="mr-2 h-5 w-5" />
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
