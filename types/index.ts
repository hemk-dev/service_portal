export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
}

export type MainNavItem = NavItem;

export type ServiceRequestStatus = 
  | "New" 
  | "In Review" 
  | "In Progress" 
  | "Pending Client Input" 
  | "Completed" 
  | "Cancelled";

export type ServiceRequestType = 
  | "Website Design" 
  | "Graphic Design" 
  | "Social Media Management" 
  | "Content Creation" 
  | "SEO Optimization" 
  | "Other";

export type ServiceRequest = {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  type: ServiceRequestType;
  description: string;
  budget?: number;
  deadline?: Date;
  status: ServiceRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  notes?: string[];
  attachments?: string[];
};

export type StatusTimelineItem = {
  status: ServiceRequestStatus;
  date: Date;
  note?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "client";
};

export interface FormValues {
  name: string;
  email: string;
  phone?: string;
  serviceType: ServiceRequestType;
  description: string;
  budget?: string;
  deadline?: Date;
  attachments?: string[];
  additionalNotes?: string;
}