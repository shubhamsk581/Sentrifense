
import React from 'react';
import { Sidebar } from '../layouts/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto transition-all duration-300 ease-in-out ml-16 md:ml-64">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
