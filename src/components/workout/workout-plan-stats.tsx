"use client";

import { Calendar, Clock, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WorkoutPlan } from "@/types/workout";

interface WorkoutPlanStatsProps {
  plan: WorkoutPlan;
}

export function WorkoutPlanStats({ plan }: WorkoutPlanStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <Calendar className="w-4 h-4" />
          <span>Started {new Date(plan.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <Clock className="w-4 h-4" />
          <span>{plan.duration} Plan</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <Target className="w-4 h-4" />
          <span>Day {plan.currentDay} of {plan.totalDays}</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Target Muscles</h3>
        <div className="flex flex-wrap gap-2">
          {plan.targetMuscles?.map((muscle) => (
            <Badge key={muscle} variant="outline" className="capitalize">
              {muscle}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Schedule</h3>
        <div className="flex flex-wrap gap-2">
          {plan.schedule?.map((day) => (
            <Badge key={day} variant="outline">
              {day}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}