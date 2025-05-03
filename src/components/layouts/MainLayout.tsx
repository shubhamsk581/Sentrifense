
import React from 'react';
import { Sidebar } from './Sidebar';
import ThemeSwitcher from '../ThemeSwitcher';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <div className="absolute top-4 right-4">
          <ThemeSwitcher />
        </div>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
