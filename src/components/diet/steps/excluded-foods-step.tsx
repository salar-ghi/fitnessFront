"use client";

import { motion } from "framer-motion";
import { useDietStore } from "@/lib/store/diet-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

const commonExcludedFoods = [
  "Red Meat",
  "Processed Foods",
  "Added Sugar",
  "Fried Foods",
  "Artificial Sweeteners",
  "Gluten",
  "Dairy",
  "Caffeine",
  "Alcohol",
  "Fast Food",
];

export function ExcludedFoodsStep() {
  const { excludedFoods, toggleExcludedFood, nextStep, previousStep } = useDietStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-green-800 dark:text-green-100">
        Any foods you want to exclude?
      </h2>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commonExcludedFoods.map((food) => (
            <div
              key={food}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <Checkbox
                id={food}
                checked={excludedFoods.includes(food)}
                onCheckedChange={() => toggleExcludedFood(food)}
                className="mt-1 border-green-500 data-[state=checked]:bg-green-500"
              />
              <div className="space-y-1">
                <label
                  htmlFor={food}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {food}
                </label>
                <p className="text-xs text-muted-foreground">
                  Exclude {food.toLowerCase()} from meal plans
                </p>
              </div>
            </div>
          ))}
        </div>
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
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}