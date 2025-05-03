
import React, { useState } from 'react';
import { Check, Code, Eye, Image, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

interface NewTemplateFormProps {
  onSubmit: () => void;
}

const NewTemplateForm: React.FC<NewTemplateFormProps> = ({ onSubmit }) => {
  const [activeTab, setActiveTab] = useState('design');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="template-name">Template Name</Label>
          <Input id="template-name" placeholder="e.g., IT Security Policy Update" />
        </div>
        <div>
          <Label htmlFor="template-subject">Email Subject</Label>
          <Input id="template-subject" placeholder="e.g., Important: Security Policy Update Required" />
        </div>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="bg-muted/30 px-4 pt-3">
            <TabsList className="grid w-full grid-cols-3 h-9">
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="code">HTML</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="design" className="p-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="sender-name">Sender Name</Label>
                <Input id="sender-name" placeholder="e.g., IT Department" />
              </div>
              <div>
                <Label htmlFor="sender-email">Sender Email</Label>
                <Input id="sender-email" placeholder="e.g., it@company.com" />
              </div>
              <div>
                <Label htmlFor="email-content">Email Content</Label>
                <Textarea 
                  id="email-content" 
                  placeholder="Write your email content here..." 
                  className="min-h-[200px]"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button type="button" variant="outline" size="sm">
                  <Image className="mr-2 h-4 w-4" />
                  Add Image
                </Button>
                <Button type="button" variant="outline" size="sm">
                  <Link className="mr-2 h-4 w-4" />
                  Add Link
                </Button>
                <Button type="button" variant="outline" size="sm">
                  <Code className="mr-2 h-4 w-4" />
                  Add Tracking Pixel
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="code" className="p-4">
            <Textarea 
              placeholder="<!DOCTYPE html><html><head>...</head><body>...</body></html>" 
              className="min-h-[300px] font-mono text-sm"
            />
          </TabsContent>
          
          <TabsContent value="preview" className="p-4">
            <Card className="p-4 min-h-[300px]">
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <div className="text-sm font-medium">From: IT Department &lt;it@company.com&gt;</div>
                  <div className="text-sm font-medium">Subject: Important: Security Policy Update Required</div>
                </div>
                <div className="text-sm">
                  <p>Dear [FIRST_NAME],</p>
                  <p className="my-2">Our security policy has recently been updated and requires your immediate action. Please review and acknowledge the updated security policy by clicking the link below:</p>
                  <p className="my-2 text-center">
                    <a href="#" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md inline-block">Review Security Policy</a>
                  </p>
                  <p className="my-2">This update is in response to recent security threats and includes important information about:</p>
                  <ul className="my-2 list-disc pl-5">
                    <li>Password requirements</li>
                    <li>Multi-factor authentication</li>
                    <li>Phishing awareness</li>
                    <li>Data handling procedures</li>
                  </ul>
                  <p className="my-2">Failure to acknowledge this update within 48 hours may result in temporary restricted access to company systems.</p>
                  <p className="mt-4">Thank you,<br />IT Security Team</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" type="button" onClick={() => onSubmit()}>
          Cancel
        </Button>
        <Button type="submit">
          <Check className="mr-2 h-4 w-4" />
          Save Template
        </Button>
      </div>
    </form>
  );
};

export default NewTemplateForm;
