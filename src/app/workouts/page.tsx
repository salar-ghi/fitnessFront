"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Calendar, Target, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Onboarding } from "@/components/onboarding/onboarding";
import { WorkoutDetails } from "@/components/workout/workout-details";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  completed: boolean;
}

interface WorkoutDay {
  date: string;
  exercises: Exercise[];
  completed: boolean;
}

interface WorkoutPlan {
  id: string;
  createdAt: string;
  duration: string;
  status: "active" | "completed" | "abandoned";
  targetMuscles: string[];
  schedule: string[];
  goal: string;
  progress: number;
  currentDay: number;
  totalDays: number;
  workoutDays: WorkoutDay[];
}

const mockWorkoutPlans: WorkoutPlan[] = [
  {
    id: "1",
    createdAt: "2024-03-10",
    duration: "Weekly",
    status: "active",
    targetMuscles: ["chest", "back", "legs"],
    schedule: ["Monday", "Wednesday", "Friday"],
    goal: "Build Muscle & Strength",
    progress: 65,
    currentDay: 15,
    totalDays: 28,
    workoutDays: [
      {
        date: "2024-03-11",
        completed: true,
        exercises: [
          { name: "Bench Press", sets: 4, reps: 12, completed: true },
          { name: "Incline Dumbbell Press", sets: 3, reps: 12, completed: true },
          { name: "Cable Flyes", sets: 3, reps: 15, completed: true },
        ],
      },
      {
        date: "2024-03-13",
        completed: false,
        exercises: [
          { name: "Deadlifts", sets: 4, reps: 8, completed: false },
          { name: "Pull-ups", sets: 4, reps: 10, completed: false },
          { name: "Barbell Rows", sets: 3, reps: 12, completed: false },
        ],
      },
    ],
  },
  {
    id: "2",
    createdAt: "2024-02-15",
    duration: "Monthly",
    status: "completed",
    targetMuscles: ["shoulders", "arms", "core"],
    schedule: ["Tuesday", "Thursday", "Saturday"],
    goal: "Increase Endurance",
    progress: 100,
    currentDay: 30,
    totalDays: 30,
    workoutDays: [],
  },
];

export default function WorkoutsPage() {
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);

  return (
    <>
      <div className="space-y-8 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-green-800 dark:text-green-100">
            My Workout Plans
          </h1>
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => setIsNewPlanOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Plan
          </Button>
        </div>

        <div className="grid gap-6">
          {mockWorkoutPlans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold">
                        {plan.goal}
                      </h3>
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

                    <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Started {new Date(plan.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{plan.duration} Plan</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        <span>Day {plan.currentDay} of {plan.totalDays}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-medium">{plan.progress}%</span>
                      </div>
                      <Progress value={plan.progress} className="h-2" />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {plan.targetMuscles.map((muscle) => (
                        <Badge key={muscle} variant="outline" className="capitalize">
                          {muscle}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                    onClick={() => setSelectedPlan(plan)}
                  >
                    View Details
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={isNewPlanOpen} onOpenChange={setIsNewPlanOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
          <ScrollArea className="h-[90vh]">
            <div className="p-6">
              <Onboarding onComplete={() => setIsNewPlanOpen(false)} />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
          <ScrollArea className="h-[90vh]">
            <div className="p-6">
              {selectedPlan && <WorkoutDetails plan={selectedPlan} />}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}