"use client";

import { motion } from "framer-motion";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

const generateWeights = () => {
  const weights = [];
  for (let w = 35; w <= 220; w++) {
    weights.push(w);
  }
  weights.push("220+");
  return weights;
};

export function GoalsStep() {
  const { weight, targetWeight, setTargetWeight, nextStep, previousStep } = useUserStore();
  const weights = generateWeights();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-green-800 dark:text-green-100">
        What's your target weight?
      </h2>

      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        <Card className="p-4 border-0">
          <Label className="text-xs font-medium flex items-center justify-center pb-2">Current Weight</Label>
          <div className="mt-2 py-2 px-3 bg-gray-50 dark:bg-gray-900 rounded-md ">
            <p className="text-sm font-medium text-center">{weight} kg</p>
          </div>
        </Card>

        <Card className="p-4 border-0">
          <Label className="text-xs font-medium flex items-center justify-center pb-2">Target Weight (kg)</Label>
          <div className="relative mt-2">
            <ScrollArea className="h-[220px] rounded-md border bg-white dark:bg-gray-950 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white dark:from-gray-950 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none z-10" />
              <div className="py-5">
                {weights.map((w) => (
                  <div
                    key={w}
                    className={`px-3 py-2 cursor-pointer text-sm transition-colors flex items-center justify-center ${
                      targetWeight === w
                        ? "bg-green-500 text-white"
                        : "hover:bg-green-100 dark:hover:bg-green-900"
                    }`}
                    onClick={() => setTargetWeight(typeof w === "string" ? 150 : w)}
                  >
                    {w}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Card>
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
          disabled={!targetWeight}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}