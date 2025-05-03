
import React, { useState } from 'react';
import { Sidebar } from '../layouts/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* We're removing any props passed to Sidebar since the Sidebar component doesn't accept them */}
      <Sidebar />
      <main className={`flex-1 p-4 lg:p-8 overflow-y-auto transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'ml-16' : 'ml-16 md:ml-64'}`}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
