"use client";

import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { UserNav } from "@/components/layout/user-nav";
import { ModeToggle } from "@/components/layout/mode-toggle";

import React, { useEffect } from "react";
import useToggleStore from "@/lib/store/toggle-store";

export default function DashboardLayout({ 
  children,
 }: Readonly<{ 
  children: React.ReactNode;
 }>) {
  const isToggled = useToggleStore((state) => state.isToggled);
  useEffect(() => {
  }, [isToggled]);
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      {/* check mobile */}
      <div className={`transition-all duration-300 ${isToggled ? "pl-[72px]" : "pl-[240px]"} `}>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </header>
        {children}
      </div>
      <MobileNav />
    </div>

  );
}