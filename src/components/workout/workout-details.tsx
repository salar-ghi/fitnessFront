"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Target, CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

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

interface WorkoutDetailsProps {
  plan: WorkoutPlan;
}

export function WorkoutDetails({ plan }: WorkoutDetailsProps) {
  return (
    <div className="space-y-6">
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

      <div className="grid gap-6">
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 shadow-lg">
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
                {plan.targetMuscles.map((muscle) => (
                  <Badge key={muscle} variant="outline" className="capitalize">
                    {muscle}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Schedule</h3>
              <div className="flex flex-wrap gap-2">
                {plan.schedule.map((day) => (
                  <Badge key={day} variant="outline">
                    {day}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Overall Progress</span>
              <span>{plan.progress}%</span>
            </div>
            <Progress value={plan.progress} className="h-2" />
          </div>
        </div>

        <div className="grid gap-4">
          {plan.workoutDays.map((day, index) => (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">
                      {new Date(day.date).toLocaleDateString()}
                    </h3>
                    {day.completed ? (
                      <Badge className="bg-green-500">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Completed
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">
                        <XCircle className="w-4 h-4 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3">
                    {day.exercises.map((exercise, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{exercise.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {exercise.sets} sets × {exercise.reps} reps
                          </p>
                        </div>
                        {exercise.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}