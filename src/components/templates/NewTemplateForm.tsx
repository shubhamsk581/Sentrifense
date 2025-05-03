
import React, { useState } from 'react';
import { Check, Code, Eye, Image, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

interface NewTemplateFormProps {
  onSubmit: () => void;
}

const NewTemplateForm: React.FC<NewTemplateFormProps> = ({ onSubmit }) => {
  const [activeTab, setActiveTab] = useState('design');
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [trackingDialogOpen, setTrackingDialogOpen] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl mx-auto">
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
                <Button type="button" variant="outline" size="sm" onClick={() => setImageDialogOpen(true)}>
                  <Image className="mr-2 h-4 w-4" />
                  Add Image
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setLinkDialogOpen(true)}>
                  <Link className="mr-2 h-4 w-4" />
                  Add Link
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setTrackingDialogOpen(true)}>
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

      {/* Add Image Dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Image</DialogTitle>
            <DialogDescription>
              Insert an image into your email template.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="image-url">Image URL</Label>
              <Input id="image-url" placeholder="https://example.com/image.jpg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image-alt">Alt Text</Label>
              <Input id="image-alt" placeholder="Description of the image" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => {
              toast.success("Image added to template");
              setImageDialogOpen(false);
            }}>
              Insert Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Link Dialog */}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
            <DialogDescription>
              Insert a link into your email template.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="link-url">URL</Label>
              <Input id="link-url" placeholder="https://example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link-text">Link Text</Label>
              <Input id="link-text" placeholder="Click here" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => {
              toast.success("Link added to template");
              setLinkDialogOpen(false);
            }}>
              Insert Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Tracking Pixel Dialog */}
      <Dialog open={trackingDialogOpen} onOpenChange={setTrackingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Tracking Pixel</DialogTitle>
            <DialogDescription>
              Insert a tracking pixel to monitor email opens.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tracking-id">Tracking ID</Label>
              <Input id="tracking-id" placeholder="Optional tracking ID" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => {
              toast.success("Tracking pixel added to template");
              setTrackingDialogOpen(false);
            }}>
              Insert Tracking Pixel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default NewTemplateForm;
