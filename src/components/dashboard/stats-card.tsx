"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

interface StatsCardProps {
  title: string;
  stats: Stat[];
}

const colorVariants = {
  green: "text-green-600 bg-green-100 dark:bg-green-900/30",
  blue: "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
  purple: "text-purple-600 bg-purple-100 dark:bg-purple-900/30",
  amber: "text-amber-600 bg-amber-100 dark:bg-amber-900/30",
};

export function StatsCard({ title, stats }: StatsCardProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-3 rounded-lg ${colorVariants[stat.color]}`}
          >
            <div className="flex items-center gap-3">
              <stat.icon className="w-5 h-5" />
              <span className="font-medium">{stat.label}</span>
            </div>
            <span className="text-lg font-semibold">{stat.value}</span>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}