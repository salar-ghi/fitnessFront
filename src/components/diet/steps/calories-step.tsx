"use client";

import { motion } from "framer-motion";
import { useDietStore } from "@/lib/store/diet-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const generateCalories = () => {
  const calories = [];
  for (let i = 1200; i <= 4000; i += 100) {
    calories.push(i);
  }
  return calories;
};

export function CaloriesStep() {
  const { targetCalories, setTargetCalories, nextStep, previousStep } = useDietStore();
  const calories = generateCalories();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-green-800 dark:text-green-100">
        Set Your Daily Calorie Target
      </h2>

      <Card className="p-4">
        <ScrollArea className="h-[300px]">
          <div className="space-y-2">
            {calories.map((cal) => (
              <div
                key={cal}
                className={`p-3 cursor-pointer rounded-lg transition-colors ${
                  targetCalories === cal
                    ? "bg-green-500 text-white"
                    : "hover:bg-green-100 dark:hover:bg-green-900/30"
                }`}
                onClick={() => setTargetCalories(cal)}
              >
                <div className="flex items-center justify-between">
                  <span>{cal} calories</span>
                  {targetCalories === cal && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

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
          disabled={!targetCalories}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}