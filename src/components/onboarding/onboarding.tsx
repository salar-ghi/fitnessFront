"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/lib/store";
import { GenderStep } from "./steps/gender-step";
import { AgeStep } from "./steps/age-step";
import { AgeRangeStep } from "./steps/age-range-step";
import { MeasurementsStep } from "./steps/measurements-step";
import { BodyTypeStep } from "./steps/body-type-step";
import { LocationStep } from "./steps/location-step";
import { EquipmentStep } from "./steps/equipment-step";
import { MuscleGroupStep } from "./steps/muscle-group-step";
import { LevelStep } from "./steps/level-step";
import { GoalsStep } from "./steps/goals-step";
import { PlanDurationStep } from "./steps/plan-duration-step";
import { ScheduleStep } from "./steps/schedule-step";
import { WorkoutPlan } from "./steps/workout-plan";

const steps = [
  GenderStep,
  AgeStep,
  AgeRangeStep,
  MeasurementsStep,
  BodyTypeStep,
  LocationStep,
  EquipmentStep,
  MuscleGroupStep,
  LevelStep,
  GoalsStep,
  PlanDurationStep,
  ScheduleStep,
  WorkoutPlan,
];

interface OnboardingProps {
  onComplete?: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const currentStep = useUserStore((state) => state.currentStep);
  const CurrentStepComponent = steps[currentStep];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="h-2 bg-green-200 rounded-full">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          />
        </div>
        <div className="mt-2 text-sm text-green-700 dark:text-green-300 text-center">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentStepComponent onComplete={onComplete} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}