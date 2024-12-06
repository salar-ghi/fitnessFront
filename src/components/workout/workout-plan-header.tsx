"use client";

import { Badge } from "@/components/ui/badge";
import { WorkoutPlan } from "@/types/workout";

interface WorkoutPlanHeaderProps {
  plan: WorkoutPlan;
}

export function WorkoutPlanHeader({ plan }: WorkoutPlanHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-green-800 dark:text-green-100">
        Workout Details
      </h2>
      <Badge
        variant={
          plan.status === "active"
            ? "default"
            : plan.status === "completed"
            ? "secondary"
            : "destructive"
        }
        className="capitalize"
      >
        {plan.status}
      </Badge>
    </div>
  );
}