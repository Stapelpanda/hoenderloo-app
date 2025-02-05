import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center p-0 md:p-4">
      <div className="w-full md:w-[375px] h-screen md:h-[667px] bg-white md:rounded-3xl md:shadow-2xl overflow-hidden relative flex flex-col">
        <div className="flex-1 overflow-hidden relative">
          {/* Status bar background for iOS */}
          <div className="absolute top-0 left-0 right-0 h-[env(safe-area-inset-top)] bg-white z-50" />
          
          {/* Main content */}
          <div className="h-full">
            {children}
          </div>
          
          {/* Bottom safe area background */}
          <div className="absolute bottom-0 left-0 right-0 h-[env(safe-area-inset-bottom)] bg-white z-40" />
        </div>
      </div>
    </div>
  );
};
