
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'running' | 'completed' | 'failed' | 'scheduled';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusClasses = () => {
    switch (status) {
      case 'running':
        return 'status-badge-running';
      case 'completed':
        return 'status-badge-completed';
      case 'failed':
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
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
