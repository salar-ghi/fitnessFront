"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

const muscleGroups = [
  {
    id: "chest",
    label: "Chest",
    description: "Pectoralis major and minor",
    image: "https://images.unsplash.com/photo-1571019613531-fbeaeb5b5a1c?w=300&h=300&fit=crop",
  },
  {
    id: "back",
    label: "Back",
    description: "Latissimus dorsi and trapezius",
    image: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=300&h=300&fit=crop",
  },
  {
    id: "legs",
    label: "Legs",
    description: "Quadriceps, hamstrings, and calves",
    image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=300&h=300&fit=crop",
  },
  {
    id: "shoulders",
    label: "Shoulders",
    description: "Deltoids and rotator cuff",
    image: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=300&h=300&fit=crop",
  },
  {
    id: "arms",
    label: "Arms",
    description: "Biceps and triceps",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=300&fit=crop",
  },
  {
    id: "core",
    label: "Core",
    description: "Abdominals and lower back",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
  },
] as const;

export function MuscleGroupStep() {
  const { targetMuscles, toggleMuscle, nextStep, previousStep } = useUserStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4" >
      <h2 className="text-xl font-semibold text-center text-green-800 dark:text-green-100">
        Target Muscle Groups
      </h2>

      <ScrollArea className="space-y-2">
        <div className="grid grid-cols-2 gap-2 px-2 max-w-xs mx-auto">
          {muscleGroups.map((muscle) => (
            <motion.div
              key={muscle.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }} >
              <Card className={`aspect-square overflow-hidden cursor-pointer transition-all m-1 ${
                  targetMuscles.includes(muscle.id)
                    ? "ring-2 ring-green-500"
                    : "hover:shadow-lg"
                }`}
                onClick={() => toggleMuscle(muscle.id)}
              >
                <div className="relative h-2/3">
                  <Image
                    src={muscle.image}
                    alt={muscle.label}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2 h-1/3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id={muscle.id}
                      checked={targetMuscles.includes(muscle.id)}
                      className="mt-1 border-green-500 data-[state=checked]:bg-green-500"
                    />
                    <div>
                      <label
                        htmlFor={muscle.id}
                        className="text-xs font-medium"
                      >
                        {muscle.label}
                      </label>
                      <p className="text-[10px] text-gray-600 dark:text-gray-300 line-clamp-2">
                        {muscle.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex justify-between mt-4 px-2 pt-2">
        <Button
          onClick={previousStep}
          variant="outline"
          className="border-green-600 text-green-600"
        >
          Back
        </Button>
        <Button
          onClick={nextStep}
          disabled={targetMuscles.length === 0}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}