"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Dumbbell, Apple, Trophy, Lightbulb, Heart, Clock } from "lucide-react";

const tips = [
  {
    title: "Stay Consistent",
    description: "Build lasting habits with regular workouts",
    icon: Trophy,
    gradient: "from-green-500 to-emerald-700",
  },
  {
    title: "Proper Form",
    description: "Quality over quantity in every exercise",
    icon: Dumbbell,
    gradient: "from-blue-500 to-indigo-700",
  },
  {
    title: "Balanced Diet",
    description: "Fuel your body with proper nutrition",
    icon: Apple,
    gradient: "from-purple-500 to-pink-700",
  },
  {
    title: "Rest & Recovery",
    description: "Give your body time to rebuild",
    icon: Clock,
    gradient: "from-orange-500 to-red-700",
  },
  {
    title: "Stay Motivated",
    description: "Set achievable goals and celebrate wins",
    icon: Lightbulb,
    gradient: "from-yellow-500 to-orange-700",
  },
  {
    title: "Listen to Your Body",
    description: "Adjust intensity based on how you feel",
    icon: Heart,
    gradient: "from-pink-500 to-rose-700",
  },
];

export function TipsGrid() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Tips & Motivation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {tips.map((tip, index) => (
          <motion.div
            key={tip.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <div className={`h-full rounded-xl bg-gradient-to-br ${tip.gradient} p-6 text-white transform transition-all duration-300 hover:shadow-xl`}>
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-white/20 rounded-full transform group-hover:scale-110 transition-transform duration-300">
                  <tip.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold">{tip.title}</h3>
                <p className="text-sm text-white/90">{tip.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}