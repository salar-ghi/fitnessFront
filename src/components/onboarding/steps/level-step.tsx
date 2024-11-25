"use client";

import { motion } from "framer-motion";
import { Dumbbell, Trophy, Medal, Star } from "lucide-react";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const levels = [
  {
    value: "beginner",
    label: "Beginner",
    description: "New to fitness",
    icon: Dumbbell,
  },
  {
    value: "intermediate",
    label: "Intermediate",
    description: "Regular training",
    icon: Medal,
  },
  {
    value: "advanced",
    label: "Advanced",
    description: "Consistent form",
    icon: Trophy,
  },
  {
    value: "expert",
    label: "Expert",
    description: "Years of training",
    icon: Star,
  },
] as const;

export function LevelStep() {
  const { fitnessLevel, setFitnessLevel, nextStep, previousStep } = useUserStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-green-800 dark:text-green-100">
        What's your fitness level?
      </h2>

      <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
        {levels.map((level) => (
          <motion.div
            key={level.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`aspect-square cursor-pointer transition-all ${
                fitnessLevel === level.value
                  ? "border-green-500 bg-green-50 dark:bg-green-900"
                  : "hover:shadow-md"
              }`}
              onClick={() => setFitnessLevel(level.value)}
            >
              <div className="h-full p-3 flex flex-col items-center justify-center text-center space-y-2">
                <level.icon className="w-8 h-8 text-green-600" />
                <h3 className="font-medium text-xs">{level.label}</h3>
                <p className="text-[10px] text-gray-600 dark:text-gray-300 line-clamp-2">
                  {level.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button
          onClick={previousStep}
          variant="outline"
          className="border-green-600 text-green-600"
        >
          Previous
        </Button>
        <Button
          onClick={nextStep}
          disabled={!fitnessLevel}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}