"use client";

import { useState } from "react";
import { GsapAnimation } from "@/components/gsap-animation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ServiceRequest, ServiceRequestStatus } from "@/types";
import { 
  Search, 
  Filter, 
  Clock,
  MessageSquare,
  PieChart,
  Users,
  CalendarRange
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// Mock data for demo purposes
const MOCK_REQUESTS: ServiceRequest[] = [
  {
    id: "req-123456",
    clientId: "client-1",
    clientName: "John Doe",
    clientEmail: "john@example.com",
    clientPhone: "555-123-4567",
    type: "Website Design",
    description: "Need a modern website for my small business with e-commerce capabilities",
    budget: 2500,
    deadline: new Date(new Date().setDate(new Date().getDate() + 30)),
    status: "In Progress",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    notes: ["Initial consultation completed", "Wireframes in progress"],
    attachments: ["logo.png", "inspiration.pdf"],
  },
  {
    id: "req-789012",
    clientId: "client-2",
    clientName: "Sarah Johnson",
    clientEmail: "sarah@example.com",
    clientPhone: "555-987-6543",
    type: "Graphic Design",
    description: "Need a new logo and brand identity package for my business",
    budget: 800,
    deadline: new Date(new Date().setDate(new Date().getDate() + 14)),
    status: "In Review",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    notes: ["Initial concepts delivered", "Waiting for client feedback"],
  },
  {
    id: "req-345678",
    clientId: "client-3",
    clientName: "Mike Wilson",
    clientEmail: "mike@example.com",
    type: "Content Creation",
    description: "Need 5 blog posts about digital marketing trends",
    status: "New",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    id: "req-901234",
    clientId: "client-4",
    clientName: "Emily Brown",
    clientEmail: "emily@example.com",
    clientPhone: "555-456-7890",
    type: "SEO Optimization",
    description: "Need help improving my website's search engine rankings",
    status: "Pending Client Input",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 15)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    notes: ["Initial audit completed", "Waiting for access to Google Analytics"],
  },
  {
    id: "req-567890",
    clientId: "client-5",
    clientName: "David Lee",
    clientEmail: "david@example.com",
    type: "Social Media Management",
    description: "Need help managing my company's social media presence",
    budget: 1200,
    status: "Completed",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 45)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 10)),
    notes: ["Strategy developed and implemented", "3-month campaign completed"],
  },
  {
    id: "req-111222",
    clientId: "client-6",
    clientName: "Lisa Garcia",
    clientEmail: "lisa@example.com",
    type: "Website Design",
    description: "Portfolio website for photography business",
    status: "Cancelled",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 30)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 25)),
    notes: ["Client decided to postpone the project"],
  },
];

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<ServiceRequestStatus | "">("");
  const [updateNote, setUpdateNote] = useState("");

  // Filter requests based on search term and status
  const filteredRequests = MOCK_REQUESTS.filter((request) => {
    const matchesSearch =
      searchTerm === "" ||
      request.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Filter for different tabs
  const newRequests = filteredRequests.filter(
    (req) => req.status === "New"
  );
  
  const activeRequests = filteredRequests.filter(
    (req) =>
      req.status === "In Review" ||
      req.status === "In Progress" ||
      req.status === "Pending Client Input"
  );
  
  const completedRequests = filteredRequests.filter(
    (req) => req.status === "Completed" || req.status === "Cancelled"
  );

  const handleUpdateRequest = () => {
    if (!selectedRequest || !updateStatus) return;
    
    // In a real application, this would be an API call
    toast.success(`Request ${selectedRequest.id} status updated to ${updateStatus}`);
    
    setIsUpdateDialogOpen(false);
    setUpdateStatus("");
    setUpdateNote("");
  };

  const getRequestCount = (status: ServiceRequestStatus | "all") => {
    if (status === "all") return MOCK_REQUESTS.length;
    return MOCK_REQUESTS.filter(req => req.status === status).length;
  };

  return (
    <div className="container py-8">
      <GsapAnimation animation="fadeInUp">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage all service requests in one place
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Send Updates
            </Button>
          </div>
        </div>
      </GsapAnimation>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <GsapAnimation animation="stagger">
          <DashboardCard
            icon={<PieChart className="h-5 w-5 text-primary" />}
            title="Total Requests"
            value={getRequestCount("all")}
          />
          <DashboardCard
            icon={<Clock className="h-5 w-5 text-amber-500" />}
            title="Active Requests"
            value={activeRequests.length}
          />
          <DashboardCard
            icon={<Users className="h-5 w-5 text-indigo-500" />}
            title="New Requests"
            value={newRequests.length}
            highlight={newRequests.length > 0}
          />
          <DashboardCard
            icon={<CalendarRange className="h-5 w-5 text-emerald-500" />}
            title="Completed"
            value={completedRequests.length}
          />
        </GsapAnimation>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <GsapAnimation animation="fadeInUp" delay={0.2}>
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Service Requests</CardTitle>
                  <CardDescription>
                    View and manage all client service requests
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search requests..."
                      className="w-full sm:w-[200px] pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="In Review">In Review</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Pending Client Input">Pending Client Input</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <RequestsTable 
                    requests={filteredRequests}
                    onSelect={(request) => {
                      setSelectedRequest(request);
                      setIsUpdateDialogOpen(true);
                    }}
                  />
                </TabsContent>

                <TabsContent value="new" className="mt-6">
                  <RequestsTable 
                    requests={newRequests}
                    onSelect={(request) => {
                      setSelectedRequest(request);
                      setIsUpdateDialogOpen(true);
                    }}
                  />
                </TabsContent>

                <TabsContent value="active" className="mt-6">
                  <RequestsTable 
                    requests={activeRequests}
                    onSelect={(request) => {
                      setSelectedRequest(request);
                      setIsUpdateDialogOpen(true);
                    }}
                  />
                </TabsContent>

                <TabsContent value="completed" className="mt-6">
                  <RequestsTable 
                    requests={completedRequests}
                    onSelect={(request) => {
                      setSelectedRequest(request);
                      setIsUpdateDialogOpen(true);
                    }}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </GsapAnimation>
      </div>

      {/* Update Request Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Request Status</DialogTitle>
            <DialogDescription>
              Update the status and add notes to the service request.
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">ID</Label>
                <div className="col-span-3">
                  <code className="rounded bg-muted px-2 py-1">
                    {selectedRequest.id}
                  </code>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Client</Label>
                <div className="col-span-3">
                  {selectedRequest.clientName} ({selectedRequest.clientEmail})
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Type</Label>
                <div className="col-span-3">{selectedRequest.type}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Current Status</Label>
                <div className="col-span-3">
                  <StatusBadge status={selectedRequest.status} />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  New Status
                </Label>
                <div className="col-span-3">
                  <Select
                    value={updateStatus}
                    onValueChange={(value) => setUpdateStatus(value as ServiceRequestStatus)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select new status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="In Review">In Review</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Pending Client Input">Pending Client Input</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="note" className="text-right">
                  Update Note
                </Label>
                <div className="col-span-3">
                  <Textarea
                    id="note"
                    placeholder="Add a note about this status update..."
                    value={updateNote}
                    onChange={(e) => setUpdateNote(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleUpdateRequest} disabled={!updateStatus}>
              Update Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DashboardCard({
  icon,
  title,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  highlight?: boolean;
}) {
  return (
    <Card className={cn(
      "transition-all duration-200",
      highlight && "border-primary/50 shadow-md"
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          {icon}
          {highlight && (
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-sm text-muted-foreground">{title}</p>
      </CardContent>
    </Card>
  );
}

function RequestsTable({
  requests,
  onSelect,
}: {
  requests: ServiceRequest[];
  onSelect: (request: ServiceRequest) => void;
}) {
  if (requests.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 bg-muted/20 rounded-md">
        <p className="text-muted-foreground">No requests found</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-mono text-sm">{request.id}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{request.clientName}</div>
                  <div className="text-sm text-muted-foreground">{request.clientEmail}</div>
                </div>
              </TableCell>
              <TableCell>{request.type}</TableCell>
              <TableCell>
                <StatusBadge status={request.status} />
              </TableCell>
              <TableCell>{format(new Date(request.createdAt), "MMM d, yyyy")}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSelect(request)}
                >
                  Update
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function StatusBadge({ status }: { status: ServiceRequestStatus }) {
  const getStatusColor = () => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "In Review":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "In Progress":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "Pending Client Input":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return <Badge className={cn("font-medium", getStatusColor())}>{status}</Badge>;
}