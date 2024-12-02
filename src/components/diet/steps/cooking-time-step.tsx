"use client";

import { motion } from "framer-motion";
import { Clock, Timer, Hourglass } from "lucide-react";
import { useDietStore } from "@/lib/store/diet-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const cookingTimes = [
  {
    value: "minimal",
    label: "Minimal",
    description: "Quick meals under 15 minutes",
    icon: Clock,
  },
  {
    value: "moderate",
    label: "Moderate",
    description: "15-30 minutes per meal",
    icon: Timer,
  },
  {
    value: "extensive",
    label: "Extensive",
    description: "30+ minutes for detailed prep",
    icon: Hourglass,
  },
] as const;

export function CookingTimeStep() {
  const { cookingTime, setCookingTime, nextStep, previousStep } = useDietStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-green-800 dark:text-green-100">
        How much time can you spend cooking?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cookingTimes.map((time) => (
          <motion.div
            key={time.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`p-6 cursor-pointer transition-all ${
                cookingTime === time.value
                  ? "border-green-500 bg-green-50 dark:bg-green-900/30"
                  : ""
              }`}
              onClick={() => setCookingTime(time.value)}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-green-100 dark:bg-green-800 rounded-full">
                  <time.icon className="w-6 h-6 text-green-600 dark:text-green-300" />
                </div>
                <h3 className="text-lg font-medium">{time.label}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {time.description}
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
          disabled={!cookingTime}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}