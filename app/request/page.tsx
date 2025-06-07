"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServiceRequestType, FormValues } from "@/types";
import { GsapAnimation } from "@/components/gsap-animation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ChevronLeft, ChevronRight, CalendarIcon, PaperclipIcon, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { submitServiceRequest } from "@/lib/services/request";

// Schema for the first step - Basic Information
const basicInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
});

// Schema for the second step - Service Details
const serviceDetailsSchema = z.object({
  serviceType: z.enum(["Website Design", "Graphic Design", "Social Media Management", "Content Creation", "SEO Optimization", "Other"] as const, {
    required_error: "Please select a service type",
  }),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),
});

// Schema for the third step - Additional Details
const additionalDetailsSchema = z.object({
  budget: z.string().optional(),
  deadline: z.date().optional(),
  attachments: z.array(z.string()).optional(),
  additionalNotes: z.string().optional(),
});

// Combined schema for the whole form
const formSchema = z.object({
  ...basicInfoSchema.shape,
  ...serviceDetailsSchema.shape,
  ...additionalDetailsSchema.shape,
});

const serviceTypes: ServiceRequestType[] = [
  "Website Design",
  "Graphic Design",
  "Social Media Management",
  "Content Creation",
  "SEO Optimization",
  "Other",
];

export default function RequestPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: undefined,
      description: "",
      budget: "",
      deadline: undefined,
      attachments: [],
      additionalNotes: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      await submitServiceRequest(data);
      
      toast.success("Service request submitted successfully! We'll get back to you soon.");
      form.reset();
      setStep(1);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit service request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle step transitions with GSAP
  const goToNextStep = async () => {
    let canProceed = false;

    if (step === 1) {
      const result = await form.trigger(["name", "email", "phone"]);
      canProceed = result;
    } else if (step === 2) {
      const result = await form.trigger(["serviceType", "description"]);
      canProceed = result;
    }

    if (canProceed) {
      if (formContainerRef.current) {
        // Animate out
        gsap.to(formContainerRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          onComplete: () => {
            setStep((prev) => prev + 1);
            // Animate in
            gsap.fromTo(
              formContainerRef.current!,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.3 }
            );
          },
        });
      } else {
        setStep((prev) => prev + 1);
      }
    }
  };

  const goToPreviousStep = () => {
    if (formContainerRef.current) {
      // Animate out
      gsap.to(formContainerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => {
          setStep((prev) => prev - 1);
          // Animate in
          gsap.fromTo(
            formContainerRef.current!,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.3 }
          );
        },
      });
    } else {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start">
      <div className="container max-w-3xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20 mx-auto">
        <GsapAnimation animation="fadeInUp">
          <h1 className="text-3xl font-bold text-center mb-3" id="form-title">Request a Service</h1>
          <p className="text-muted-foreground text-center mb-10">
            Tell us what you need, and we'll take care of the rest
          </p>
        </GsapAnimation>

        <GsapAnimation animation="fadeInUp" delay={0.2}>
          <div className="mb-12" role="navigation" aria-label="Form Steps">
            <div className="flex items-center justify-between max-w-md mx-auto">
              <StepIndicator step={1} currentStep={step} label="Your Info" />
              <StepConnector active={step > 1} />
              <StepIndicator step={2} currentStep={step} label="Service Details" />
              <StepConnector active={step > 2} />
              <StepIndicator step={3} currentStep={step} label="Finalize" />
            </div>
          </div>
        </GsapAnimation>

        <div ref={formContainerRef} className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card className="w-full">
                <CardContent className="p-6 sm:p-8">
                  {step === 1 && (
                    <div className="space-y-6">
                      <GsapAnimation animation="fadeIn">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </GsapAnimation>

                      <GsapAnimation animation="fadeIn" delay={0.1}>
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="your.email@example.com"
                                  type="email"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </GsapAnimation>

                      <GsapAnimation animation="fadeIn" delay={0.2}>
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your phone number"
                                  type="tel"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                We'll only call if there's an urgent update
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </GsapAnimation>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <GsapAnimation animation="fadeIn">
                        <FormField
                          control={form.control}
                          name="serviceType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service Type</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a service" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {serviceTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </GsapAnimation>

                      <GsapAnimation animation="fadeIn" delay={0.1}>
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describe what you need in detail"
                                  className="min-h-32"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                The more details you provide, the better we can assist you
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </GsapAnimation>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <GsapAnimation animation="fadeIn">
                        <FormField
                          control={form.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Budget Range (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., $500-1000"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                This helps us tailor solutions to your needs
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </GsapAnimation>

                      <GsapAnimation animation="fadeIn" delay={0.1}>
                        <FormField
                          control={form.control}
                          name="deadline"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Desired Completion Date (Optional)</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormDescription>
                                When would you like this project completed?
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </GsapAnimation>

                      <GsapAnimation animation="fadeIn" delay={0.2}>
                        <FormField
                          control={form.control}
                          name="additionalNotes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Notes (Optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Any other information that might be helpful..."
                                  className="min-h-24"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </GsapAnimation>
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={goToPreviousStep}
                        aria-label="Go back to previous step"
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                    )}
                    
                    <div className="ml-auto">
                      {step < 3 ? (
                        <Button type="button" onClick={goToNextStep} aria-label="Proceed to next step">
                          Next
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        <Button type="submit" disabled={isSubmitting} aria-label="Submit service request">
                          {isSubmitting ? (
                            <div className="flex items-center" role="status" aria-live="polite">
                              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                              Submitting...
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Send className="mr-2 h-4 w-4" />
                              Submit Request
                            </div>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ step, currentStep, label }: { step: number; currentStep: number; label: string }) {
  const isActive = step === currentStep;
  const isCompleted = step < currentStep;

  return (
    <div className="flex flex-col items-center" role="status" aria-current={isActive ? "step" : undefined}>
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold",
          {
            "border-primary bg-primary text-white": isActive,
            "border-primary bg-primary/10 text-primary": isCompleted,
            "border-muted-foreground/30 text-muted-foreground": !isActive && !isCompleted,
          }
        )}
        aria-label={`Step ${step}${isCompleted ? " (completed)" : isActive ? " (current)" : ""}`}
      >
        {isCompleted ? <Check className="h-5 w-5" aria-hidden="true" /> : step}
      </div>
      <span className="mt-2 text-xs text-muted-foreground" aria-hidden={!isActive}>
        {label}
      </span>
    </div>
  );
}

function StepConnector({ active }: { active: boolean }) {
  return (
    <div className="flex-1 mx-2" role="presentation">
      <div
        className={cn("h-[2px]", {
          "bg-primary": active,
          "bg-muted-foreground/30": !active,
        })}
      ></div>
    </div>
  );
}