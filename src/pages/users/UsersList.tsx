
import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Plus, Users, Upload, Trash, Edit, MoreHorizontal } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Sample users data
const usersData = [
  { id: 1, username: 'admin', role: 'Admin', lastLogin: '2023-04-25 14:32', status: 'active' },
  { id: 2, username: 'john.doe', role: 'User', lastLogin: '2023-04-24 09:15', status: 'active' },
  { id: 3, username: 'jane.smith', role: 'User', lastLogin: '2023-04-23 11:45', status: 'active' },
  { id: 4, username: 'analyst', role: 'Analyst', lastLogin: '2023-04-22 16:20', status: 'inactive' },
];

const UsersList: React.FC = () => {
  const [newUserDialog, setNewUserDialog] = useState(false);
  const [importUsersDialog, setImportUsersDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImportUsers = () => {
    if (selectedFile) {
      // Here you would handle the file upload to your backend
      toast.success(`Imported users from ${selectedFile.name}`);
      setImportUsersDialog(false);
      setSelectedFile(null);
    } else {
      toast.error("Please select a file to import");
    }
  };
  
  return (
    <>
      <PageHeader 
        title="Users" 
        description="Manage system users and their access"
        actions={
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setImportUsersDialog(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Import Users
            </Button>
            <Button onClick={() => setNewUserDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New User
            </Button>
          </div>
        }
      />
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>
                    <StatusBadge status={user.status === 'active' ? 'success' : 'error'}>
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => toast.info(`Edit user ${user.username}`)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => toast.error(`Delete user ${user.username}`)}
                          className="text-red-600"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New User Dialog */}
      <Dialog open={newUserDialog} onOpenChange={setNewUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New User</DialogTitle>
            <DialogDescription>
              Add a new user to the system
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="e.g., john.doe" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                className="w-full p-2 rounded-md border border-input bg-background"
              >
                <option>User</option>
                <option>Admin</option>
                <option>Analyst</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => {
              toast.success("User created successfully");
              setNewUserDialog(false);
            }}>
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Users Dialog */}
      <Dialog open={importUsersDialog} onOpenChange={setImportUsersDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Users</DialogTitle>
            <DialogDescription>
              Upload a CSV or Excel file with user data
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="file-upload">File</Label>
              <Input 
                id="file-upload" 
                type="file" 
                accept=".csv,.xlsx,.xls" 
                onChange={handleFileChange}
              />
              <p className="text-xs text-muted-foreground">
                Accepted formats: CSV, Excel (.xlsx, .xls)
              </p>
            </div>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium">CSV Format Example:</p>
              <p className="text-xs text-muted-foreground font-mono mt-2">
                username,password,role<br />
                john.doe,password123,User<br />
                jane.smith,securepass,Admin
              </p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleImportUsers}>
              <Upload className="mr-2 h-4 w-4" />
              Import Users
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UsersList;
