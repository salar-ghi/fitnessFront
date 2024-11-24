"use client";

import { motion } from "framer-motion";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export function GoalsStep() {
  const { weight, targetWeight, setTargetWeight, nextStep, previousStep } =
    useUserStore();

  const handleNext = () => {
    if (targetWeight) {
      nextStep();
    }
  };

  const handleTargetWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTargetWeight(value ? Number(value) : 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-green-800 dark:text-green-100">
        What's your target weight?
      </h2>

      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-weight">Current Weight</Label>
          <Input
            id="current-weight"
            type="number"
            value={weight || ""}
            disabled
            className="border-green-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="target-weight">Target Weight (kg)</Label>
          <Input
            id="target-weight"
            type="number"
            value={targetWeight || ""}
            onChange={handleTargetWeightChange}
            placeholder="Enter your target weight"
            className="border-green-200 focus:border-green-500"
          />
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
          onClick={handleNext}
          disabled={!targetWeight}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}