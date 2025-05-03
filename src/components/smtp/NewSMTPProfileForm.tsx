
import React from 'react';
import { Check, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface NewSMTPProfileFormProps {
  onSubmit: () => void;
}

const NewSMTPProfileForm: React.FC<NewSMTPProfileFormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="profile-name">Profile Name</Label>
        <Input id="profile-name" placeholder="e.g., Corporate SMTP" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="smtp-host">SMTP Host</Label>
          <Input id="smtp-host" placeholder="e.g., smtp.company.com" />
        </div>
        <div>
          <Label htmlFor="smtp-port">SMTP Port</Label>
          <Input id="smtp-port" placeholder="e.g., 587" type="number" />
        </div>
      </div>
      
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox id="use-auth" />
          <Label htmlFor="use-auth" className="font-normal">Use authentication</Label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
          <div>
            <Label htmlFor="smtp-username">Username</Label>
            <Input id="smtp-username" placeholder="e.g., user@domain.com" />
          </div>
          <div>
            <Label htmlFor="smtp-password">Password</Label>
            <Input id="smtp-password" type="password" placeholder="SMTP password" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="from-email">From Email</Label>
          <Input id="from-email" placeholder="e.g., security@company.com" />
        </div>
        <div>
          <Label htmlFor="from-name">From Name</Label>
          <Input id="from-name" placeholder="e.g., IT Security Team" />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="use-tls" />
          <Label htmlFor="use-tls" className="font-normal">Use TLS encryption</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="set-default" />
          <Label htmlFor="set-default" className="font-normal">Set as default SMTP profile</Label>
        </div>
      </div>
      
      <div className="border-t pt-4 flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          className="flex items-center"
        >
          <Send className="mr-2 h-4 w-4" />
          Send Test Email
        </Button>
        
        <div className="flex space-x-2">
          <Button variant="outline" type="button" onClick={() => onSubmit()}>
            Cancel
          </Button>
          <Button type="submit">
            <Check className="mr-2 h-4 w-4" />
            Save Profile
          </Button>
        </div>
      </div>
    </form>
  );
};

export default NewSMTPProfileForm;
