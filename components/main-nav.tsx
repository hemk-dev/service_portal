"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MainNavItem } from "@/types";

const navItems: MainNavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Services",
    href: "/#services",
  },
  {
    title: "How It Works",
    href: "/#how-it-works",
  },
  {
    title: "About",
    href: "/#about",
  },
];

interface MainNavProps {
  isMobile?: boolean;
}

export function MainNav({ isMobile = false }: MainNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn(
      "flex",
      isMobile ? "flex-col space-y-2" : "items-center space-x-6"
    )}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href
              ? "text-primary font-semibold"
              : "text-muted-foreground",
            isMobile && "py-2"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}