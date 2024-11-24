"use client";

import { motion } from "framer-motion";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export function MeasurementsStep() {
  const { height, weight, setHeight, setWeight, nextStep, previousStep } =
    useUserStore();

  const handleNext = () => {
    if (height && weight) {
      nextStep();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-center text-green-800 dark:text-green-100">
        Your Measurements
      </h2>

      <Card className="p-4 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="height" className="text-sm">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            inputMode="decimal"
            value={height || ""}
            onChange={(e) => setHeight(Number(e.target.value))}
            placeholder="Enter your height"
            className="border-green-200 focus:border-green-500 h-10 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight" className="text-sm">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            inputMode="decimal"
            value={weight || ""}
            onChange={(e) => setWeight(Number(e.target.value))}
            placeholder="Enter your weight"
            className="border-green-200 focus:border-green-500 h-10 text-base"
          />
        </div>
      </Card>

      <div className="flex justify-between mt-4 px-2">
        <Button
          onClick={previousStep}
          variant="outline"
          className="border-green-600 text-green-600"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!height || !weight}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}