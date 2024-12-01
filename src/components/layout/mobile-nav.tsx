"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
// import {
//   Home,
//   Dumbbell,
//   Apple,
//   Settings,
//   History,
// } from "lucide-react";
import {
  Home3D,
  Dumbbell3D,
  Apple3D,
  Settings3D,
  History3D,
} from "@/components/ui/3d-icons";
import { cn } from "@/lib/utils";

// const navItems = [
//   {
//     href: "/",
//     icon: Home,
//     label: "Home",
//   },
//   {
//     href: "/workouts",
//     icon: Dumbbell,
//     label: "Workouts",
//   },
//   {
//     href: "/diet",
//     icon: Apple,
//     label: "Diet",
//   },
//   {
//     href: "/history",
//     icon: History,
//     label: "History",
//   },
//   {
//     href: "/settings",
//     icon: Settings,
//     label: "Settings",
//   },
// ] as const;

const navItems = [
  {
    href: "/",
    icon: Home3D,
    label: "Home",
  },
  {
    href: "/workouts",
    icon: Dumbbell3D,
    label: "Workouts",
  },
  {
    href: "/diet",
    icon: Apple3D,
    label: "Diet",
  },
  {
    href: "/history",
    icon: History3D,
    label: "History",
  },
  {
    href: "/settings",
    icon: Settings3D,
    label: "Settings",
  },
] as const;

export function MobileNav() {
  const pathname = usePathname();

  return (
    // <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t z-50">
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t z-50 shadow-lg">
      <div className="grid grid-cols-5 p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center p-2",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
              aria-label={item.label}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <item.icon className="w-6 h-6" />
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -inset-1 bg-primary/10 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}