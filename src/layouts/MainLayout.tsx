import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { MapIcon, ClockIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export const MainLayout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { to: '/', icon: MapIcon, label: 'Route' },
    { to: '/history', icon: ClockIcon, label: 'Geschiedenis' },
    { to: '/info', icon: InformationCircleIcon, label: 'Info' },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Main content */}
      <main className="flex-1 overflow-auto pb-[80px]">
        <Outlet />
      </main>

      {/* Fixed bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom z-50">
        <div className="flex justify-around max-w-md mx-auto">
          {navItems.map(({ to, icon: Icon, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-col items-center py-2 px-4 ${
                  isActive 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs mt-1 font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
