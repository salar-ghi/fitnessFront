"use client";

import { motion } from "framer-motion";
import { Leaf, Fish, Apple } from "lucide-react";
import { useDietStore } from "@/lib/store/diet-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const preferences = [
  {
    value: "anything",
    label: "No Restrictions",
    description: "I eat everything",
    icon: Apple,
  },
  {
    value: "vegetarian",
    label: "Vegetarian",
    description: "No meat, but yes to dairy and eggs",
    icon: Leaf,
  },
  {
    value: "vegan",
    label: "Vegan",
    description: "Plant-based only",
    icon: Leaf,
  },
  {
    value: "pescatarian",
    label: "Pescatarian",
    description: "Vegetarian plus seafood",
    icon: Fish,
  },
] as const;

export function PreferenceStep() {
  const { mealPreference, setMealPreference, nextStep, previousStep } = useDietStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-green-800 dark:text-green-100">
        What's your dietary preference?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {preferences.map((pref) => (
          <motion.div
            key={pref.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`p-6 cursor-pointer transition-all ${
                mealPreference === pref.value
                  ? "border-green-500 bg-green-50 dark:bg-green-900/30"
                  : ""
              }`}
              onClick={() => setMealPreference(pref.value)}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-green-100 dark:bg-green-800 rounded-full">
                  <pref.icon className="w-6 h-6 text-green-600 dark:text-green-300" />
                </div>
                <h3 className="text-lg font-medium">{pref.label}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {pref.description}
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
          disabled={!mealPreference}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}