"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { bodyParts } from "./health-conditions/body-parts-data";
import { BodyPartCard } from "./health-conditions/body-part-card";

export function HealthConditionsStep() {
  const {
    healthConditions,
    setHealthCondition,
    removeHealthCondition,
    nextStep,
    previousStep
  } = useUserStore();

  const handleToggle = (partId: string) => {
    if (healthConditions[partId]) {
      removeHealthCondition(partId);
    } else {
      setHealthCondition(partId, { subPart: "", description: "" });
    }
  };

  const handleConditionChange = (partId: string, description: string) => {
    setHealthCondition(partId, {
      ...healthConditions[partId],
      description
    });
  };

  const handleSubPartChange = (partId: string, subPart: string) => {
    setHealthCondition(partId, {
      ...healthConditions[partId],
      subPart
    });
  };

  const hasConditions = Object.keys(healthConditions).length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-center text-green-800 dark:text-green-100">
        Do you have any injuries or conditions?
      </h2>
      <p className="text-sm text-center text-muted-foreground">
        Select the affected body parts and describe your condition
      </p>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {bodyParts.map((part) => (
            <BodyPartCard
              key={part.id}
              id={part.id}
              label={part.label}
              description={part.description}
              subParts={part.subParts}
              isSelected={!!healthConditions[part.id]}
              onToggle={handleToggle}
              condition={healthConditions[part.id]?.description || ""}
              subPart={healthConditions[part.id]?.subPart || ""}
              onConditionChange={handleConditionChange}
              onSubPartChange={handleSubPartChange}
            />
          ))}
        </div>
      </ScrollArea>

      {hasConditions && (
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
            <AlertTriangle className="w-4 h-4" />
            <p className="text-sm">
              Your workout plan will be adjusted based on your conditions
            </p>
          </div>
        </div>
      )}

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