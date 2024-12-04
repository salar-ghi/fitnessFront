"use client";

import { motion } from "framer-motion";
import { useDietStore } from "@/lib/store/diet-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DietPlanStep({ onComplete }: { onComplete?: () => void }) {
  const state = useDietStore();

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
    state.resetForm();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-green-800 dark:text-green-100">
        Your Diet Plan Summary
      </h2>

      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium">Goal</h3>
          <Badge variant="secondary" className="text-lg">
            {state.goal}
          </Badge>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Daily Calories</h3>
          <Badge variant="secondary" className="text-lg">
            {state.targetCalories} calories
          </Badge>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Meal Preference</h3>
          <Badge variant="secondary" className="capitalize text-lg">
            {state.mealPreference}
          </Badge>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Cooking Time</h3>
          <Badge variant="secondary" className="capitalize text-lg">
            {state.cookingTime}
          </Badge>
        </div>

        {state.allergies.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium">Allergies</h3>
            <div className="flex flex-wrap gap-2">
              {state.allergies.map((allergy) => (
                <Badge key={allergy} variant="outline">
                  {allergy}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {state.excludedFoods.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium">Excluded Foods</h3>
            <div className="flex flex-wrap gap-2">
              {state.excludedFoods.map((food) => (
                <Badge key={food} variant="outline">
                  {food}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="font-medium">Meal Frequency</h3>
          <div className="flex gap-4">
            <Badge variant="secondary">
              {state.mealsPerDay} meals per day
            </Badge>
            <Badge variant="secondary">
              {state.snacksPerDay} snacks per day
            </Badge>
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button
          onClick={state.previousStep}
          variant="outline"
          className="border-green-600 text-green-600"
        >
          Previous
        </Button>
        <Button
          onClick={handleComplete}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Create Plan
        </Button>
      </div>
    </motion.div>
  );
}