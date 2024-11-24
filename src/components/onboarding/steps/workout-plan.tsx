"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Exercise {
  name: string;
  image: string;
  instructions: string[];
}

interface WorkoutDay {
  day: number;
  muscles: string[];
  exercises: Exercise[];
}

interface WorkoutWeek {
  week: number;
  days: WorkoutDay[];
}

const exerciseDatabase: Record<string, Exercise[]> = {
  chest: [
    {
      name: "Push-ups",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      instructions: [
        "Start in a plank position",
        "Lower your body until your chest nearly touches the ground",
        "Push back up to the starting position",
        "Keep your core tight throughout the movement",
      ],
    },
    {
      name: "Dumbbell Press",
      image: "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=400&h=300&fit=crop",
      instructions: [
        "Lie on a bench with a dumbbell in each hand",
        "Press the weights up directly above your chest",
        "Lower the weights back down with control",
        "Keep your back flat against the bench",
      ],
    },
  ],
  back: [
    {
      name: "Pull-ups",
      image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=300&fit=crop",
      instructions: [
        "Hang from a pull-up bar with hands wider than shoulder-width",
        "Pull yourself up until your chin is over the bar",
        "Lower yourself back down with control",
        "Keep your core engaged throughout",
      ],
    },
    {
      name: "Rows",
      image: "https://images.unsplash.com/photo-1598575285675-d6d4d761a1f3?w=400&h=300&fit=crop",
      instructions: [
        "Bend over with a flat back",
        "Pull the weight to your lower chest",
        "Squeeze your shoulder blades together",
        "Lower the weight with control",
      ],
    },
  ],
  // Add more exercises for other muscle groups...
};

const generateWorkoutPlan = (state: ReturnType<typeof useUserStore.getState>) => {
  const weeks: WorkoutWeek[] = [];
  const daysPerWeek = 4;

  for (let week = 1; week <= 4; week++) {
    const days: WorkoutDay[] = [];
    for (let day = 1; day <= daysPerWeek; day++) {
      const focusedMuscles = state.targetMuscles.slice(
        ((day - 1) % state.targetMuscles.length),
        (day % state.targetMuscles.length) + 1
      );

      const exercises = focusedMuscles.flatMap(muscle => 
        exerciseDatabase[muscle] ? exerciseDatabase[muscle].slice(0, 2) : []
      );

      days.push({
        day,
        muscles: focusedMuscles,
        exercises,
      });
    }
    weeks.push({ week, days });
  }

  return weeks;
};

export function WorkoutPlan() {
  const state = useUserStore();
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutDay | null>(null);
  const workoutPlan = generateWorkoutPlan(state);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-center text-green-800 dark:text-green-100">
        Your Workout Plan
      </h2>

      <Tabs defaultValue="1" className="w-full">
        <ScrollArea className="w-full">
          <TabsList className="inline-flex w-full p-1 gap-1">
            {workoutPlan.map((week) => (
              <TabsTrigger
                key={week.week}
                value={week.week.toString()}
                className="flex-1 data-[state=active]:bg-green-500 data-[state=active]:text-white text-sm py-1.5"
              >
                Week {week.week}
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollArea>

        <ScrollArea className="h-[calc(100vh-280px)]">
          {workoutPlan.map((week) => (
            <TabsContent
              key={week.week}
              value={week.week.toString()}
              className="mt-4 px-2"
            >
              <div className="grid grid-cols-2 gap-2">
                {week.days.map((day) => (
                  <Card
                    key={day.day}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedWorkout(day)}
                  >
                    <div className="p-3">
                      <h3 className="text-sm font-semibold">Day {day.day}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300 capitalize mt-1">
                        {day.muscles.join(", ")}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                        {day.exercises.length} exercises
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </ScrollArea>
      </Tabs>

      <Dialog open={!!selectedWorkout} onOpenChange={() => setSelectedWorkout(null)}>
        <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-hidden p-0">
          <DialogHeader className="p-4 pb-2">
            <DialogTitle className="text-lg">
              Day {selectedWorkout?.day} - {selectedWorkout?.muscles.join(", ")}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[calc(90vh-100px)]">
            <div className="space-y-4 p-4 pt-2">
              {selectedWorkout?.exercises.map((exercise, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-40">
                    <Image
                      src={exercise.image}
                      alt={exercise.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm font-semibold mb-2">
                      {exercise.name}
                    </h4>
                    <ol className="list-decimal list-inside space-y-1">
                      {exercise.instructions.map((instruction, i) => (
                        <li key={i} className="text-xs text-gray-600 dark:text-gray-300">
                          {instruction}
                        </li>
                      ))}
                    </ol>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <div className="flex justify-between mt-4 px-2">
        <Button
          onClick={state.previousStep}
          variant="outline"
          className="border-green-600 text-green-600"
        >
          Back
        </Button>
        <Button
          onClick={state.resetForm}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Start Over
        </Button>
      </div>
    </motion.div>
  );
}