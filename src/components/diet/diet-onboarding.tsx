"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useDietStore } from "@/lib/store/diet-store";
import { GoalStep } from "./steps/goal-step";
import { CaloriesStep } from "./steps/calories-step";
import { PreferenceStep } from "./steps/preference-step";
import { CookingTimeStep } from "./steps/cooking-time-step";
import { AllergiesStep } from "./steps/allergies-step";
import { ExcludedFoodsStep } from "./steps/excluded-foods-step";
import { MealFrequencyStep } from "./steps/meal-frequency-step";
import { DietPlanStep } from "./steps/diet-plan-step";

const steps = [
  GoalStep,
  CaloriesStep,
  PreferenceStep,
  CookingTimeStep,
  AllergiesStep,
  ExcludedFoodsStep,
  MealFrequencyStep,
  DietPlanStep,
];

interface DietOnboardingProps {
  onComplete?: () => void;
}

export function DietOnboarding({ onComplete }: DietOnboardingProps) {
  const currentStep = useDietStore((state) => state.currentStep);
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