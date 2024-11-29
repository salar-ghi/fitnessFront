"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import { motion } from "framer-motion";
import {
  Home,
  Dumbbell,
  Calendar,
  History,
  Settings,
  // ChevronRight,
  // User,
  Apple,
} from "lucide-react";
import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/layout/mode-toggle";

const navItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Workouts",
    href: "/workouts",
    icon: Dumbbell,
  },
  {
    title: "Diet",
    href: "/diet",
    icon: Apple,
  },
  {
    title: "Schedule",
    href: "/schedule",
    icon: Calendar,
  },
  {
    title: "History",
    href: "/history",
    icon: History,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
] as const;

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex h-screen w-[240px] flex-col fixed left-0 top-0 bottom-0 border-r bg-background">
      <div className="flex h-14 items-center px-4 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <Dumbbell className="h-6 w-6" />
          <span className="font-semibold">Fitness App</span>
        </Link>
      </div>
      <div className="flex-1 flex flex-col justify-between py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-secondary"
                  : "hover:bg-secondary/80"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
        <div className="px-4 py-2">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}