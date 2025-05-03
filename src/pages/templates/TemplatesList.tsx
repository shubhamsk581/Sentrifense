
import React, { useState } from 'react';
import { FileText, Plus, Edit, Trash2, Eye } from 'lucide-react';
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
import NewTemplateForm from '@/components/templates/NewTemplateForm';

// Mock data for templates
const mockTemplates = [
  { 
    id: 1, 
    name: 'IT Security Policy Update', 
    subject: 'Important: Security Policy Update Required',
    createdAt: '2023-03-15',
    lastModified: '2023-04-02',
    usedInCampaigns: 3
  },
  { 
    id: 2, 
    name: 'Finance Department Update', 
    subject: 'Urgent: Financial Report Access',
    createdAt: '2023-02-28',
    lastModified: '2023-03-10',
    usedInCampaigns: 2
  },
  { 
    id: 3, 
    name: 'HR Document Review Request', 
    subject: 'Action Required: HR Document Review',
    createdAt: '2023-01-20',
    lastModified: '2023-01-20',
    usedInCampaigns: 1
  },
  { 
    id: 4, 
    name: 'IT System Maintenance', 
    subject: 'IT Maintenance: Action Required',
    createdAt: '2023-04-05',
    lastModified: '2023-04-05',
    usedInCampaigns: 0
  },
];

const TemplatesList: React.FC = () => {
  const [isNewTemplateOpen, setIsNewTemplateOpen] = useState(false);

  return (
    <div>
      <PageHeader 
        title="Email Templates" 
        description="Manage email templates for your phishing campaigns."
        actions={
          <Button onClick={() => setIsNewTemplateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Button>
        }
      />
      
      <Card className="overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/20">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead className="text-center">Used In Campaigns</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTemplates.map((template) => (
              <TableRow key={template.id}>
                <TableCell className="font-medium">{template.name}</TableCell>
                <TableCell>{template.subject}</TableCell>
                <TableCell>{template.createdAt}</TableCell>
                <TableCell>{template.lastModified}</TableCell>
                <TableCell className="text-center">{template.usedInCampaigns}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <span className="sr-only">Open menu</span>
                        <FileText className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Preview</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isNewTemplateOpen} onOpenChange={setIsNewTemplateOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Email Template</DialogTitle>
            <DialogDescription>
              Design an email template for your phishing campaigns.
            </DialogDescription>
          </DialogHeader>
          <NewTemplateForm onSubmit={() => setIsNewTemplateOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplatesList;
