"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Sun, Calendar as CalendarIcon } from "lucide-react";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const durations = [
  {
    value: "Daily",
    label: "Daily Plan",
    description: "New workout every day",
    icon: Sun,
  },
  {
    value: "Weekly",
    label: "Weekly Plan",
    description: "Plan changes every week",
    icon: Calendar,
  },
  {
    value: "Monthly",
    label: "Monthly Plan",
    description: "Monthly progression",
    icon: CalendarIcon,
  },
  {
    value: "Quarterly",
    label: "Quarterly Plan",
    description: "Long-term progression",
    icon: Clock,
  },
] as const;

export function PlanDurationStep() {
  const { planDuration, setPlanDuration, nextStep, previousStep } = useUserStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-green-800 dark:text-green-100">
        Choose Your Plan Duration
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {durations.map((duration) => (
          <motion.div
            key={duration.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`p-4 cursor-pointer transition-all ${
                planDuration === duration.value
                  ? "border-green-500 bg-green-50 dark:bg-green-900"
                  : "hover:shadow-md"
              }`}
              onClick={() => setPlanDuration(duration.value)}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <duration.icon className="w-8 h-8 text-green-600" />
                <h3 className="font-medium">{duration.label}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {duration.description}
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
          disabled={!planDuration}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}