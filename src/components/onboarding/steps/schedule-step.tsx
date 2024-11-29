"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const weekDays = [
  { id: "monday", label: "Mon" },
  { id: "tuesday", label: "Tue" },
  { id: "wednesday", label: "Wed" },
  { id: "thursday", label: "Thu" },
  { id: "friday", label: "Fri" },
  { id: "saturday", label: "Sat" },
  { id: "sunday", label: "Sun" },
] as const;

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return { value: `${hour}:00`, label: `${hour}:00` };
});

const durations = Array.from({ length: 12 }, (_, i) => {
  const duration = (i + 1) * 15;
  return { value: duration, label: `${duration} min` };
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

  const handleDurationChange = (day: string, duration: number) => {
    const currentSchedule = [...workoutSchedule] as WorkoutTime[];
    const dayIndex = currentSchedule.findIndex((d) => d.day === day);
    
    if (dayIndex !== -1) {
      currentSchedule[dayIndex].duration = duration;
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

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
        {weekDays.map((day) => {
          const schedule = (workoutSchedule as WorkoutTime[]).find((d) => d.day === day.id);
          const isSelected = !!schedule;

          return (
            <motion.div
              key={day.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`aspect-square cursor-pointer transition-all overflow-hidden ${
                  isSelected ? "border-green-500 bg-green-50 dark:bg-green-900/30" : ""
                }`}
                onClick={() => handleDayToggle(day.id)}
              >
                <div className="h-full p-2 flex flex-col items-center">
                  <AnimatePresence mode="wait">
                    {!isSelected ? (
                      <motion.div
                        key="unselected"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="h-full flex items-center justify-center"
                      >
                        <Label className="text-lg font-medium">{day.label}</Label>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="selected"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full h-full flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-center space-x-2 mb-1">
                          <Checkbox
                            id={day.id}
                            checked={isSelected}
                            className="h-3 w-3 border-green-500 data-[state=checked]:bg-green-500"
                          />
                          <Label htmlFor={day.id} className="text-xs font-medium">
                            {day.label}
                          </Label>
                        </div>

                        <div className="space-y-1 flex-1 flex flex-col justify-center">
                          <Select
                            value={schedule?.startTime}
                            onValueChange={(value) => handleStartTimeChange(day.id, value)}
                          >
                            <SelectTrigger className="w-full h-6 text-[10px] px-2">
                              <SelectValue placeholder="Start" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((slot) => (
                                <SelectItem key={slot.value} value={slot.value} className="text-xs">
                                  {slot.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select
                            value={schedule?.duration.toString()}
                            onValueChange={(value) => handleDurationChange(day.id, Number(value))}
                          >
                            <SelectTrigger className="w-full h-6 text-[10px] px-2">
                              <SelectValue placeholder="Duration" />
                            </SelectTrigger>
                            <SelectContent>
                              {durations.map((duration) => (
                                <SelectItem
                                  key={duration.value}
                                  value={duration.value.toString()}
                                  className="text-xs"
                                >
                                  {duration.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

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