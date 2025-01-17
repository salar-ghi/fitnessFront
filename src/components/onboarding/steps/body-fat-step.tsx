"use client";

import { motion } from "framer-motion";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BodyFatModel } from "./body-fat/body-fat-model";
import { FatPercentageSlider } from "./body-fat/fat-percentage-slider";

export function BodyFatStep() {
  const { gender, bodyFat, setBodyFat, nextStep, previousStep } = useUserStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-green-800 dark:text-green-100">
          Current Body Fat
        </h2>
        <p className="text-sm text-muted-foreground">
          Estimate your current body fat percentage
        </p>
      </div>

      <Card className="p-6 space-y-8">
        <BodyFatModel 
          gender={gender as "male" | "female"} 
          bodyFat={bodyFat || 20}
        />
        
        <FatPercentageSlider
          value={bodyFat || 20}
          onChange={setBodyFat}
        />
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