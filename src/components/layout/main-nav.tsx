"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { // ChevronLeft, Home, Calendar, History, Settings, Apple, MenuIcon, 
  Dumbbell,
} from "lucide-react";
import {
  Home3D,
  Calendar3D,
  History3D,
  Settings3D,
  Apple3D,
  MenuIcon3D,
} from "@/components/ui/3d-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import useToggleStore from '@/lib/store/toggle-store';


const navItems = [
  {
    title: "Home",
    href: "/home",
    icon: Home3D,
  },
  {
    title: "Workouts",
    href: "/home/workouts",
    icon: Dumbbell,
  },
  {
    title: "Diet",
    href: "/home/diet",
    icon: Apple3D,
  },
  {
    title: "Schedule",
    href: "/home/schedule",
    icon: Calendar3D,
  },
  {
    title: "History",
    href: "/home/history",
    icon: History3D,
  },
  {
    title: "Settings",
    href: "/home/settings",
    icon: Settings3D,
  },
] as const;

export function MainNav() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const { isToggled, toggle } = useToggleStore();

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 1280);
      if (window.innerWidth < 1280) {
        toggle();
      };    
      // toggle(window.innerWidth < 1280);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ x: isMobile ? -240 : 0 }}
        animate={{ x: isToggled ? 0 : 0, width: isToggled ? 72: 240 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "hidden md:flex h-screen flex-col fixed left-0 top-0 bottom-0 border-r bg-background/95 backdrop-blur-md shadow-lg z-50",
          isToggled ? "w-[72px]" : "w-[240px]"
        )}
      >
        <div className="flex h-14 items-center px-4 border-b justify-between bg-background/95 backdrop-blur">
          {!isToggled && (
            <Link href="/" className="flex items-center space-x-2">
              <motion.div whileHover={{ scale: 1.1, rotate: 10 }} whileTap={{ scale: 0.9 }} >
                <Dumbbell className="h-5 w-5 text-primary" />
              </motion.div>
              <span className="font-semibold">Fitness App</span>
            </Link>
          )}
          <Button
            // variant="ghost" size="icon" onClick={() => setIsToggled(!isToggled)}
            variant="ghost" size="icon" onClick={toggle}
            className={cn("hover:bg-primary/10 transition-all duration-300",
              isToggled ? "w-full justify-center" : "ml-auto"
            )}
          >
            <motion.div
              animate={{ rotate: isToggled ? 0 : 180}}
              transition={{ duration: 0.3 }}
              // whileHover={{ scale: 1.1 }}
              // whileTap={{ scale: 0.9 }}
            >
              <MenuIcon3D className="h-5 w-5 text-primary" />
              {/* <ChevronLeft className="h-5 w-5 text-primary" /> */}
            </motion.div>
          </Button>
        </div>

        <nav className="flex-1 flex flex-col justify-between py-4 overflow-y-auto">
          <div className="grid gap-2 px-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} prefetch scroll={false}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 relative group hover:shadow-md",
                    isActive ? "text-primary bg-primary/10 shadow-inner" : "hover:bg-primary/10"
                  )} >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative" >
                    <Icon className="h-[18px] w-[18px]" />
                  </motion.div>
                  {!isToggled && (
                    <span className="font-medium">{item.title}</span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg bg-primary/10 -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </motion.div>
    </AnimatePresence>
  );
}