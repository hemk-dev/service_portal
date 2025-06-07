import Link from "next/link";
import { MessageSquarePlus } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t py-12 lg:py-16">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-4 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <MessageSquarePlus className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg sm:text-xl">ServicePortal</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Streamline your service requests and automate your business workflows for solopreneurs and small businesses.
            </p>
          </div>
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 sm:pl-8">
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
                </li>
                <li>
                  <Link href="/#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link>
                </li>
                <li>
                  <Link href="/#testimonials" className="text-sm text-muted-foreground hover:text-primary transition-colors">Testimonials</Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link>
                </li>
                <li>
                  <Link href="/guides" className="text-sm text-muted-foreground hover:text-primary transition-colors">Guides</Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ServicePortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}