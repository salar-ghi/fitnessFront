"use client";

import { motion } from "framer-motion";
import { useDietStore } from "@/lib/store/diet-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function MealFrequencyStep() {
  const { mealsPerDay, snacksPerDay, setMealsPerDay, setSnacksPerDay, nextStep, previousStep } = useDietStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-green-800 dark:text-green-100">
        How many meals and snacks per day?
      </h2>

      <Card className="p-6">
        <div className="grid gap-6">
          <div className="space-y-2">
            <Label>Main Meals per Day</Label>
            <Select
              value={mealsPerDay.toString()}
              onValueChange={(value) => setMealsPerDay(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select number of meals" />
              </SelectTrigger>
              <SelectContent>
                {[2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} meals
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Recommended: 3-4 meals per day
            </p>
          </div>

          <div className="space-y-2">
            <Label>Snacks per Day</Label>
            <Select
              value={snacksPerDay.toString()}
              onValueChange={(value) => setSnacksPerDay(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select number of snacks" />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} snacks
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Healthy snacks help maintain energy levels
            </p>
          </div>
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