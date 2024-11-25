"use client";

import { motion } from "framer-motion";
import { Baby, User, Users, UserCog, UserCheck, UserMinus } from "lucide-react";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ageRanges = [
  {
    value: "Under Eighteen",
    label: "Under 18",
    description: "Focused on proper form",
    icon: Baby,
  },
  {
    value: "Eighteen To TwentyNine",
    label: "18-29",
    description: "Peak performance",
    icon: User,
  },
  {
    value: "Thirty To ThirtyNine",
    label: "30-39",
    description: "Balanced training",
    icon: Users,
  },
  {
    value: "Fourty To FourtyNine",
    label: "40-49",
    description: "Muscle maintenance",
    icon: UserCog,
  },
  {
    value: "Fifty To FiftyNine",
    label: "50-59",
    description: "Functional strength",
    icon: UserCheck,
  },
  {
    value: "sixty plus",
    label: "60+",
    description: "Low-impact focus",
    icon: UserMinus,
  },
] as const;

export function AgeRangeStep() {
  const { ageRange, setAgeRange, nextStep, previousStep } = useUserStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-green-800 dark:text-green-100">
        Select Your Age Range
      </h2>

      <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
        {ageRanges.map((range) => (
          <motion.div
            key={range.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`aspect-square cursor-pointer transition-all ${
                ageRange === range.value
                  ? "border-green-500 bg-green-50 dark:bg-green-900"
                  : "hover:shadow-md"
              }`}
              onClick={() => setAgeRange(range.value)}
            >
              <div className="h-full p-3 flex flex-col items-center justify-center text-center space-y-2">
                <range.icon className="w-8 h-8 text-green-600" />
                <h3 className="font-medium text-xs">{range.label}</h3>
                <p className="text-[10px] text-gray-600 dark:text-gray-300 line-clamp-2">
                  {range.description}
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
          disabled={!ageRange}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}