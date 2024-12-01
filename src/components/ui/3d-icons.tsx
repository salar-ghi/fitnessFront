"use client";

import { motion } from "framer-motion";
import { LucideProps } from "lucide-react";
import { forwardRef } from "react";

const Icon3D = forwardRef<SVGSVGElement, LucideProps>(({ className, children, ...props }, ref) => {
  return (
    <motion.div  
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}>
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
        >
        {children}
      </svg>
    </motion.div>
  );
});

Icon3D.displayName = "Icon3D";

export const MenuIcon3D = forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
  <Icon3D ref={ref} {...props}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </Icon3D>
));

export const Home3D = forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
  <Icon3D ref={ref} {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </Icon3D>
));

export const Dumbbell3D = forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
  <Icon3D ref={ref} {...props}>
    <path d="M6 5v14M18 5v14M3 8h18M3 16h18" />
  </Icon3D>
));

export const Calendar3D = forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
  <Icon3D ref={ref} {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </Icon3D>
));

export const History3D = forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
  <Icon3D ref={ref} {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </Icon3D>
));

export const Settings3D = forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
  <Icon3D ref={ref} {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </Icon3D>
));

export const Apple3D = forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
  <Icon3D ref={ref} {...props}>
    <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
    <path d="M18 9a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0v-6a3 3 0 0 0-3-3z" />
  </Icon3D>
));

MenuIcon3D.displayName = "MenuIcon3D";
Home3D.displayName = "Home3D";
Dumbbell3D.displayName = "Dumbbell3D";
Calendar3D.displayName = "Calendar3D";
History3D.displayName = "History3D";
Settings3D.displayName = "Settings3D";
Apple3D.displayName = "Apple3D";

// export default Icon3D;