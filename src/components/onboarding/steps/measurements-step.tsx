"use client";

import { motion } from "framer-motion";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";

const generateHeights = () => {
  const heights = [];
  for (let h = 60; h <= 220; h++) {
    heights.push(h);
  }
  heights.push("220+");
  return heights;
};

const generateWeights = () => {
  const weights = [];
  for (let w = 40; w <= 150; w++) {
    weights.push(w);
  }
  weights.push("150+");
  return weights;
};

export function MeasurementsStep() {
  const { height, weight, setHeight, setWeight, nextStep, previousStep } = useUserStore();
  const heights = generateHeights();
  const weights = generateWeights();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-center text-green-800 dark:text-green-100">
        Your Measurements
      </h2>

      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        <Card className="p-4">
          <Label className="text-xs font-medium">Height (cm)</Label>
          <div className="relative mt-2">
            <ScrollArea className="h-[180px] rounded-md border bg-white dark:bg-gray-950 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white dark:from-gray-950 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none z-10" />
              <div className="py-20">
                {heights.map((h) => (
                  <div
                    key={h}
                    className={`px-3 py-2 cursor-pointer text-sm transition-colors ${
                      height === h
                        ? "bg-green-500 text-white"
                        : "hover:bg-green-100 dark:hover:bg-green-900"
                    }`}
                    onClick={() => setHeight(typeof h === "string" ? 220 : h)}
                  >
                    {h}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Card>

        <Card className="p-4">
          <Label className="text-xs font-medium">Weight (kg)</Label>
          <div className="relative mt-2">
            <ScrollArea className="h-[180px] rounded-md border bg-white dark:bg-gray-950 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white dark:from-gray-950 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none z-10" />
              <div className="py-20">
                {weights.map((w) => (
                  <div
                    key={w}
                    className={`px-3 py-2 cursor-pointer text-sm transition-colors ${
                      weight === w
                        ? "bg-green-500 text-white"
                        : "hover:bg-green-100 dark:hover:bg-green-900"
                    }`}
                    onClick={() => setWeight(typeof w === "string" ? 150 : w)}
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
          disabled={!height || !weight}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}