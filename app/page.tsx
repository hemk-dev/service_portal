"use client";

import { useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GsapAnimation } from "@/components/gsap-animation";
import { Button } from "@/components/ui/button";
import {
  MessageSquarePlus,
  Check,
  Clock,
  Activity,
  BarChart,
  Zap,
  CalendarClock,
  Users,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10 dark:from-primary/10 dark:to-secondary/20 -z-10"></div>
        <div className="container px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <GsapAnimation animation="fadeInLeft">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground sm:leading-[1.2] md:leading-[1.1] leading-[1.5]">
                  Automate Your Service Requests & Focus On What Matters
                </h1>
              </GsapAnimation>
              
              <GsapAnimation animation="fadeInLeft" delay={0.2}>
                <p className="mt-4 text-lg text-muted-foreground max-w-lg">
                  Streamline client inquiries, automate workflows, and deliver exceptional service without the administrative headache.
                </p>
              </GsapAnimation>
              
              <GsapAnimation animation="fadeInLeft" delay={0.4}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/request">
                    <Button size="lg" className="rounded-full">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/#how-it-works">
                    <Button variant="outline" size="lg" className="rounded-full">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </GsapAnimation>
              
              <GsapAnimation animation="fadeInLeft" delay={0.6}>
                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                  <span className="mx-2">•</span>
                  <Check className="h-4 w-4 text-primary" />
                  <span>Free for solopreneurs</span>
                </div>
              </GsapAnimation>
            </div>
            
            <GsapAnimation animation="fadeInRight" delay={0.3}>
              <div className="relative">
                <div className="relative bg-background rounded-lg shadow-xl overflow-hidden">
                  <div className="p-1 bg-gradient-to-r from-primary/50 to-secondary/50">
                    <div className="bg-background p-4 rounded-t-md flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full bg-destructive/70"></div>
                      <div className="h-3 w-3 rounded-full bg-amber-500/70"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500/70"></div>
                      <div className="ml-4 text-xs text-muted-foreground">ServicePortal Dashboard</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="h-8 bg-muted rounded-md w-1/3 animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded-md w-full"></div>
                        <div className="h-4 bg-muted rounded-md w-5/6"></div>
                        <div className="h-4 bg-muted rounded-md w-4/6"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-8 bg-primary/30 rounded-md w-1/4"></div>
                        <div className="h-8 bg-muted rounded-md w-1/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 h-24 w-24 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-8 -left-8 h-32 w-32 bg-secondary/20 rounded-full blur-3xl"></div>
              </div>
            </GsapAnimation>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="services" className="py-16 lg:py-24 bg-muted/50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <GsapAnimation animation="fadeInUp">
            <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-12">
              <h2 className="text-3xl font-bold">Services That Scale With Your Business</h2>
              <p className="mt-4 text-muted-foreground">Our platform helps you manage and automate service requests of all types</p>
            </div>
          </GsapAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Activity />,
                title: "Website Design",
                description: "Professional websites tailored to your brand and business goals. We create responsive, modern designs that convert visitors into customers."
              },
              {
                icon: <BarChart />,
                title: "Graphic Design",
                description: "Eye-catching visuals for your marketing materials and social media. From logos to full brand identity packages that make you stand out."
              },
              {
                icon: <Users />,
                title: "Social Media Management",
                description: "Strategic social media management to grow your audience and engagement. We handle content creation, scheduling, and analytics."
              },
              {
                icon: <Zap />,
                title: "Content Creation",
                description: "Compelling content that resonates with your target audience. Blog posts, articles, and copy that drives organic traffic and conversions."
              },
              {
                icon: <CalendarClock />,
                title: "SEO Optimization",
                description: "Data-driven SEO strategies to improve your search rankings. We help you reach more customers through organic search traffic."
              },
              {
                icon: <MessageSquarePlus />,
                title: "Custom Services",
                description: "Need something specific? We work with you to create custom solutions that meet your unique business requirements and goals."
              }
            ].map((service, index) => (
              <GsapAnimation key={index} animation="fadeInUp" delay={index * 0.1}>
                <ServiceCard 
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              </GsapAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 lg:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <GsapAnimation animation="fadeInUp">
            <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-12">
              <h2 className="text-3xl font-bold">How It Works</h2>
              <p className="mt-4 text-muted-foreground">Three simple steps to automate your service requests</p>
            </div>
          </GsapAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GsapAnimation animation="fadeInUp" delay={0.2}>
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Submit a Request</h3>
                <p className="text-muted-foreground">Fill out our intuitive service request form with all the details</p>
              </div>
            </GsapAnimation>

            <GsapAnimation animation="fadeInUp" delay={0.4}>
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                <p className="text-muted-foreground">Monitor the status of your request in real-time through your dashboard</p>
              </div>
            </GsapAnimation>

            <GsapAnimation animation="fadeInUp" delay={0.6}>
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Results</h3>
                <p className="text-muted-foreground">Receive and review your completed services with optional revisions</p>
              </div>
            </GsapAnimation>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section id="testimonials" className="py-16 lg:py-24 bg-muted/50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <GsapAnimation animation="fadeInUp">
            <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-12">
              <h2 className="text-3xl font-bold">What Our Clients Say</h2>
              <p className="mt-4 text-muted-foreground">Don't just take our word for it</p>
            </div>
          </GsapAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "Marketing Manager",
                testimonial: "The service portal has transformed how we handle client requests. Everything is organized and tracked in one place. The automated workflows have saved us countless hours of manual work."
              },
              {
                name: "David Chen",
                role: "Freelance Designer",
                testimonial: "As a solopreneur, this platform has been a game-changer. I can focus on my creative work instead of getting bogged down by administrative tasks. The client communication features are excellent."
              },
              {
                name: "Emma Rodriguez",
                role: "Small Business Owner",
                testimonial: "The automated workflows have saved me countless hours. My clients love the professional experience and real-time updates. It's like having a virtual assistant managing all my service requests."
              }
            ].map((testimonial, index) => (
              <GsapAnimation key={index} animation="fadeInUp" delay={index * 0.2}>
                <TestimonialCard 
                  name={testimonial.name}
                  role={testimonial.role}
                  testimonial={testimonial.testimonial}
                />
              </GsapAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <GsapAnimation animation="fadeInUp">
            <div className="bg-primary/10 rounded-2xl p-6 sm:p-8 lg:p-12 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Streamline Your Service Requests?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of solopreneurs and small businesses who are saving time and delighting clients with our service request automation.
              </p>
              <Link href="/request">
                <Button size="lg" className="rounded-full">Get Started Today</Button>
              </Link>
            </div>
          </GsapAnimation>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="mb-2 bg-primary/10 w-10 h-10 rounded-md flex items-center justify-center text-primary">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="pt-6">
        <Link href="/request" className="text-sm text-primary hover:underline">
          Request this service →
        </Link>
      </CardFooter>
    </Card>
  );
}

function TestimonialCard({ name, role, testimonial }: { name: string, role: string, testimonial: string }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground italic mb-4">&ldquo;{testimonial}&rdquo;</p>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
}