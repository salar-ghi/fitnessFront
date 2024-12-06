"use client";

// import { motion } from "framer-motion";
// import { Calendar, Clock, Target, CheckCircle, XCircle } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WorkoutPlanHeader } from "./workout-plan-header";
import { WorkoutPlanStats } from "./workout-plan-stats";
import { WorkoutDayList } from "./workout-day-list";
import { WorkoutPlan } from "@/types/workout";

interface WorkoutDetailsProps {
  plan: WorkoutPlan;
}

export function WorkoutDetails({ plan }: WorkoutDetailsProps) {
  if (!plan) {
    return null;
  }

  return (
    <div className="space-y-6">
      <WorkoutPlanHeader plan={plan} />

      <div className="grid gap-6">
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 shadow-lg">
          <WorkoutPlanStats plan={plan} />

          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Overall Progress</span>
              <span>{plan.progress}%</span>
            </div>
            <Progress value={plan.progress} className="h-2" />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-400px)]">
          <WorkoutDayList workoutDays={plan.workoutDays || []} />
        </ScrollArea>
      </div>
    </div>
  );
}