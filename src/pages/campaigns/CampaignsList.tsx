
import React, { useState } from 'react';
import { Send, Plus, Edit, Trash2, Eye, PlayCircle, XCircle, Download } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import NewCampaignForm from '@/components/campaigns/NewCampaignForm';

// Mock data for campaigns
const mockCampaigns = [
  { 
    id: 1, 
    name: 'Security Policy Update', 
    status: 'running', 
    template: 'IT Security Policy', 
    sentAt: '2023-04-12', 
    sentCount: 230, 
    openCount: 150, 
    clickCount: 85, 
    submitCount: 42
  },
  { 
    id: 2, 
    name: 'Finance Department Training', 
    status: 'completed', 
    template: 'Finance Update', 
    sentAt: '2023-03-28', 
    sentCount: 180, 
    openCount: 120, 
    clickCount: 73, 
    submitCount: 35
  },
  { 
    id: 3, 
    name: 'HR Document Review', 
    status: 'scheduled', 
    template: 'HR Document Review', 
    sentAt: '2023-05-05', 
    sentCount: 0, 
    openCount: 0, 
    clickCount: 0, 
    submitCount: 0
  },
  { 
    id: 4, 
    name: 'IT System Upgrade', 
    status: 'failed', 
    template: 'IT Support', 
    sentAt: '2023-04-02', 
    sentCount: 10, 
    openCount: 5, 
    clickCount: 3, 
    submitCount: 0
  },
];

const CampaignsList: React.FC = () => {
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false);

  return (
    <div>
      <PageHeader 
        title="Campaigns" 
        description="Manage your phishing campaigns."
        actions={
          <Button onClick={() => setIsNewCampaignOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        }
      />
      
      <Card className="overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/20">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Template</TableHead>
              <TableHead>Sent At</TableHead>
              <TableHead className="text-center">Sent</TableHead>
              <TableHead className="text-center">Opened</TableHead>
              <TableHead className="text-center">Clicked</TableHead>
              <TableHead className="text-center">Submitted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCampaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>
                  <StatusBadge status={campaign.status as any} />
                </TableCell>
                <TableCell>{campaign.template}</TableCell>
                <TableCell>{campaign.status === 'scheduled' ? 'Scheduled for ' + campaign.sentAt : campaign.sentAt}</TableCell>
                <TableCell className="text-center">{campaign.sentCount}</TableCell>
                <TableCell className="text-center">
                  {campaign.openCount}
                  {campaign.sentCount > 0 && (
                    <span className="text-xs text-muted-foreground ml-1">
                      ({Math.round((campaign.openCount / campaign.sentCount) * 100)}%)
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {campaign.clickCount}
                  {campaign.sentCount > 0 && (
                    <span className="text-xs text-muted-foreground ml-1">
                      ({Math.round((campaign.clickCount / campaign.sentCount) * 100)}%)
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {campaign.submitCount}
                  {campaign.sentCount > 0 && (
                    <span className="text-xs text-muted-foreground ml-1">
                      ({Math.round((campaign.submitCount / campaign.sentCount) * 100)}%)
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <span className="sr-only">Open menu</span>
                        <Send className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View Details</span>
                      </DropdownMenuItem>
                      {campaign.status === 'running' && (
                        <DropdownMenuItem>
                          <XCircle className="mr-2 h-4 w-4" />
                          <span>Stop Campaign</span>
                        </DropdownMenuItem>
                      )}
                      {campaign.status === 'scheduled' && (
                        <>
                          <DropdownMenuItem>
                            <PlayCircle className="mr-2 h-4 w-4" />
                            <span>Launch Now</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit Campaign</span>
                          </DropdownMenuItem>
                        </>
                      )}
                      {(campaign.status === 'completed' || campaign.status === 'failed') && (
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          <span>Export Results</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete Campaign</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isNewCampaignOpen} onOpenChange={setIsNewCampaignOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
            <DialogDescription>
              Configure your phishing campaign details and target settings.
            </DialogDescription>
          </DialogHeader>
          <NewCampaignForm onSubmit={() => setIsNewCampaignOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignsList;
