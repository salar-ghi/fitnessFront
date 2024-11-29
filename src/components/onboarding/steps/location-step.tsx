"use client";

import { motion } from "framer-motion";
import { Dumbbell, Home } from "lucide-react";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const locations = [
  {
    id: "home",
    title: "Home",
    icon: Home,
    description: "Minimal equipment",
  },
  {
    id: "gym",
    title: "Gym",
    icon: Dumbbell,
    description: "Full equipment",
  },
] as const;

export function LocationStep() {
  const { location, setLocation, nextStep, previousStep } = useUserStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-green-800 dark:text-green-100">
        Where will you exercise?
      </h2>

      <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
        {locations.map((loc) => (
          <motion.div
            key={loc.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`aspect-square cursor-pointer ${
                location === loc.id
                  ? "border-green-500 bg-green-50 dark:bg-green-900"
                  : ""
              }`}
              onClick={() => setLocation(loc.id)}
            >
              <div className="h-full p-3 flex flex-col items-center justify-center text-center space-y-2">
                <loc.icon className="w-8 h-8 text-green-600" />
                <h3 className="text-xs font-medium">{loc.title}</h3>
                <p className="text-[10px] text-gray-600 dark:text-gray-300">
                  {loc.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
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
          disabled={!location}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}