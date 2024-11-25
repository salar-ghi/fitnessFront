"use client";

import { motion } from "framer-motion";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const weekDays = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
] as const;

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return { value: `${hour}:00`, label: `${hour}:00` };
});

interface WorkoutTime {
  day: string;
  duration: number;
  startTime: string;
}

export function ScheduleStep() {
  const { workoutSchedule, setWorkoutSchedule, nextStep, previousStep } = useUserStore();

  const handleDayToggle = (day: typeof weekDays[number]["id"]) => {
    const currentSchedule = [...workoutSchedule] as WorkoutTime[];
    const existingDay = currentSchedule.find((d) => d.day === day);

    if (existingDay) {
      setWorkoutSchedule(currentSchedule.filter((d) => d.day !== day));
    } else {
      setWorkoutSchedule([...currentSchedule, { day, duration: 60, startTime: "09:00" }]);
    }
  };

  const handleDurationChange = (day: string, duration: string) => {
    const currentSchedule = [...workoutSchedule] as WorkoutTime[];
    const dayIndex = currentSchedule.findIndex((d) => d.day === day);
    
    if (dayIndex !== -1) {
      currentSchedule[dayIndex].duration = Number(duration) || 0;
      setWorkoutSchedule(currentSchedule);
    }
  };

  const handleStartTimeChange = (day: string, time: string) => {
    const currentSchedule = [...workoutSchedule] as WorkoutTime[];
    const dayIndex = currentSchedule.findIndex((d) => d.day === day);
    
    if (dayIndex !== -1) {
      currentSchedule[dayIndex].startTime = time;
      setWorkoutSchedule(currentSchedule);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-green-800 dark:text-green-100">
        Schedule Your Workouts
      </h2>

      <Card className="p-4">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {weekDays.map((day) => {
              const schedule = (workoutSchedule as WorkoutTime[]).find((d) => d.day === day.id);
              const isSelected = !!schedule;

              return (
                <div
                  key={day.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    isSelected ? "border-green-500 bg-green-50 dark:bg-green-900/30" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={day.id}
                      checked={isSelected}
                      onCheckedChange={() => handleDayToggle(day.id)}
                      className="border-green-500 data-[state=checked]:bg-green-500"
                    />
                    <Label htmlFor={day.id} className="flex-1 font-medium">
                      {day.label}
                    </Label>
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 pl-8 space-y-4"
                    >
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-600 dark:text-gray-300">
                          Start Time
                        </Label>
                        <Select
                          value={schedule?.startTime || "09:00"}
                          onValueChange={(value) => handleStartTimeChange(day.id, value)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select start time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot.value} value={slot.value}>
                                {slot.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm text-gray-600 dark:text-gray-300">
                          Duration (minutes)
                        </Label>
                        <Input
                          type="number"
                          min="15"
                          max="180"
                          value={schedule?.duration || 60}
                          onChange={(e) => handleDurationChange(day.id, e.target.value)}
                          className="w-24 border-green-200 focus:border-green-500"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </Card>

      <div className="flex justify-between">
        <Button
          onClick={previousStep}
          variant="outline"
          className="border-green-600 text-green-600"
        >
          Previous
        </Button>
        <Button
          onClick={nextStep}
          disabled={workoutSchedule.length === 0}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}