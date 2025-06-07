"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus, Menu, X } from "lucide-react";

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when navigating
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="flex items-center gap-2">
              <MessageSquarePlus className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg sm:text-xl hidden sm:inline-block">ServicePortal</span>
            </Link>
            <div className="hidden md:flex">
              <MainNav />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex items-center gap-2 sm:gap-4">
              <ModeToggle />
              <Link href="/request">
                <Button size="sm" className="h-9">New Request</Button>
              </Link>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-sm">
          <div className="container px-4 sm:px-6 lg:px-8 py-6">
            <nav className="flex flex-col gap-6">
              <MainNav isMobile />
              <div className="flex flex-col gap-3">
                <Link href="/request" className="w-full">
                  <Button className="w-full" size="sm">New Request</Button>
                </Link>
                <div className="flex justify-end pt-2">
                  <ModeToggle />
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}