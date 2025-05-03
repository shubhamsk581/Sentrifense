
import React, { useState } from 'react';
import { User, Plus, Edit, Trash2, Upload, Shield, ShieldAlert } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import NewUserForm from '@/components/users/NewUserForm';
import { Badge } from '@/components/ui/badge';

// Mock data for users
const mockUsers = [
  { 
    id: 1, 
    name: 'John Smith', 
    email: 'john.smith@company.com',
    role: 'admin',
    lastLogin: '2023-04-15 09:23',
    status: 'active'
  },
  { 
    id: 2, 
    name: 'Jane Doe', 
    email: 'jane.doe@company.com',
    role: 'user',
    lastLogin: '2023-04-14 16:45',
    status: 'active'
  },
  { 
    id: 3, 
    name: 'Michael Brown', 
    email: 'michael.brown@company.com',
    role: 'user',
    lastLogin: '2023-04-10 11:15',
    status: 'active'
  },
  { 
    id: 4, 
    name: 'Sarah Wilson', 
    email: 'sarah.wilson@company.com',
    role: 'user',
    lastLogin: '2023-03-28 14:30',
    status: 'inactive'
  },
];

const UsersList: React.FC = () => {
  const [isNewUserOpen, setIsNewUserOpen] = useState(false);

  return (
    <div>
      <PageHeader 
        title="Users Management" 
        description="Manage users who have access to the phishing platform."
        actions={
          <div className="flex space-x-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import Users
            </Button>
            <Button onClick={() => setIsNewUserOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New User
            </Button>
          </div>
        }
      />
      
      <Card className="overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/20">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {user.role === 'admin' ? (
                      <Shield className="h-4 w-4 mr-1 text-cyber-primary" />
                    ) : (
                      <User className="h-4 w-4 mr-1 text-muted-foreground" />
                    )}
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </div>
                </TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell className="text-center">
                  <Badge 
                    variant="outline" 
                    className={
                      user.status === 'active' 
                        ? 'bg-cyber-success/10 text-cyber-success border-cyber-success/20' 
                        : 'bg-muted text-muted-foreground'
                    }
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <span className="sr-only">Open menu</span>
                        <User className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit User</span>
                      </DropdownMenuItem>
                      {user.role !== 'admin' && (
                        <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Make Admin</span>
                        </DropdownMenuItem>
                      )}
                      {user.status === 'active' ? (
                        <DropdownMenuItem>
                          <ShieldAlert className="mr-2 h-4 w-4" />
                          <span>Deactivate</span>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Activate</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete User</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isNewUserOpen} onOpenChange={setIsNewUserOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Add a new user to access the phishing platform.
            </DialogDescription>
          </DialogHeader>
          <NewUserForm onSubmit={() => setIsNewUserOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersList;
