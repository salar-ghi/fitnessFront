"use client";

import { motion } from "framer-motion";
import { Target, TrendingDown, TrendingUp, Heart } from "lucide-react";
import { useDietStore } from "@/lib/store/diet-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const goals = [
  {
    value: "weight-loss",
    label: "Weight Loss",
    description: "Reduce body fat while maintaining muscle",
    icon: TrendingDown,
  },
  {
    value: "muscle-gain",
    label: "Muscle Gain",
    description: "Build muscle mass and strength",
    icon: TrendingUp,
  },
  {
    value: "maintenance",
    label: "Maintenance",
    description: "Maintain current weight and body composition",
    icon: Target,
  },
  {
    value: "health",
    label: "General Health",
    description: "Focus on overall health and wellness",
    icon: Heart,
  },
] as const;

export function GoalStep() {
  const { goal, setGoal, nextStep } = useDietStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-green-800 dark:text-green-100">
        What's your diet goal?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((g) => (
          <motion.div
            key={g.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`p-6 cursor-pointer transition-all ${
                goal === g.value
                  ? "border-green-500 bg-green-50 dark:bg-green-900/30"
                  : ""
              }`}
              onClick={() => setGoal(g.value)}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-green-100 dark:bg-green-800 rounded-full">
                  <g.icon className="w-6 h-6 text-green-600 dark:text-green-300" />
                </div>
                <h3 className="text-lg font-medium">{g.label}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {g.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={nextStep}
          disabled={!goal}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}