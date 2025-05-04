
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Send, FileText, Users, Mail, BarChart, Settings, User, ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard
  },
  {
    name: 'Campaigns',
    href: '/campaigns',
    icon: Send
  },
  {
    name: 'Templates',
    href: '/templates',
    icon: FileText
  },
  {
    name: 'Groups',
    href: '/groups',
    icon: Users
  },
  {
    name: 'SMTP Profiles',
    href: '/smtp-profiles',
    icon: Mail
  },
  {
    name: 'Users',
    href: '/users',
    icon: User
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: BarChart
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings
  }
];

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div 
      className={cn(
        "h-screen bg-sidebar text-sidebar-foreground transition-width duration-300 ease-in-out flex flex-col border-r border-sidebar-border fixed z-10",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center">
            <Shield size={24} className="mr-2 text-cyber-accent bg-slate-50 rounded-none" />
            <span className="font-bold text-xl text-violet-800">Sentrifense</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className={cn(
            "p-1 rounded-md hover:bg-sidebar-accent focus:outline-none transition-colors",
            collapsed ? "mx-auto" : ""
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <div className="py-4 flex-1 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {navItems.map(item => {
            const isActive = location.pathname === item.href || 
              (item.href !== '/' && location.pathname.startsWith(item.href));
            return (
              <Link 
                key={item.name} 
                to={item.href} 
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon 
                  className={cn("flex-shrink-0", collapsed ? "mx-auto" : "mr-3")} 
                  size={20} 
                />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
            <User size={18} className="text-sidebar-accent-foreground" />
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-sidebar-foreground/70">Security Analyst</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
