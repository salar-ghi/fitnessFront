"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useDietStore } from "@/lib/store/diet-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const commonAllergies = [
  "Dairy",
  "Eggs",
  "Peanuts",
  "Tree Nuts",
  "Soy",
  "Wheat",
  "Fish",
  "Shellfish",
  "Sesame",
];

export function AllergiesStep() {
  const { allergies, toggleAllergy, nextStep, previousStep } = useDietStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-green-800 dark:text-green-100">
        Do you have any allergies?
      </h2>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commonAllergies.map((allergy) => (
            <div
              key={allergy}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <Checkbox
                id={allergy}
                checked={allergies.includes(allergy)}
                onCheckedChange={() => toggleAllergy(allergy)}
                className="mt-1 border-green-500 data-[state=checked]:bg-green-500"
              />
              <div className="space-y-1">
                <label
                  htmlFor={allergy}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {allergy}
                </label>
                <p className="text-xs text-muted-foreground">
                  Exclude {allergy.toLowerCase()} from meal plans
                </p>
              </div>
            </div>
          ))}
        </div>

        {allergies.length > 0 && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
              <AlertTriangle className="w-4 h-4" />
              <p className="text-sm">
                Your meal plan will exclude these ingredients for your safety
              </p>
            </div>
          </div>
        )}
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