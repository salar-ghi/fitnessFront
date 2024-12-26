"use client";

import { motion } from "framer-motion";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BodyPartSlider } from "./body-goals/body-part-slider";
import { bodyParts } from "./body-goals/body-parts-data";

export function BodyGoalsStep() {
  const { bodyGoals, setBodyGoalValue, nextStep, previousStep } = useUserStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-center text-green-800 dark:text-green-100">
        Target Areas for Fat Loss
      </h2>
      <p className="text-sm text-center text-muted-foreground">
        Set your fat reduction goals for specific body parts
      </p>

      <Card className="p-4">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {bodyParts.map((part) => (
              <BodyPartSlider
                key={part.id}
                id={part.id}
                label={part.label}
                image={part.image}
                value={bodyGoals[part.id] || 0}
                onChange={(value) => setBodyGoalValue(part.id, value)}
              />
            ))}
          </div>
        </ScrollArea>
      </Card>

      <div className="flex justify-between pt-4">
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