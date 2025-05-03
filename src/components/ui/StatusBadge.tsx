
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'running' | 'completed' | 'failed' | 'scheduled' | 'success' | 'error' | 'active' | 'inactive';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  children?: React.ReactNode;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className, children }) => {
  const getStatusClasses = () => {
    switch (status) {
      case 'running':
        return 'status-badge-running';
      case 'completed':
      case 'success':
      case 'active':
        return 'status-badge-completed';
      case 'failed':
      case 'error':
      case 'inactive':
        return 'status-badge-failed';
      case 'scheduled':
        return 'bg-cyber-warning/20 text-cyber-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  
  return (
    <span className={cn("status-badge", getStatusClasses(), className)}>
      {status === 'running' && <span className="pulse-dot mr-1"></span>}
      {children || (status.charAt(0).toUpperCase() + status.slice(1))}
    </span>
  );
};
