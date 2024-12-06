"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WorkoutDay } from "@/types/workout";

interface WorkoutDayListProps {
  workoutDays: WorkoutDay[];
}

export function WorkoutDayList({ workoutDays }: WorkoutDayListProps) {
  return (
    <div className="grid gap-4">
      {workoutDays.map((day, index) => (
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
                {day.exercises?.map((exercise, i) => (
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
  );
}