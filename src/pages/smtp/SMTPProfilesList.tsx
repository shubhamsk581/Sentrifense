
import React, { useState } from 'react';
import { Mail, Plus, Edit, Trash2, Check } from 'lucide-react';
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
import NewSMTPProfileForm from '@/components/smtp/NewSMTPProfileForm';
import { Badge } from '@/components/ui/badge';

// Mock data for SMTP profiles
const mockProfiles = [
  { 
    id: 1, 
    name: 'Corporate SMTP Relay', 
    host: 'smtp.corporate.com',
    port: 587,
    username: 'smtp-user@corporate.com',
    fromEmail: 'no-reply@corporate.com',
    isDefault: true,
    lastTested: '2023-04-02',
    status: 'verified',
  },
  { 
    id: 2, 
    name: 'External SMTP Service', 
    host: 'smtp.mailservice.com',
    port: 587,
    username: 'account123',
    fromEmail: 'security@company-external.com',
    isDefault: false,
    lastTested: '2023-03-10',
    status: 'verified',
  },
  { 
    id: 3, 
    name: 'Gmail Relay', 
    host: 'smtp.gmail.com',
    port: 465,
    username: 'security@company.com',
    fromEmail: 'security@company.com',
    isDefault: false,
    lastTested: '2023-02-22',
    status: 'unverified',
  },
];

const SMTPProfilesList: React.FC = () => {
  const [isNewProfileOpen, setIsNewProfileOpen] = useState(false);

  return (
    <div>
      <PageHeader 
        title="SMTP Profiles" 
        description="Manage SMTP profiles for sending phishing emails."
        actions={
          <Button onClick={() => setIsNewProfileOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New SMTP Profile
          </Button>
        }
      />
      
      <Card className="overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/20">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Host</TableHead>
              <TableHead>From Email</TableHead>
              <TableHead className="text-center">Port</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Default</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProfiles.map((profile) => (
              <TableRow key={profile.id}>
                <TableCell className="font-medium">{profile.name}</TableCell>
                <TableCell>{profile.host}</TableCell>
                <TableCell>{profile.fromEmail}</TableCell>
                <TableCell className="text-center">{profile.port}</TableCell>
                <TableCell className="text-center">
                  <Badge 
                    variant={profile.status === 'verified' ? 'outline' : 'secondary'}
                    className={profile.status === 'verified' ? 'bg-cyber-success/10 text-cyber-success border-cyber-success/20' : ''}
                  >
                    {profile.status === 'verified' ? 'Verified' : 'Unverified'}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  {profile.isDefault ? <Check className="h-4 w-4 mx-auto text-cyber-success" /> : null}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <span className="sr-only">Open menu</span>
                        <Mail className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit Profile</span>
                      </DropdownMenuItem>
                      {!profile.isDefault && (
                        <DropdownMenuItem>
                          <Check className="mr-2 h-4 w-4" />
                          <span>Set as Default</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete Profile</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isNewProfileOpen} onOpenChange={setIsNewProfileOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New SMTP Profile</DialogTitle>
            <DialogDescription>
              Configure your SMTP server settings for sending phishing emails.
            </DialogDescription>
          </DialogHeader>
          <NewSMTPProfileForm onSubmit={() => setIsNewProfileOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SMTPProfilesList;
