
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { CalendarIcon, Download, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { DateRange } from 'react-day-picker';

interface ReportsFiltersProps {
  onFilter: (filters: {
    dateRange: DateRange;
    campaign: string;
    status: string;
  }) => void;
}

const ReportsFilters: React.FC<ReportsFiltersProps> = ({ onFilter }) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  
  const [campaign, setCampaign] = useState<string>('all');
  const [status, setStatus] = useState<string>('all');
  
  const handleExport = () => {
    toast.success('Report exported successfully');
    // In a real app, this would trigger a download of the filtered report data
  };
  
  const handleFilter = () => {
    onFilter({
      dateRange: date || { from: undefined, to: undefined },
      campaign,
      status
    });
  };
  
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date-range">Date Range</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Select date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="campaign">Campaign</Label>
            <Select value={campaign} onValueChange={setCampaign}>
              <SelectTrigger id="campaign">
                <SelectValue placeholder="Filter by campaign" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campaigns</SelectItem>
                <SelectItem value="1">Q1 Security Training</SelectItem>
                <SelectItem value="2">Finance Department Test</SelectItem>
                <SelectItem value="3">Executive Awareness</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="opened">Opened</SelectItem>
                <SelectItem value="clicked">Clicked</SelectItem>
                <SelectItem value="reported">Reported</SelectItem>
                <SelectItem value="submitted">Submitted Credentials</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end space-x-2">
            <Button onClick={handleFilter} className="flex-1">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:ml-2">Export</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsFilters;
