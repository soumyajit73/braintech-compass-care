
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Home, User, Users } from 'lucide-react';

const Navbar = () => {
  const [userRole, setUserRole] = useState<'patient' | 'doctor' | 'admin' | null>('patient'); // Mock user role

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 medical-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
            <span className="text-2xl font-bold text-primary-700">BrainTech.Ai</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors flex items-center space-x-1">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link to="/community" className="text-gray-700 hover:text-primary-600 transition-colors flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>Community</span>
            </Link>
            {userRole && (
              <Link 
                to={`/${userRole}-dashboard`} 
                className="text-gray-700 hover:text-primary-600 transition-colors flex items-center space-x-1"
              >
                <User className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {userRole ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 capitalize">{userRole}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setUserRole(null)}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button className="bg-primary-500 hover:bg-primary-600 text-white">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
